export class Point {
  x: number;
  y: number;
  id: number;
  intX: number;
  intY: number;

  constructor(x: number, y: number, id: number = 0) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.intX = 0;
    this.intY = 0;
  }
}

export type CanvasPoints = [number, number][][];

export class PointCloud {
  name: string;
  points: Point[];
  LUT: number[][];

  constructor(name: string, points: Point[], LUT: number[][]) {
    this.name = name;
    this.points = points;
    this.LUT = LUT;
  }
}

export enum GestureError {
  EmptyPoints = 'empty-points',
  DotStroke = 'dot-stroke',
  WrongNumPoints = 'wrong-num-points',
  ZeroSize = 'zero-size',
  Else = 'else',
}
