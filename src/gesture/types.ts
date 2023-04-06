export interface Point {
  x: number;
  y: number;
  id: number;
  intX: number;
  intY: number;
}

export type CanvasPoints = [number, number][][];

export interface PointCloud {
  points: Point[];
  LUT: number[][];
}

export enum GestureError {
  EmptyPoints = 'empty-points',
  DotStroke = 'dot-stroke',
  WrongNumPoints = 'wrong-num-points',
  ZeroSize = 'zero-size',
  Else = 'else',
}
