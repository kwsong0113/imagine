import {
  LUTScaleFactor,
  LUTSize,
  MaxIntCoord,
  NumPoints,
  Origin,
} from './constants';
import { GestureError, Point } from './types';
import { euclideanDistance, makeEmpty2dArray } from './utils';

const isEmpty = (points: Point[]) => {
  return points.length === 0;
};

const hasDot = (points: Point[]) => {
  return points.some((point, idx, arr) => {
    return point.id !== arr[idx - 1]?.id && point.id !== arr[idx + 1]?.id;
  });
};

type PreprocessedData =
  | {
      isValid: true;
      points: Point[];
    }
  | {
      isValid: false;
      error: GestureError;
    };

const pathLength = (points: Point[]) => {
  return points.reduce((acc, cur, idx, arr) => {
    if (idx > 0 && arr[idx - 1].id === cur.id) {
      return acc + euclideanDistance(arr[idx - 1], cur);
    }
    return acc;
  }, 0);
};

const resample = (points: Point[], numPoints: number) => {
  const interval = pathLength(points) / (numPoints - 1);
  let sumDistance = 0;
  const newPoints = [points[0]];

  for (let i = 1; i < points.length; i++) {
    if (points[i - 1].id === points[i].id) {
      let distance = euclideanDistance(points[i - 1], points[i]);
      if (sumDistance + distance >= interval) {
        const newX =
          points[i - 1].x +
          ((interval - sumDistance) / distance) *
            (points[i].x - points[i - 1].x);
        const newY =
          points[i - 1].y +
          ((interval - sumDistance) / distance) *
            (points[i].y - points[i - 1].y);
        const newPoint = {
          x: newX,
          y: newY,
          id: points[i].id,
          intX: 0,
          intY: 0,
        };
        newPoints.push(newPoint);
        points.splice(i, 0, newPoint);
        sumDistance = 0;
      } else {
        sumDistance += distance;
      }
    }
  }

  if (newPoints.length === numPoints - 1) {
    const lastPoint = points[points.length - 1];
    newPoints.push({ ...lastPoint });
  }

  if (newPoints.length !== numPoints) {
    throw new Error(GestureError.WrongNumPoints);
  }

  return newPoints;
};

const scale = (points: Point[]) => {
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;

  points.forEach(({ x, y }) => {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  });

  const size = Math.max(maxX - minX, maxY - minY);

  if (size === 0) {
    throw new Error(GestureError.ZeroSize);
  }

  return points.map(({ x, y, id }) => ({
    x: (x - minX) / size,
    y: (y - minY) / size,
    id,
    intX: 0,
    intY: 0,
  }));
};

const centroid = (points: Point[]) => {
  const centerX = points.reduce((acc, { x }) => acc + x, 0) / points.length;
  const centerY = points.reduce((acc, { y }) => acc + y, 0) / points.length;
  return { x: centerX, y: centerY, id: 0, intX: 0, intY: 0 };
};

const translateTo = (points: Point[], to: Point) => {
  const { x: centerX, y: centerY } = centroid(points);
  return points.map(({ x, y, id }) => ({
    x: x + to.x - centerX,
    y: y + to.y - centerY,
    id,
    intX: 0,
    intY: 0,
  }));
};

const makeIntCoords = (points: Point[]) => {
  points.forEach(point => {
    point.intX = Math.round(((point.x + 1) / 2) * (MaxIntCoord - 1));
    point.intY = Math.round(((point.y + 1) / 2) * (MaxIntCoord - 1));
  });
  return points;
};

const preprocessor = (points: Point[]) =>
  makeIntCoords(translateTo(scale(resample(points, NumPoints)), Origin));

export const preprocess = (points: Point[]): PreprocessedData => {
  if (isEmpty(points)) {
    return {
      isValid: false,
      error: GestureError.EmptyPoints,
    };
  }
  if (hasDot(points)) {
    return {
      isValid: false,
      error: GestureError.DotStroke,
    };
  }

  try {
    const preprocessedPoints = preprocessor(points);
    return {
      isValid: true,
      points: preprocessedPoints,
    };
  } catch (error) {
    if (error instanceof Error && error.message in GestureError) {
      return {
        isValid: false,
        error: error.message as GestureError,
      };
    }

    return {
      isValid: false,
      error: GestureError.Else,
    };
  }
};

export const computeLUT = (points: Point[]): number[][] => {
  const LUTArray = makeEmpty2dArray(LUTSize, LUTSize);

  for (let x = 0; x < LUTSize; x++) {
    for (let y = 0; y < LUTSize; y++) {
      let minIdx = -1;
      let minDistance = Infinity;
      points.forEach(({ intX, intY }, idx) => {
        const row = Math.round(intX / LUTScaleFactor);
        const col = Math.round(intY / LUTScaleFactor);
        const distance = (row - x) * (row - x) + (col - y) * (col - y);
        if (distance < minDistance) {
          minDistance = distance;
          minIdx = idx;
        }
      });
      LUTArray[x][y] = minIdx;
    }
  }

  return LUTArray;
};
