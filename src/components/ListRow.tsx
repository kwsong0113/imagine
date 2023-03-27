import { HStack, VStack, Pressable } from 'native-base';
import React from 'react';
import { useColorModeValue } from '../hooks';
import { Typography } from './Typography';

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title: string;
  description?: string;
  caption?: string;
  hasTopBorder?: boolean;
  hasBottomBorder?: boolean;
  isPressable?: boolean;
  onPress?: () => void;
}

export const ListRow = ({
  left,
  right,
  title,
  description,
  caption,
  hasTopBorder = true,
  hasBottomBorder = false,
  isPressable = true,
  onPress,
}: Props) => {
  const subColor = useColorModeValue('gray.300', 'gray.200');

  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => (
        <HStack
          mx={-3}
          px={5}
          py={3}
          space={3}
          alignItems="center"
          borderColor={subColor}
          borderTopWidth={hasTopBorder ? 1 : 0}
          borderBottomWidth={hasBottomBorder ? 1 : 0}
          borderRadius={16}
          bg={isPressable && isPressed ? subColor : undefined}
        >
          {left}
          <VStack flex={1} space={2}>
            <Typography variant="body">{title}</Typography>
            {description && (
              <Typography
                variant="description"
                color="gray.600"
                isTruncated={true}
              >
                {description}
              </Typography>
            )}
            {caption && (
              <Typography variant="caption" color="gray.600" isTruncated={true}>
                {caption}
              </Typography>
            )}
          </VStack>
          {right}
        </HStack>
      )}
    </Pressable>
  );
};
