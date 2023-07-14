import React, { useState, useRef, ReactNode } from 'react';
import {
  Box,
  Center,
  Pressable,
  useTheme,
  useToast,
  VStack,
} from 'native-base';
import { Canvas, IonIcon, Toast } from '../../components';
import { AppStackScreenProps } from '../../navigation';
import { useAppSelector, useInterval } from '../../hooks';
import { selectGestureToActionMap } from '../../store/slices/gesture';
import { GestureError, RecognitionError } from '../../features/gesture/types';
import { useExecuteActionInstance } from '../../hooks/useExecuteActionInstance';
import { useGetActionDescription } from '../../features/action/utils';
import { useTranslation } from 'react-i18next';
import {
  selectAutoLaunch,
  selectBlankCanvasButtonPosition,
} from '../../store/slices';
import { useIsFocused } from '@react-navigation/native';

const DRAWING_CLOCK_COUNT = 3;

type FloatingButtonProps = {
  children: ReactNode;
  onPress?: () => void;
};

const FloatingButton = ({ children, onPress }: FloatingButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => (
        <Center
          width={50}
          height={50}
          borderRadius={25}
          bg={isPressed ? 'canvas.background' : 'gray.100'}
        >
          {children}
        </Center>
      )}
    </Pressable>
  );
};

export const BlankCanvas = ({
  navigation,
}: AppStackScreenProps<'BlankCanvas'>) => {
  const { t } = useTranslation('gesture');
  const { colors } = useTheme();
  const canvasRef = useRef<Canvas>(null);
  const gestureToActionMap = useAppSelector(selectGestureToActionMap);
  const toast = useToast();
  const [shouldShowButtons, setShouldShowButtons] = useState(true);
  const [shouldAlsoShowButtons, setShouldAlsoShowButtons] = useState(true);
  const autoLaunch = useAppSelector(selectAutoLaunch);
  const blankCanvasButtonPosition = useAppSelector(
    selectBlankCanvasButtonPosition,
  );
  const splitButtonPosition = blankCanvasButtonPosition.split(' ');
  const [drawingClock, setDrawingClock] = useState(DRAWING_CLOCK_COUNT);
  const executeActionInstance = useExecuteActionInstance();
  const getActionDescription = useGetActionDescription();

  const isFocused = useIsFocused();

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

  useInterval(
    () => {
      const isDrawing = canvasRef.current?.getIsDrawing();
      if (isDrawing === false && !canvasRef.current?.getIsEmpty()) {
        if (drawingClock === 1) {
          handleRecognize();
          setDrawingClock(DRAWING_CLOCK_COUNT);
        } else {
          setDrawingClock(prev => prev - 1);
        }
      } else if (isDrawing === false) {
        setDrawingClock(DRAWING_CLOCK_COUNT);
      }
    },
    autoLaunch && isFocused ? 100 : null,
  );

  return (
    <Box flex={1} bg="canvas.background" safeAreaTop>
      <Canvas
        bg={colors.canvas.background}
        strokeColor={colors.canvas.stroke}
        strokeWidth={10}
        ref={canvasRef}
      />
      <Box
        position="absolute"
        {...(splitButtonPosition[1] === 'left' ? { right: 6 } : { left: 6 })}
        bottom={10}
      >
        <FloatingButton
          onPress={() => navigation.replace('Root', { screen: 'Custom' })}
        >
          <IonIcon name="home" size={5} color="gray.500" />
        </FloatingButton>
      </Box>
      {shouldShowButtons &&
        shouldAlsoShowButtons &&
        splitButtonPosition.length > 1 && (
          <VStack
            position="absolute"
            h="full"
            {...(splitButtonPosition[1] === 'left'
              ? { left: 6 }
              : { right: 6 })}
            bottom={0}
            pt={2}
            pb={10}
            space={2}
            justifyContent={
              splitButtonPosition[0] === 'top'
                ? 'flex-start'
                : splitButtonPosition[0] === 'mid'
                ? 'center'
                : 'flex-end'
            }
          >
            {splitButtonPosition[0] !== 'top' && (
              <FloatingButton onPress={handleRecognize}>
                <IonIcon name="scan" size={18} color="canvas.stroke" />
              </FloatingButton>
            )}
            <FloatingButton onPress={() => canvasRef.current?.reset()}>
              <IonIcon name="close-circle" size={5} color="gray.500" />
            </FloatingButton>
            {splitButtonPosition[0] === 'top' && (
              <FloatingButton onPress={handleRecognize}>
                <IonIcon name="scan" size={18} color="canvas.stroke" />
              </FloatingButton>
            )}
          </VStack>
        )}
    </Box>
  );
};
