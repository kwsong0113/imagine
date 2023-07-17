import React, { forwardRef, useCallback, useState, useRef } from 'react';
import { Dimensions } from 'react-native';
import { HStack, VStack, Text, ScrollView, useTheme } from 'native-base';
import SingleBottomSheetModal from './SingleBottomSheetModal';
import { Typography } from './Typography';
import { AnimatedIconButton } from './AnimatedIconButton';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  selectGestureList,
  gestureActions,
  selectGestureToActionMap,
} from '../store/slices/gesture';
import { ListRow } from './ListRow';
import { AnimatedCheckmark } from './AnimatedCheckmark';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import Animated, {
  FadeInDown,
  Layout,
  LightSpeedOutRight,
} from 'react-native-reanimated';
import { useGetGestureIdForActionInstance } from '../hooks/useGetGestureIdForActionInstance';
import { GestureAdditionBottomSheetModal } from './GestureAdditionBottomSheetModal';
import { IonIcon } from './IonIcon';
import { GesturePreview } from './GesturePreview';
import { useGetActionDescription } from '../features/action/utils';
import { useTranslation } from 'react-i18next';

interface Props {
  appId: number;
  actionId: number;
  param?: string;
}

export const GesturePickerBottomSheetModal = forwardRef<
  SingleBottomSheetModal,
  Props
>(({ appId, actionId, param }, ref) => {
  const { t } = useTranslation('gesture');
  const gestureList = useAppSelector(selectGestureList);
  const gestureToActionMap = useAppSelector(selectGestureToActionMap);
  const dispatch = useAppDispatch();
  const getGestureIdForActionInstance = useGetGestureIdForActionInstance();
  const getActionDescription = useGetActionDescription();
  const selectedGestureId = getGestureIdForActionInstance({
    appId,
    actionId,
    param,
  });
  const [shouldFilterGestures, setShouldFilterGestures] = useState(false);
  const { colors } = useTheme();
  const { dismiss } = useBottomSheetModal();

  const handleSelectGesture = useCallback(
    (gestureId: string) => {
      if (selectedGestureId) {
        dispatch(
          gestureActions.unassignGestureToAction({ id: selectedGestureId }),
        );
      }
      dispatch(
        gestureActions.assignGestureToAction({
          id: gestureId,
          actionInstance: { appId, actionId, param },
        }),
      );
    },
    [actionId, appId, param, dispatch, selectedGestureId],
  );

  const gestureAdditionBottomSheetModalRef =
    useRef<SingleBottomSheetModal>(null);

  return (
    <SingleBottomSheetModal ref={ref} enableContentPanningGesture={false}>
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
          <AnimatedIconButton name="close-circle" size={10} color="gray.300" />
          <VStack flex={1} space={2} alignItems="center">
            <Typography bold variant="body">
              {t('gesturePicker.title')}
            </Typography>
            <Typography variant="description" color="gray.600" isTruncated>
              {getActionDescription({ appId, actionId, param })}
            </Typography>
          </VStack>
          <GestureAdditionBottomSheetModal
            ref={gestureAdditionBottomSheetModalRef}
            onRedirect={handleSelectGesture}
          />
          <AnimatedIconButton
            name="close-circle"
            size={10}
            color={'gray.500'}
            onPress={() => dismiss()}
          />
        </HStack>
        <ScrollView mx={-3} px={3}>
          <ListRow
            title={t('gesturePicker.new_gesture')}
            right={
              <IonIcon name="add-circle-outline" color="blue.500" size={8} />
            }
            hasBottomBorder={gestureList.length === 0}
            onPress={() => {
              gestureAdditionBottomSheetModalRef.current?.present();
            }}
          />
          {gestureList.map(({ id, name, data }, idx) => {
            if (
              shouldFilterGestures &&
              gestureToActionMap[id] &&
              id !== selectedGestureId
            ) {
              return undefined;
            }

            const description = gestureToActionMap[id]
              ? getActionDescription(gestureToActionMap[id])
              : undefined;

            return (
              <Animated.View
                key={id}
                layout={Layout.springify()}
                entering={FadeInDown}
                exiting={LightSpeedOutRight}
              >
                <ListRow
                  key={id}
                  left={
                    <HStack flex={1} space={3} alignItems="center">
                      <HStack space={1}>
                        <GesturePreview name={name} base64={data[0].base64} />
                      </HStack>
                      <VStack flex={1} space={1} pb={1}>
                        <Text
                          fontWeight="normal"
                          fontSize="md"
                          color="gray.900"
                          isTruncated
                        >
                          {name}
                        </Text>
                        <Typography
                          variant="description"
                          color={
                            id === selectedGestureId
                              ? 'teal.600'
                              : description
                              ? 'red.600'
                              : 'gray.600'
                          }
                          isTruncated
                        >
                          {description ?? t('gesturePicker.can_select')}
                        </Typography>
                      </VStack>
                    </HStack>
                  }
                  right={
                    <AnimatedCheckmark
                      isChecked={id === selectedGestureId}
                      color={colors.teal[600]}
                      size={24}
                    />
                  }
                  hasBottomBorder={idx === gestureList.length - 1}
                  onPress={() => handleSelectGesture(id)}
                />
              </Animated.View>
            );
          })}
        </ScrollView>
        <HStack justifyContent="flex-end" alignItems="center" space={1.5}>
          <AnimatedIconButton
            name="checkmark-circle"
            color={shouldFilterGestures ? 'blue.500' : 'gray.500'}
            size={5}
            onPress={() => setShouldFilterGestures(prev => !prev)}
          />
          <Typography
            variant="description"
            color={shouldFilterGestures ? 'blue.500' : 'gray.500'}
          >
            {t('gesturePicker.hide_gesture_in_use')}
          </Typography>
        </HStack>
      </VStack>
    </SingleBottomSheetModal>
  );
});
