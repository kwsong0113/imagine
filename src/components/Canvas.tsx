import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useLayoutEffect,
} from 'react';
import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';
import { SketchCanvas, SketchCanvasRef } from 'rn-perfect-sketch-canvas';
import {
  CanvasPoints,
  GestureDataElement,
  GestureError,
} from '../features/gesture/types';
import {
  getPointCloud,
  RecognitionResult,
  recognize as gestureRecognize,
} from '../features/gesture/recognizer';
import { useAppSelector } from '../hooks';
import { selectActiveGestureList } from '../store/slices/gesture';

type GestureResult =
  | {
      success: true;
      data: GestureDataElement;
    }
  | {
      success: false;
      error: GestureError;
    };

interface CanvasRef extends SketchCanvasRef {
  getGesture: () => GestureResult;
  recognize: () => RecognitionResult;
  getIsEmpty: () => boolean;
}

interface CanvasProps {
  bg?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

type Canvas = CanvasRef;

const Canvas = forwardRef<CanvasRef, CanvasProps>(
  ({ bg, strokeColor, strokeWidth = 15 }, ref) => {
    const { colors } = useTheme();
    const sketchCanvasRef = useRef<SketchCanvasRef>(null);
    const activeGestureList = useAppSelector(selectActiveGestureList);

    useLayoutEffect(() => {
      sketchCanvasRef.current?.reset();
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        ...sketchCanvasRef.current!,
        getGesture: () => {
          const canvasPoints = sketchCanvasRef.current?.toPoints();
          const base64 = sketchCanvasRef.current?.toImage()?.encodeToBase64();
          if (!canvasPoints || !base64) {
            return {
              success: false,
              error: GestureError.Else,
            };
          }
          const pointCloudResult = getPointCloud(canvasPoints);
          if (pointCloudResult.success) {
            return {
              success: true,
              data: {
                canvasPoints,
                pointCloud: pointCloudResult.pointCloud,
                base64,
              },
            };
          } else {
            return pointCloudResult;
          }
        },
        recognize: () => {
          const canvasPoints = sketchCanvasRef.current?.toPoints();
          if (!canvasPoints) {
            return {
              success: false,
              error: GestureError.Else,
            };
          }
          return gestureRecognize(
            activeGestureList,
            canvasPoints as CanvasPoints,
          );
        },
        getIsEmpty: () => {
          const canvasPoints = sketchCanvasRef.current?.toPoints();
          return (
            canvasPoints === undefined ||
            canvasPoints.every(points => points.length === 0)
          );
        },
      }),
      [activeGestureList],
    );

    return (
      <SketchCanvas
        ref={sketchCanvasRef}
        strokeColor={strokeColor ?? colors.blue[500]}
        strokeWidth={strokeWidth}
        containerStyle={[
          styles.container,
          { backgroundColor: bg ?? colors.gray[300] },
        ]}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 28,
  },
});

export default Canvas;
