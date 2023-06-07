import React, { useState, useRef, ComponentProps, ReactNode } from 'react';
import { Box, Center, Pressable, useToast } from 'native-base';
import { Canvas, IonIcon, Toast } from '../../components';
import { StackScreenProps } from '@react-navigation/stack';
import { CustomStackParamList } from '../../navigation';
import { useAppSelector } from '../../hooks';
import { selectGestureToActionMap } from '../../store/slices/gesture';
import { GestureError, RecognitionError } from '../../features/gesture/types';
import { useExecuteActionInstance } from '../../hooks/useExecuteActionInstance';
import { useGetActionDescription } from '../../features/action/utils';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('gesture');
  const canvasRef = useRef<Canvas>(null);
  const gestureToActionMap = useAppSelector(selectGestureToActionMap);
  const toast = useToast();
  const [shouldShowButtons, setShouldShowButtons] = useState(true);
  const [shouldAlsoShowButtons, setShouldAlsoShowButtons] = useState(true);
  const executeActionInstance = useExecuteActionInstance();
  const getActionDescription = useGetActionDescription();

  const handleRecognize = async () => {
    const recognitionResult = canvasRef.current?.recognize();
    let message: string;
    let iconName: string;
    let iconColor: string;
    if (recognitionResult?.success) {
      const actionInstance = recognitionResult.id
        ? gestureToActionMap[recognitionResult.id]
        : undefined;
      if (actionInstance) {
        message = `${getActionDescription(actionInstance)}`;
        iconName = 'checkmark-circle';
        iconColor = 'blue.500';
        executeActionInstance(actionInstance, 400).then(success => {
          if (success) {
            return;
          }
          setShouldAlsoShowButtons(false);
          setTimeout(() => {
            setShouldAlsoShowButtons(true);
          }, 600);
          toast.show({
            render: () => (
              <Toast
                iconName="close-circle"
                iconColor="red.600"
                message={t('message.inexecutable_action')}
              />
            ),
            duration: 500,
            placement: 'top',
          });
        });
      } else {
        message = t('message.cannot_find_action');
        iconName = 'close-circle';
        iconColor = 'red.600';
      }
    } else {
      switch (recognitionResult?.error) {
        case RecognitionError.NoGesture:
          message = t('message.no_gesture_in_use');
          break;
        case GestureError.EmptyPoints:
          message = t('message.draw_gesture');
          break;
        case GestureError.DotStroke:
          message = t('message.no_dot_stroke');
          break;
        default:
          message = t('message.not_allowed');
      }
      iconName = 'warning';
      iconColor = 'orange.700';
    }

    setShouldShowButtons(false);
    setTimeout(
      () => {
        setShouldShowButtons(true);
      },
      iconName === 'checkmark-circle' ? 500 : 700,
    );
    toast.show({
      render: () => (
        <Toast iconName={iconName} iconColor={iconColor} message={message} />
      ),
      duration: iconName === 'checkmark-circle' ? 400 : 600,
      placement: 'top',
    });

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
      {shouldShowButtons && shouldAlsoShowButtons && (
        <>
          <FloatingButton
            top={60}
            left={6}
            onPress={() => canvasRef.current?.reset()}
          >
            <IonIcon name="close-circle" size={5} color="gray.500" />
          </FloatingButton>
          <FloatingButton top={60} right={6} onPress={handleRecognize}>
            <IonIcon name="scan" size={18} color="blue.500" />
          </FloatingButton>
        </>
      )}
    </Box>
  );
};
