import React, { useCallback, useRef, useState } from 'react';
import { VStack, HStack, Text, useToast } from 'native-base';
import {
  ScreenContainer,
  Header,
  ListRow,
  AnimatedIconButton,
  GestureAdditionBottomSheetModal,
  SingleBottomSheetModal,
  Typography,
  IonIcon,
  GestureViewBottomSheetModal,
  Toast,
  GesturePreview,
  ScrollableList,
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  gestureActions,
  selectGestureList,
  selectGestureToActionMap,
} from '../../store/slices/gesture';
import Animated, { Layout, LightSpeedOutRight } from 'react-native-reanimated';
import { Gesture } from '../../features/gesture/types';
import { useGetActionDescription } from '../../features/action/utils';
import { useTranslation } from 'react-i18next';

export const GestureList = () => {
  const { t } = useTranslation('gesture');
  const gestureList = useAppSelector(selectGestureList);
  const gestureToActionMap = useAppSelector(selectGestureToActionMap);
  const dispatch = useAppDispatch();
  const getActionDescription = useGetActionDescription();
  const [selectedGesture, setSelectedGesture] = useState<Gesture>();
  const toast = useToast();

  const gestureAdditionBottomSheetModalRef =
    useRef<SingleBottomSheetModal>(null);
  const gestureViewBottomSheetModalRef = useRef<SingleBottomSheetModal>(null);

  const handleViewGesture = useCallback((gesture: Gesture) => {
    setSelectedGesture(gesture);
    gestureViewBottomSheetModalRef.current?.present();
  }, []);

  const handleRemoveGesture = useCallback(
    (id: string, name: string) => {
      dispatch(gestureActions.deleteGesture({ id }));
      toast.show({
        render: () => (
          <Toast
            iconName="checkmark-circle"
            iconColor="red.700"
            bg="gray.300"
            message={t('message.remove_gesture', { name })}
          />
        ),
        duration: 1000,
      });
    },
    [dispatch, toast, t],
  );

  return (
    <ScreenContainer>
      <Header variant="center" title={t('gesture_list')} />
      <ScrollableList>
        <ListRow
          title={t('add_gesture')}
          right={
            <IonIcon name="add-circle-outline" color="blue.500" size={8} />
          }
          hasBottomBorder={gestureList.length === 0}
          onPress={() => {
            gestureAdditionBottomSheetModalRef.current?.present();
          }}
        />
        <GestureAdditionBottomSheetModal
          ref={gestureAdditionBottomSheetModalRef}
        />
        <GestureViewBottomSheetModal
          ref={gestureViewBottomSheetModalRef}
          gesture={selectedGesture}
        />
        {gestureList.map(({ id, name, data }, idx) => {
          const description = gestureToActionMap[id]
            ? getActionDescription(gestureToActionMap[id])
            : undefined;
          return (
            <Animated.View
              key={id}
              layout={Layout.springify()}
              exiting={LightSpeedOutRight}
            >
              <ListRow
                left={
                  <HStack flex={1} space={3} alignItems="center">
                    <HStack space={1}>
                      <GesturePreview name={name} base64={data[0].base64} />
                    </HStack>
                    <VStack space={1} pb={1}>
                      <Text fontSize="md" color="gray.900" isTruncated>
                        {name}
                      </Text>
                      <Typography
                        variant="description"
                        color={description ? 'teal.600' : 'gray.600'}
                        isTruncated
                      >
                        {description ?? t('unassigned_gesture')}
                      </Typography>
                    </VStack>
                  </HStack>
                }
                right={
                  <AnimatedIconButton
                    name="remove-circle-outline"
                    color="red.500"
                    size={8}
                    onPress={() => handleRemoveGesture(id, name)}
                  />
                }
                hasBottomBorder={idx === gestureList.length - 1}
                onPress={() => handleViewGesture({ id, name, data })}
              />
            </Animated.View>
          );
        })}
      </ScrollableList>
    </ScreenContainer>
  );
};
