import React, { forwardRef, useImperativeHandle, useRef } from 'react';
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
import { selectGestureList } from '../store/slices/gesture';

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
}

type Canvas = CanvasRef;

const Canvas = forwardRef<CanvasRef, {}>((_, ref) => {
  const { colors } = useTheme();
  const sketchCanvasRef = useRef<SketchCanvasRef>(null);
  const gestureList = useAppSelector(selectGestureList);

  useImperativeHandle(
    ref,
    () => ({
      ...sketchCanvasRef.current!,
      getGesture: () => {
        const canvasPoints = sketchCanvasRef.current?.toPoints();
        if (!canvasPoints) {
          return {
            success: false,
            error: GestureError.Else,
          };
        }
        const pointCloudResult = getPointCloud(canvasPoints);
        if (pointCloudResult.success) {
          return {
            success: true,
            data: { canvasPoints, pointCloud: pointCloudResult.pointCloud },
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
        return gestureRecognize(gestureList, canvasPoints as CanvasPoints);
      },
    }),
    [gestureList],
  );

  return (
    <SketchCanvas
      ref={sketchCanvasRef}
      strokeColor={colors.orange[900]}
      strokeWidth={15}
      containerStyle={[styles.container, { backgroundColor: colors.gray[300] }]}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 28,
  },
});

export default Canvas;
