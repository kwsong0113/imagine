import React from 'react';
import { HStack, Pressable, useTheme } from 'native-base';
import { Typography, AnimatedCheckmark } from './';

interface Props {
  title: string;
  isSelected: boolean;
  onPress?: () => void;
}

export const SettingOptionRow = ({ title, isSelected, onPress }: Props) => {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => (
        <HStack
          px={3}
          mx={3}
          py={3}
          bg={isPressed && !isSelected ? 'gray.200' : 'gray.100'}
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
