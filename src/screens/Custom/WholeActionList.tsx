import React, { useCallback, useRef, useState } from 'react';
import { VStack, HStack, Text } from 'native-base';
import {
  ScreenContainer,
  Header,
  ListRow,
  AnimatedIconButton,
  SingleBottomSheetModal,
  Typography,
  GestureViewBottomSheetModal,
  GesturePreview,
  ScrollableList,
} from '../../components';
import { useAppSelector, useHandleRemoveAction } from '../../hooks';
import {
  selectActiveGestureList,
  selectGestureToActionMap,
} from '../../store/slices/gesture';
import Animated, { Layout, LightSpeedOutRight } from 'react-native-reanimated';
import { Gesture } from '../../features/gesture/types';
import { useGetActionDescription } from '../../features/action/utils';
import { useTranslation } from 'react-i18next';

export const WholeActionList = () => {
  const { t } = useTranslation('gesture');
  const activeGestureList = useAppSelector(selectActiveGestureList);
  const gestureToActionMap = useAppSelector(selectGestureToActionMap);
  const [selectedGesture, setSelectedGesture] = useState<Gesture>();
  const getActionDescription = useGetActionDescription();

  const gestureViewBottomSheetModalRef = useRef<SingleBottomSheetModal>(null);

  const handleViewGesture = useCallback((gesture: Gesture) => {
    setSelectedGesture(gesture);
    gestureViewBottomSheetModalRef.current?.present();
  }, []);

  const handleRemoveAction = useHandleRemoveAction();

  return (
    <>
      <ScreenContainer>
        <Header variant="center" title={t('action_list')} />
        <ScrollableList>
          {activeGestureList.map(({ id, name, data }, idx) => {
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
                      <VStack flex={1} space={1}>
                        <Typography variant="info" isTruncated>
                          {description}
                        </Typography>
                        <Text fontSize="xs" color={'teal.600'} isTruncated>
                          {name}
                        </Text>
                      </VStack>
                    </HStack>
                  }
                  right={
                    <AnimatedIconButton
                      name="remove-circle-outline"
                      color="red.500"
                      size={8}
                      onPress={() => handleRemoveAction(id, description ?? '')}
                    />
                  }
                  hasBottomBorder={idx === activeGestureList.length - 1}
                  onPress={() => handleViewGesture({ id, name, data })}
                />
              </Animated.View>
            );
          })}
        </ScrollableList>
      </ScreenContainer>
      <GestureViewBottomSheetModal
        ref={gestureViewBottomSheetModalRef}
        gesture={selectedGesture}
      />
    </>
  );
};
