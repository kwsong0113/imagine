import { LUTScaleFactor } from './constants';
import { computeLUT, preprocess } from './preprocess';
import { GestureError, Point, PointCloud } from './types';
import { sqrEuclideanDistance } from './utils';

const gestureList: PointCloud[] = [];

type GestureAdditionResult =
  | {
      success: true;
      pointCloud: PointCloud;
    }
  | {
      success: false;
      error: GestureError;
    };

export const addGesture = (
  name: string,
  points: Point[],
): GestureAdditionResult => {
  try {
    const preprocessedData = preprocess(points);
    if (preprocessedData.isValid) {
      const { points: preprocessedPoints } = preprocessedData;
      const LUT = computeLUT(preprocessedPoints);
      return {
        success: true,
        pointCloud: { points: preprocessedPoints, LUT },
      };
    } else {
      return {
        success: false,
        error: preprocessedData.error,
      };
    }
  } catch (e) {
    return {
      success: false,
      error: GestureError.Else,
    };
  }
};

const computeLowerBound = (
  points1: Point[],
  points2: Point[],
  step: number,
  LUT: number[][],
): number[] => {
  const numPoints = points1.length;
  const lowerBound = new Array(Math.floor(numPoints / step) + 1);
  const SAT = new Array(numPoints);
  lowerBound[0] = 0;
  points1.forEach((point1, idx) => {
    const x = Math.round(point1.intX / LUTScaleFactor);
    const y = Math.round(point1.intY / LUTScaleFactor);
    const distance = sqrEuclideanDistance(point1, points2[LUT[x][y]]);
    SAT[idx] = idx === 0 ? distance : SAT[idx - 1] + distance;
    lowerBound[0] += (numPoints - idx) * distance;
  });

  for (let i = step, j = 1; j < numPoints; i += step, j++) {
    lowerBound[j] =
      lowerBound[0] + i * SAT[numPoints - 1] - numPoints * SAT[i - 1];
  }
  return lowerBound;
};

const cloudDistance = (
  points1: Point[],
  points2: Point[],
  start: number,
  minSoFar: number,
): number => {
  const numPoints = points1.length;
  const unMatched: number[] = [];
  for (let j = 0; j < numPoints; j++) {
    unMatched.push(j);
  }

  let i = start;
  let weight = numPoints;
  let sum = 0;

  do {
    let minJ = -1;
    let minDistance = Infinity;
    unMatched.forEach((val, j) => {
      const distance = sqrEuclideanDistance(points1[i], points2[val]);
      if (distance < minDistance) {
        minDistance = distance;
        minJ = j;
      }
    });
    unMatched.splice(minJ, 1);
    sum += weight * minDistance;
    if (sum >= minSoFar) {
      return sum;
    }
    weight--;
    i = (i + 1) % numPoints;
  } while (i !== start);

  return sum;
};

const cloudMatch = (
  candidate: PointCloud,
  template: PointCloud,
  minSoFar: number,
): number => {
  const numPoints = candidate.points.length;
  const step = Math.floor(Math.pow(numPoints, 0.5));

  const lowerBound1 = computeLowerBound(
    candidate.points,
    template.points,
    step,
    template.LUT,
  );
  const lowerBound2 = computeLowerBound(
    template.points,
    candidate.points,
    step,
    candidate.LUT,
  );

  for (let i = 0, j = 0; i < numPoints; i += step, j++) {
    if (lowerBound1[j] < minSoFar) {
      minSoFar = Math.min(
        minSoFar,
        cloudDistance(candidate.points, template.points, i, minSoFar),
      );
    }
    if (lowerBound2[j] < minSoFar) {
      minSoFar = Math.min(
        minSoFar,
        cloudDistance(template.points, candidate.points, i, minSoFar),
      );
    }
  }

  return minSoFar;
};

type GestureRecognitionResult =
  | {
      success: true;
      name?: string;
    }
  | {
      success: false;
      error: GestureError;
    };

export const recognize = (points: Point[]): GestureRecognitionResult => {
  try {
    const preprocessedData = preprocess(points);
    if (preprocessedData.isValid) {
      const { points: preprocessedPoints } = preprocessedData;
      const LUT = computeLUT(preprocessedPoints);

      const candidate = { points: preprocessedPoints, LUT };

      let minIdx = -1;
      let minDistance = Infinity;
      gestureList.forEach((gesture, idx) => {
        const distance = cloudMatch(candidate, gesture, minDistance);
        if (distance < minDistance) {
          minDistance = distance;
          minIdx = idx;
        }
      });

      return {
        success: true,
        name: minIdx === -1 ? undefined : undefined,
      };
    } else {
      return {
        success: false,
        error: preprocessedData.error,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: GestureError.Else,
    };
  }
};
