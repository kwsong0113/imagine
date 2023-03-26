import React, { ReactNode, forwardRef } from 'react';
import { useTheme } from 'native-base';
import {
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { StyleSheet } from 'react-native';

const CustomBackdrop = (props: BottomSheetBackdropProps) => {
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

interface SingleBottomSheetModalProps {
  children: ReactNode;
}

type SingleBottomSheetModal = BottomSheetModalMethods;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
  handle: {
    padding: 8,
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

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={['30%']}
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
      detached={true}
      bottomInset={30}
    >
      {props.children}
    </BottomSheetModal>
  );
});

export default SingleBottomSheetModal;
