import React, { useState, useRef, ComponentProps, ReactNode } from 'react';
import { Box, Center, Pressable, useToast } from 'native-base';
import {
  Canvas,
  IonIcon,
  MaterialCommunityIcon,
  Toast,
} from '../../components';
import { StackScreenProps } from '@react-navigation/stack';
import { CustomStackParamList } from '../../navigation';
import { useAppSelector } from '../../hooks';
import { selectGestureToActionMap } from '../../store/slices/gesture';
import {
  executeActionInstance,
  getActionDescription,
} from '../../features/action/utils';
import { GestureError, RecognitionError } from '../../features/gesture/types';

type FloatingButtonProps = {
  children: ReactNode;
  onPress?: () => void;
} & Partial<ComponentProps<typeof Box>>;

const FloatingButton = ({
  children,
  onPress,
  ...props
}: FloatingButtonProps) => {
  return (
    <Box position="absolute" {...props}>
      <Pressable flex={1} onPress={onPress}>
        {({ isPressed }) => (
          <Center
            width={50}
            height={50}
            borderRadius={25}
            bg={isPressed ? 'gray.300' : 'gray.100'}
          >
            {children}
          </Center>
        )}
      </Pressable>
    </Box>
  );
};

type BlankCanvasProps = StackScreenProps<CustomStackParamList, 'BlankCanvas'>;

export const BlankCanvas = ({ navigation }: BlankCanvasProps) => {
  const canvasRef = useRef<Canvas>(null);
  const gestureToActionMap = useAppSelector(selectGestureToActionMap);
  const toast = useToast();
  const [shouldShowButtons, setShouldShowButtons] = useState(true);

  const handleRecognize = () => {
    const recognitionResult = canvasRef.current?.recognize();
    if (recognitionResult?.success) {
      const actionInstance = recognitionResult.id
        ? gestureToActionMap[recognitionResult.id]
        : undefined;
      if (actionInstance) {
        setShouldShowButtons(false);
        toast.show({
          render: () => (
            <Toast
              iconName="checkmark-circle"
              iconColor="blue.500"
              bg="gray.100"
              message={`${getActionDescription(actionInstance)}`}
            />
          ),
          placement: 'top',
          duration: 500,
        });

        setTimeout(() => {
          executeActionInstance(actionInstance);
          setShouldShowButtons(true);
        }, 500);
      }
    } else {
      let message = '';
      switch (recognitionResult?.error) {
        case RecognitionError.NoGesture:
          message = '사용 중인 제스처가 없어요';
          break;
        case GestureError.EmptyPoints:
          message = '제스처를 그려주세요';
          break;
        case GestureError.DotStroke:
          message = '점 찍기는 사용할 수 없어요';
          break;
        default:
          message = '허용되지 않은 제스처에요';
      }
      setShouldShowButtons(false);
      setTimeout(() => {
        setShouldShowButtons(true);
      }, 500);
      toast.show({
        render: () => (
          <Toast iconName="warning" iconColor="orange.700" message={message} />
        ),
        duration: 500,
        placement: 'top',
      });
    }

    canvasRef.current?.reset();
  };

  return (
    <Box flex={1} bg="gray.300" safeAreaTop>
      <Canvas ref={canvasRef} />
      <FloatingButton
        bottom={10}
        left={6}
        onPress={() => navigation.navigate('Home')}
      >
        <IonIcon name="home" size={5} color="orange.700" />
      </FloatingButton>
      {shouldShowButtons && (
        <>
          <FloatingButton
            top={60}
            left={6}
            onPress={() => canvasRef.current?.reset()}
          >
            <IonIcon name="close-circle" size={5} color="gray.500" />
          </FloatingButton>
          <FloatingButton top={60} right={6} onPress={handleRecognize}>
            <MaterialCommunityIcon name="crop-free" size={5} color="blue.500" />
          </FloatingButton>
        </>
      )}
    </Box>
  );
};
