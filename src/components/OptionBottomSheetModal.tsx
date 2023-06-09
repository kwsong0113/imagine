import React, { forwardRef, useMemo, ComponentProps } from 'react';
import { Box, Center, HStack, useTheme, VStack } from 'native-base';
import {
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { AnimatedButton } from './AnimatedButton';
import { AnimatedIconButton } from './AnimatedIconButton';
import { CustomBackdrop } from './SingleBottomSheetModal';

type OptionBottomSheetModalProps = {
  title: string;
  description?: string;
  leftButtonTitle: string;
  rightButtonTitle: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  onPressClose?: () => void;
} & Partial<ComponentProps<typeof BottomSheetModal>>;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
  background: {
    borderRadius: 28,
  },
});

const EmptyHandle = () => <></>;

export const OptionSingleBottomSheetModal = forwardRef<
  BottomSheetModal,
  OptionBottomSheetModalProps
>(
  (
    {
      title,
      description,
      leftButtonTitle,
      rightButtonTitle,
      onPressLeft,
      onPressRight,
      onPressClose,
      ...restProps
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    const { dismiss } = useBottomSheetModal();

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        detached={true}
        bottomInset={30}
        backdropComponent={CustomBackdrop}
        style={styles.container}
        handleComponent={EmptyHandle}
        backgroundStyle={[
          styles.background,
          { backgroundColor: colors.gray[100] },
        ]}
        {...restProps}
      >
        <BottomSheetView onLayout={handleContentLayout}>
          <Center h={6}>
            <Box h={1} w={10} borderRadius={7} bg="gray.400" />
          </Center>
          <VStack pt={4} px={6} pb={7.5} space={4}>
            <VStack space={2}>
              <Typography variant="subtitle1">{title}</Typography>
              {description ? (
                <Typography variant="description" color="gray.600" py={1}>
                  {description}
                </Typography>
              ) : (
                <Box h={0} />
              )}
            </VStack>
            <HStack space={4}>
              <AnimatedButton
                bg="gray.500"
                title={leftButtonTitle}
                onPress={onPressLeft}
              />
              <AnimatedButton
                bg="blue.500"
                title={rightButtonTitle}
                onPress={onPressRight}
              />
            </HStack>
          </VStack>
          <Box position="absolute" right={2} top={2}>
            <AnimatedIconButton
              name="close-circle"
              size={8}
              color="gray.400"
              onPress={() => {
                dismiss();
                onPressClose?.();
              }}
            />
          </Box>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);
