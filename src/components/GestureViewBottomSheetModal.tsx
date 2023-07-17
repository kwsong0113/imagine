import React, { forwardRef, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import { HStack, VStack, Image, Text } from 'native-base';
import SingleBottomSheetModal from './SingleBottomSheetModal';
import { Typography } from './Typography';
import { AnimatedIconButton } from './AnimatedIconButton';
import { Gesture } from '../features/gesture/types';

interface Props {
  gesture?: Gesture;
}

export const GestureViewBottomSheetModal = forwardRef<
  SingleBottomSheetModal,
  Props
>(({ gesture }, ref) => {
  const [dataIdx, setDataIdx] = useState(0);

  const handleDismiss = useCallback(() => {
    setDataIdx(0);
  }, []);

  const handleDecreaseIdx = useCallback(() => {
    setDataIdx(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleIncreaseIdx = useCallback(() => {
    setDataIdx(prev => (prev < 3 ? prev + 1 : prev));
  }, []);

  return (
    <SingleBottomSheetModal ref={ref} onDismiss={handleDismiss}>
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
          <AnimatedIconButton
            name="chevron-back-circle"
            size={10}
            color={dataIdx === 0 ? 'gray.400' : 'teal.600'}
            onPress={handleDecreaseIdx}
          />
          <VStack flex={1} space={2} alignItems="center">
            <Typography bold variant="body" color="teal.600">
              {`${dataIdx + 1} / 4`}
            </Typography>
            <Text
              fontWeight="normal"
              fontSize="xs"
              color="gray.600"
              isTruncated
            >
              {gesture?.name}
            </Text>
          </VStack>
          <AnimatedIconButton
            name="chevron-forward-circle"
            size={10}
            color={dataIdx === 3 ? 'gray.400' : 'teal.600'}
            onPress={handleIncreaseIdx}
          />
        </HStack>
        {gesture && (
          <Image
            alt={gesture.name}
            flex={1}
            bg="gray.300"
            borderRadius={28}
            source={{
              uri: `data:image/png;base64,${gesture.data[dataIdx].base64}`,
            }}
            resizeMode="contain"
          />
        )}
      </VStack>
    </SingleBottomSheetModal>
  );
});
