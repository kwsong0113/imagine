import { HStack } from 'native-base';
import React, { useRef } from 'react';
import { Button } from 'react-native';
import { Canvas, ScreenContainer } from '../../components';

export const CanvasTest = () => {
  const canvasRef = useRef<Canvas>(null);

  return (
    <ScreenContainer>
      <Canvas ref={canvasRef} />
      <HStack justifyContent="space-around">
        <Button
          onPress={() => console.log(canvasRef.current?.toPoints())}
          title="Points"
        />
        <Button onPress={() => canvasRef.current?.reset()} title="Reset" />
      </HStack>
    </ScreenContainer>
  );
};
