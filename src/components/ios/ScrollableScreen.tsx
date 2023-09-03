import { ScrollView } from 'native-base';
import React, { ComponentProps } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ScrollableScreenProps
  extends Omit<ComponentProps<typeof ScrollView>, 'padding'> {
  padding?: boolean;
}

export const ScrollableScreen = ({
  padding = false,
  children,
  ...restProps
}: ScrollableScreenProps) => {
  const bottomInset = useSafeAreaInsets().bottom;

  return (
    <ScrollView
      flex={1}
      contentInsetAdjustmentBehavior="automatic"
      scrollIndicatorInsets={{ top: 0, bottom: bottomInset }}
      automaticallyAdjustsScrollIndicatorInsets={false}
      bg="system.background"
      px={padding ? 4 : 0}
      {...restProps}
    >
      {children}
    </ScrollView>
  );
};
