import React from 'react';
import { Box, Pressable, useToken } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import { addOpacity } from '../../utils';

export interface BorderedBoxProps extends InterfaceBoxProps {
  borderColor?: string;
  bold?: boolean;
  tinted?: boolean;
  onPress?: () => void;
}

export const BorderedBox = ({
  borderColor = 'system.gray4',
  bold = false,
  tinted = false,
  children,
  onPress,
  ...restProps
}: BorderedBoxProps) => {
  const [hexBorderColor] = useToken('colors', [borderColor]);

  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => (
        <Box
          bg={
            isPressed && onPress
              ? addOpacity(hexBorderColor, tinted ? 0.3 : 0.1)
              : addOpacity(hexBorderColor, tinted ? 0.2 : 0)
          }
          p={3.5}
          borderColor={borderColor}
          borderWidth={bold ? 1.5 : 1}
          borderRadius={14}
          {...restProps}
        >
          {children}
        </Box>
      )}
    </Pressable>
  );
};
