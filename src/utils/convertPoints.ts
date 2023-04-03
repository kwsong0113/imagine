import { Point } from '../gesture/qdollar';

type CanvasPoints = [number, number][][];

// TODO: rewrite the logic using reduce method
export const convertPoints = (canvasPoints: CanvasPoints) => {
  const qDollarPoints: Point[] = [];
  canvasPoints.forEach((stroke, id) => {
    stroke.forEach(([x, y]) => {
      qDollarPoints.push(new Point(x, y, id));
    });
  });
  return qDollarPoints;
};
