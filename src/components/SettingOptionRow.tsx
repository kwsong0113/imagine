import React from 'react';
import { HStack, Pressable } from 'native-base';
import { Typography, IonIcon } from './';

interface Props {
  title: string;
  isSelected: boolean;
  onPress?: () => void;
}

export const SettingOptionRow = ({ title, isSelected, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => (
        <HStack
          px={6}
          py={3}
          bg={isPressed && !isSelected ? 'gray.200' : 'gray.100'}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body"
            color={isSelected ? 'gray.900' : 'gray.500'}
          >
            {title}
          </Typography>
          <IonIcon
            name="checkmark"
            color={
              isSelected ? 'teal.600' : isPressed ? 'teal.100' : 'gray.100'
            }
            size={6}
          />
        </HStack>
      )}
    </Pressable>
  );
};
