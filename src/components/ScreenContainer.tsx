import React from 'react';
import { VStack } from 'native-base';

interface Props {
  children: React.ReactNode;
}

export const ScreenContainer = ({ children }: Props) => {
  return (
    <VStack flex={1} p={6} space={6} bg="gray.100" safeAreaTop>
      {children}
    </VStack>
  );
};
