import React from 'react';
import { VStack, Text, HStack } from 'native-base';
import { IonIcon } from './IonIcon';

interface HeaderProps {
  title: string;
  description: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <VStack space={3}>
      <HStack space={2.5} alignItems="center">
        <IonIcon name="chevron-back-circle" color="gray.500" size="30px" />
        <Text fontSize="4xl" color="gray.900">
          {title}
        </Text>
      </HStack>
      <Text fontSize="md" color="gray.900">
        {description}
      </Text>
    </VStack>
  );
};
