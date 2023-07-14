import React from 'react';
import { VStack, ScrollView } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
}

export const ScrollableList = ({ children }: Props) => {
  const bottomInset = useSafeAreaInsets().bottom;

  return (
    <ScrollView
      mx={-6}
      px={6}
      mb={-6}
      scrollIndicatorInsets={{ top: 0, bottom: bottomInset }}
      automaticallyAdjustsScrollIndicatorInsets={false}
    >
      <VStack safeAreaBottom>{children}</VStack>
    </ScrollView>
  );
};
