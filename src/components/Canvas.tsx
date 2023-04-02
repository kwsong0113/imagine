import { useTheme } from 'native-base';
import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { SketchCanvas, SketchCanvasRef } from 'rn-perfect-sketch-canvas';

type Canvas = SketchCanvasRef;

const Canvas = forwardRef<SketchCanvasRef, {}>((_, ref) => {
  const { colors } = useTheme();

  return (
    <SketchCanvas
      ref={ref}
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
