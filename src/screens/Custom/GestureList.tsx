import React, { useCallback, useRef, useState } from 'react';
import { VStack, HStack, Image, ScrollView, Text } from 'native-base';
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
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { gestureActions, selectGestureList } from '../../store/slices/gesture';
import Animated, { Layout, LightSpeedOutRight } from 'react-native-reanimated';
import { Gesture } from '../../features/gesture/types';

export const GestureList = () => {
  const gestureList = useAppSelector(selectGestureList);
  const dispatch = useAppDispatch();
  const [selectedGesture, setSelectedGesture] = useState<Gesture>();

  const gestureAdditionBottomSheetModalRef =
    useRef<SingleBottomSheetModal>(null);
  const gestureViewBottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const handleGesturePress = useCallback((gesture: Gesture) => {
    setSelectedGesture(gesture);
    gestureViewBottomSheetModalRef.current?.present();
  }, []);

  return (
    <ScreenContainer>
      <Header variant="center" title="제스처 목록" />
      <ScrollView mx={-3} px={3}>
        <ListRow
          title="제스처 추가하기"
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
        {gestureList.map(({ id, name, data }, idx) => (
          <Animated.View
            key={id}
            layout={Layout.springify()}
            exiting={LightSpeedOutRight}
          >
            <ListRow
              key={id}
              left={
                <HStack flex={1} space={3} alignItems="center">
                  <HStack space={1}>
                    {/* {data.map(({ base64 }) => ( */}
                    <Image
                      alt={name}
                      width={8}
                      height={10}
                      bg="gray.300"
                      borderRadius={8}
                      source={{
                        uri: `data:image/png;base64,${data[0].base64}`,
                      }}
                      resizeMode="contain"
                    />
                    {/* ))} */}
                  </HStack>
                  <VStack space={1} pb={1}>
                    <Text fontSize="md" color="gray.900" isTruncated>
                      {name}
                    </Text>
                    <Typography
                      variant="description"
                      color="gray.600"
                      isTruncated
                    >
                      Safari 앱 열기
                    </Typography>
                  </VStack>
                </HStack>
              }
              right={
                <AnimatedIconButton
                  name="remove-circle-outline"
                  color="red.500"
                  size={8}
                  onPress={() => dispatch(gestureActions.deleteGesture({ id }))}
                />
              }
              hasBottomBorder={idx === gestureList.length - 1}
              onPress={() => handleGesturePress({ id, name, data })}
            />
          </Animated.View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};
