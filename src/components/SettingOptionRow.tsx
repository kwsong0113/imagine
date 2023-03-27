import React from 'react';
import { HStack, Pressable, useTheme } from 'native-base';
import { Typography, AnimatedCheckmark } from './';
import { useColorModeValue } from '../hooks';

interface Props {
  title: string;
  isSelected: boolean;
  onPress?: () => void;
}

export const SettingOptionRow = ({ title, isSelected, onPress }: Props) => {
  const { colors } = useTheme();
  const pressedBackgroundColor = useColorModeValue('gray.300', 'gray.200');
  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => (
        <HStack
          px={3}
          py={3}
          bg={isPressed && !isSelected ? pressedBackgroundColor : 'gray.100'}
          borderRadius={18}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body"
            color={isSelected ? 'gray.900' : 'gray.500'}
          >
            {title}
          </Typography>
          <AnimatedCheckmark
            isChecked={isSelected}
            size={24}
            color={colors.teal[600]}
          />
        </HStack>
      )}
    </Pressable>
  );
};
