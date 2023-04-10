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
  Else = 'gesture-else',
}

export enum RecognitionError {
  NoGesture = 'no-gesture',
  Else = 'recognition-else',
}

export interface Gesture {
  id: string;
  name: string;
  data: GestureDataElement[];
}
export interface GestureDataElement {
  canvasPoints: CanvasPoints;
  pointCloud: PointCloud;
  base64: string;
}
