import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  ComponentRef,
} from 'react';
import { Dimensions } from 'react-native';
import {
  Box,
  Center,
  HStack,
  VStack,
  Pressable,
  Input,
  useTheme,
  useToast,
} from 'native-base';
import SingleBottomSheetModal from './SingleBottomSheetModal';
import Canvas from './Canvas';
import { Typography } from './Typography';
import { IonIcon } from './IonIcon';
import { GestureDataElement, GestureError } from '../features/gesture/types';
import { useAppDispatch } from '../hooks';
import { gestureActions } from '../store/slices/gesture';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { generateId } from '../utils';
import { AnimatedCircularProgress } from './AnimatedCircularProgress';
import { AnimatedIconButton } from './AnimatedIconButton';
import { AnimatedConfirm } from './AnimatedConfirm';
import { AnimatedSentence } from './AnimatedSentence';
import { Toast } from './Toast';
import { useTranslation } from 'react-i18next';

interface Props {
  onRedirect?: (id: string) => void;
}

export const GestureAdditionBottomSheetModal = forwardRef<
  SingleBottomSheetModal,
  Props
>(({ onRedirect }, ref) => {
  const { t } = useTranslation('gesture');
  const dispatch = useAppDispatch();
  const canvasRef = useRef<Canvas>(null);
  const inputRef = useRef<ComponentRef<typeof Input>>(null);
  const { dismiss } = useBottomSheetModal();
  const [gestureData, setGestureData] = useState<GestureDataElement[]>([]);
  const [name, setName] = useState<string>('');
  const { colors } = useTheme();
  const toast = useToast();

  const handleAddGestureData = useCallback(() => {
    const gestureResult = canvasRef.current?.getGesture();

    if (gestureResult?.success) {
      if (gestureData.length === 3 && name === '') {
        toast.show({
          render: () => (
            <Toast
              iconName="text"
              iconColor="orange.700"
              message={t('message.enter_gesture_name')}
            />
          ),
          placement: 'top',
          duration: 1500,
        });
        inputRef.current?.focus();
        return;
      }
      setGestureData(prev => [...prev, gestureResult.data]);
      canvasRef.current?.reset();
    } else {
      let message = '';
      switch (gestureResult?.error) {
        case GestureError.EmptyPoints:
          message = t('message.draw_gesture');

          break;
        case GestureError.DotStroke:
          message = t('message.no_dot_stroke');
          break;
        default:
          message = t('message.not_allowed');
      }
      toast.show({
        render: () => (
          <Toast iconName="warning" iconColor="orange.700" message={message} />
        ),
        duration: 1000,
        placement: 'top',
      });
    }
  }, [gestureData, name, toast, t]);

  const handleDismiss = useCallback(() => {
    setGestureData([]);
    setName('');
  }, []);

  useEffect(() => {
    if (gestureData.length === 4) {
      const id = generateId();
      dispatch(
        gestureActions.addGesture({
          id,
          name,
          data: gestureData,
        }),
      );
      if (onRedirect) {
        onRedirect(id);
        dismiss();
      }
    }

    if (gestureData.length >= 1 && gestureData.length <= 3) {
      toast.show({
        render: () => (
          <Toast
            iconName="checkmark-circle"
            iconColor="blue.500"
            message={
              gestureData.length === 3
                ? t('message.one_time_left')
                : t('message.few_times_left', { num: 4 - gestureData.length })
            }
          />
        ),
        duration: 1000,
        placement: 'top',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gestureData]);

  return (
    <SingleBottomSheetModal
      ref={ref}
      enableContentPanningGesture={false}
      onDismiss={handleDismiss}
    >
      {gestureData.length < 4 ? (
        <VStack
          px={6}
          pt={1.5}
          pb={7.5}
          space={4}
          height={Dimensions.get('window').height * 0.8}
        >
          <HStack
            bg="gray.300"
            borderRadius={32}
            px={3}
            space={2}
            height="72px"
            justifyContent="space-between"
            alignItems="center"
          >
            <Pressable onPress={() => canvasRef.current?.reset()}>
              {({ isPressed }) => (
                <Center
                  bg={isPressed ? 'gray.300' : 'gray.100'}
                  width={50}
                  height={50}
                  borderRadius={25}
                >
                  <IonIcon name="close-circle" size={18} color="gray.500" />
                  <Typography variant="caption">
                    {t('gestureAddition.clear')}
                  </Typography>
                </Center>
              )}
            </Pressable>
            <VStack flex={1} space={2} alignItems="center">
              <Typography bold variant="body">
                {t('gestureAddition.title')}
              </Typography>
              <Input
                ref={inputRef}
                variant="unstyled"
                defaultValue={name}
                onChangeText={text => setName(text)}
                placeholder={t('gestureAddition.name_placeholder')}
                placeholderTextColor="gray.600"
                color="gray.900"
                p={0}
                textAlign="center"
                lineHeight={14}
                fontWeight="normal"
              />
            </VStack>
            <Pressable onPress={handleAddGestureData}>
              {({ isPressed }) => (
                <Center
                  bg={isPressed ? 'gray.300' : 'gray.100'}
                  width={50}
                  height={50}
                  borderRadius={25}
                >
                  <IonIcon
                    name={
                      gestureData.length < 3
                        ? 'chevron-forward-circle'
                        : 'checkmark-circle'
                    }
                    size={18}
                    color={gestureData.length < 3 ? 'gray.500' : 'blue.500'}
                  />
                  <Typography variant="caption">{`${
                    gestureData.length + 1
                  }/4`}</Typography>
                  <AnimatedCircularProgress
                    progress={(gestureData.length + 1) / 4}
                  />
                </Center>
              )}
            </Pressable>
          </HStack>
          <Canvas ref={canvasRef} />
        </VStack>
      ) : (
        <VStack alignItems="center" pb={12} space={0}>
          <Box position="absolute" right={2} top={-16}>
            <AnimatedIconButton
              name="close-circle"
              size={8}
              color="gray.400"
              onPress={() => dismiss()}
            />
          </Box>
          <AnimatedConfirm />
          <AnimatedSentence
            fontSize="xl"
            fontWeight="bold"
            color={colors.gray[900]}
            content={t('message.gesture_added')}
            duration={800}
          />
        </VStack>
      )}
    </SingleBottomSheetModal>
  );
});
