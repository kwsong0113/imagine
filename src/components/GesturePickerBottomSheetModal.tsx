import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import { HStack, VStack, Image, Text, ScrollView, useTheme } from 'native-base';
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
import { App } from '../features/action/types';
import { appList } from '../features/action/app';
import { getActionFromActionInstance } from '../features/action/utils';
import Animated, {
  FadeInDown,
  Layout,
  LightSpeedOutRight,
} from 'react-native-reanimated';

interface Props {
  appId: number;
  actionId: number;
}

export const GesturePickerBottomSheetModal = forwardRef<
  SingleBottomSheetModal,
  Props
>(({ appId, actionId }, ref) => {
  const gestureList = useAppSelector(selectGestureList);
  const gestureToActionMap = useAppSelector(selectGestureToActionMap);
  const dispatch = useAppDispatch();
  const selectedGestureId = useMemo(() => {
    return Object.keys(gestureToActionMap).find(id => {
      const actionInstance = gestureToActionMap[id];
      return (
        actionInstance.appId === appId && actionInstance.actionId === actionId
      );
    });
  }, [gestureToActionMap, appId, actionId]);
  const [shouldFilterGestures, setShouldFilterGestures] = useState(false);
  const { colors } = useTheme();
  const { dismiss } = useBottomSheetModal();
  const action = useMemo(
    () =>
      (appList.find(({ id }) => id === appId) as App).actions.find(
        ({ id }) => id === actionId,
      ),
    [appId, actionId],
  );

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
          actionInstance: { appId, actionId },
        }),
      );
    },
    [actionId, appId, dispatch, selectedGestureId],
  );

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
            <Typography variant="body">제스처 선택</Typography>
            <Typography variant="description" color="gray.600">
              {action?.description}
            </Typography>
          </VStack>
          <AnimatedIconButton
            name="close-circle"
            size={10}
            color={'gray.500'}
            onPress={() => dismiss()}
          />
        </HStack>
        <ScrollView mx={-3} px={3}>
          {gestureList.map(({ id, name, data }, idx) => {
            if (
              shouldFilterGestures &&
              gestureToActionMap[id] &&
              id !== selectedGestureId
            ) {
              return undefined;
            }

            const description = gestureToActionMap[id]
              ? getActionFromActionInstance(gestureToActionMap[id])?.description
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
                      </HStack>
                      <VStack space={1} pb={1}>
                        <Text fontSize="md" color="gray.900" isTruncated>
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
                          {description ?? '선택 가능'}
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
            사용 중인 제스처 숨기기
          </Typography>
        </HStack>
      </VStack>
    </SingleBottomSheetModal>
  );
});
