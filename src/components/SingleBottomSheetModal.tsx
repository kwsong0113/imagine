import React, { ReactNode, forwardRef, useMemo, ComponentProps } from 'react';
import { useTheme } from 'native-base';
import {
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { StyleSheet } from 'react-native';

export const CustomBackdrop = (props: BottomSheetBackdropProps) => {
  const { colors } = useTheme();

  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.4}
      style={[props.style, { backgroundColor: colors.gray[800] }]}
    />
  );
};

type SingleBottomSheetModalProps = {
  children: ReactNode;
} & Partial<ComponentProps<typeof BottomSheetModal>>;

type SingleBottomSheetModal = BottomSheetModalMethods;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
  handle: {
    padding: 10,
  },
  handleIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  background: {
    borderRadius: 28,
  },
});

const SingleBottomSheetModal = forwardRef<
  BottomSheetModal,
  SingleBottomSheetModalProps
>((props, ref) => {
  const { colors } = useTheme();
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

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
      handleStyle={styles.handle}
      handleIndicatorStyle={[
        styles.handleIndicator,
        { backgroundColor: colors.gray[400] },
      ]}
      backgroundStyle={[
        styles.background,
        { backgroundColor: colors.gray[100] },
      ]}
      {...props}
    >
      <BottomSheetView onLayout={handleContentLayout}>
        {props.children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default SingleBottomSheetModal;
