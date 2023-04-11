import React, { useRef } from 'react';
import { HStack, useToast } from 'native-base';
import { Alert, Button, KeyboardAvoidingView } from 'react-native';
import { Canvas, ScreenContainer } from '../../components';
import { useAppDispatch } from '../../hooks';
import {
  gestureActions,
  selectGestureToActionMap,
} from '../../store/slices/gesture';
import { useSelector } from 'react-redux';
import { executeActionInstance } from '../../features/action/utils';
import { generateId } from '../../utils';

export const CanvasTest = () => {
  const canvasRef = useRef<Canvas>(null);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const gestureToActionMap = useSelector(selectGestureToActionMap);

  const handleAddGesture = () => {
    const gestureResult = canvasRef.current?.getGesture();
    if (gestureResult) {
      if (gestureResult.success) {
        Alert.prompt('Add Gesture', undefined, name => {
          const id = generateId();
          dispatch(
            gestureActions.addGesture({
              id,
              name,
              data: [gestureResult.data],
            }),
          );
          toast.show({
            title: `${name} Gestured Added`,
            placement: 'top',
            duration: 500,
          });
        });
      } else {
        toast.show({
          title: 'Failed to Add Gesture',
          description: gestureResult.error,
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

  const handleRecognize = () => {
    const recognitionResult = canvasRef.current?.recognize();
    if (recognitionResult) {
      if (recognitionResult.success) {
        const actionInstance = recognitionResult.id
          ? gestureToActionMap[recognitionResult.id]
          : undefined;
        toast.show({
          title: actionInstance ? JSON.stringify(actionInstance) : 'No Match',
          placement: 'top',
          duration: 500,
        });
        if (actionInstance) {
          executeActionInstance(actionInstance);
        }
      } else {
        toast.show({
          title: 'Gesture Recognition Failure',
          description: recognitionResult.error,
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

  const deleteGestures = () => {
    dispatch(gestureActions.deleteAllGestures());
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
      <ScreenContainer>
        <Canvas ref={canvasRef} />
        <HStack justifyContent="space-around">
          <Button onPress={handleAddGesture} title="Add" />
          <Button onPress={handleRecognize} title="Recognize" />
          <Button onPress={() => canvasRef.current?.reset()} title="Clear" />
          <Button onPress={deleteGestures} title="Del All" />
        </HStack>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
};
