import { CanvasPoints, Point } from './types';

export const sqrEuclideanDistance = (pt1: Point, pt2: Point) => {
  const dx = pt2.x - pt1.x;
  const dy = pt2.y - pt1.y;
  return dx * dx + dy * dy;
};

export const euclideanDistance = (pt1: Point, pt2: Point) => {
  return Math.sqrt(sqrEuclideanDistance(pt1, pt2));
};

export const makeEmpty2dArray = (height: number, width: number) => {
  const arr = new Array(height);
  for (let i = 0; i < height; ++i) {
    arr[i] = new Array(width);
  }
  return arr;
};

export const convertPoints = (canvasPoints: CanvasPoints): Point[] => {
  const flatPoints: Point[] = [];
  canvasPoints.forEach((stroke, id) => {
    stroke.forEach(([x, y]) => {
      flatPoints.push({ x, y, id, intX: 0, intY: 0 });
    });
  });
  return flatPoints;
};
