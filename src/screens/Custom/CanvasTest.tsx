import React, { useRef } from 'react';
import { HStack, useToast } from 'native-base';
import { Alert, Button, KeyboardAvoidingView } from 'react-native';
import { Canvas, ScreenContainer } from '../../components';
import { addGesture, recognize } from '../../gesture/recognizer';
import { convertPoints } from '../../gesture/utils';

export const CanvasTest = () => {
  const canvasRef = useRef<Canvas>(null);
  const toast = useToast();

  const handleAddGesture = () => {
    const canvasPoints = canvasRef.current?.toPoints();
    if (canvasPoints) {
      Alert.prompt('Add Gesture', undefined, name => {
        const qDollarPoints = convertPoints(canvasPoints);
        const result = addGesture(name, qDollarPoints);
        if (result.success) {
          toast.show({
            title: `${name} Gestured Added`,
            placement: 'top',
            duration: 500,
          });
        } else {
          toast.show({
            title: 'Failed to Add Gesture',
            description: result.error,
            placement: 'top',
            duration: 500,
          });
        }
      });
    } else {
      toast.show({
        title: 'Empty Ref',
        placement: 'top',
        duration: 500,
      });
    }

    canvasRef.current?.reset();
  };

  const handleRecognize = () => {
    const canvasPoints = canvasRef.current?.toPoints();
    if (canvasPoints) {
      const qDollarPoints = convertPoints(canvasPoints);
      const result = recognize(qDollarPoints);
      if (result.success) {
        toast.show({
          title: result.name ?? 'No Match',
          placement: 'top',
          duration: 500,
        });
      } else {
        toast.show({
          title: 'Gesture Recognition Failure',
          description: result.error,
          placement: 'top',
          duration: 500,
        });
      }
    } else {
      toast.show({
        title: 'Empty Ref',
        placement: 'top',
        duration: 500,
      });
    }

    canvasRef.current?.reset();
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
      <ScreenContainer>
        <Canvas ref={canvasRef} />
        <HStack justifyContent="space-around">
          <Button onPress={handleAddGesture} title="Add" />
          <Button onPress={handleRecognize} title="Recognize" />
          <Button onPress={() => canvasRef.current?.reset()} title="Clear" />
          {/* <Button onPress={deleteGestures} title="Reset Q" /> */}
        </HStack>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
};
