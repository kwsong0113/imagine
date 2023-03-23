import React from 'react';
import { VStack, HStack } from 'native-base';
import { IonIcon } from './IonIcon';
import { Typography } from './Typography';

interface HeaderProps {
  leftIcon?: string;
  title: string;
  description: string;
}

export const Header = ({ leftIcon, title, description }: HeaderProps) => {
  return (
    <VStack space={3}>
      <HStack space={2.5} alignItems="center">
        {leftIcon && <IonIcon name={leftIcon} color="gray.500" size="30px" />}
        <Typography variant="title">{title}</Typography>
      </HStack>
      <Typography variant="body">{description}</Typography>
    </VStack>
  );
};
