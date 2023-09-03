import { VStack } from 'native-base';
import React, { ComponentProps } from 'react';

export interface VStackScreenProps
  extends Omit<ComponentProps<typeof VStack>, 'padding'> {
  padding?: boolean;
}

export const VStackScreen = ({
  padding = false,
  children,
  ...restProps
}: VStackScreenProps) => {
  return (
    <VStack
      flex={1}
      bg="system.background"
      px={padding ? 4 : 0}
      safeAreaBottom
      {...restProps}
    >
      {children}
    </VStack>
  );
};
