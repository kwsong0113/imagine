import React, { useRef } from 'react';
import { HStack, useToast } from 'native-base';
import { Alert, Button, KeyboardAvoidingView, Linking } from 'react-native';
import { Canvas, ScreenContainer } from '../../components';
import { QDollarRecognizer } from '../../gesture/qdollar';
import { convertPoints } from '../../utils/convertPoints';

const recognizer = new QDollarRecognizer();

export const CanvasTest = () => {
  const canvasRef = useRef<Canvas>(null);
  const toast = useToast();

  const addGesture = () => {
    const canvasPoints = canvasRef.current?.toPoints();
    if (canvasPoints) {
      Alert.prompt('Add Gesture', undefined, name => {
        const qDollarPoints = convertPoints(canvasPoints);
        recognizer.AddGesture(name, qDollarPoints);
        toast.show({
          title: `${name} Gestured Added`,
          placement: 'top',
          duration: 500,
        });
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

  const recognize = () => {
    const canvasPoints = canvasRef.current?.toPoints();
    if (canvasPoints) {
      const qDollarPoints = convertPoints(canvasPoints);
      const { Name, Score, Time } = recognizer.Recognize(qDollarPoints);
      toast.show({
        title: Name,
        description: `Score: ${Score}, Time: ${Time}`,
        placement: 'top',
        duration: 500,
      });
      Linking.openURL('youtube://shorts');
    } else {
      toast.show({
        title: 'Empty Ref',
        placement: 'top',
        duration: 500,
      });
    }

    canvasRef.current?.reset();
  };

  const deleteGestures = () => {
    recognizer.DeleteUserGestures();
    toast.show({
      title: 'Gestures Deleted',
      placement: 'top',
      duration: 500,
    });
    canvasRef.current?.reset();
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
      <ScreenContainer>
        <Canvas ref={canvasRef} />
        <HStack justifyContent="space-around">
          <Button onPress={addGesture} title="Add" />
          <Button onPress={recognize} title="Recognize" />
          <Button onPress={() => canvasRef.current?.reset()} title="Clear" />
          <Button onPress={deleteGestures} title="Reset Q" />
        </HStack>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
};
