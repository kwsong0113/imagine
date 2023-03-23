import React from 'react';
import { TouchableOpacity } from 'react-native';
import { VStack, HStack, Center } from 'native-base';
import { IonIcon } from './IonIcon';
import { Typography } from './Typography';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  variant?: 'left' | 'center';
  hasBackButton?: boolean;
  title?: string;
  description?: string;
}

export const Header = ({
  variant = 'left',
  hasBackButton = true,
  title,
  description,
}: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <VStack space="3" bg="teal.100">
      <HStack space="2.5" alignItems="center">
        {hasBackButton && (
          <TouchableOpacity activeOpacity={0.4} onPress={navigation.goBack}>
            <IonIcon name="chevron-back-circle" color="gray.500" size="30" />
          </TouchableOpacity>
        )}
        {variant === 'left' ? (
          <Typography variant="title">{title}</Typography>
        ) : (
          <Center flex="1" pr={hasBackButton ? '10' : '0'}>
            <Typography variant="title">{title}</Typography>
          </Center>
        )}
      </HStack>
      {description && variant === 'left' && (
        <Typography variant="body">{description}</Typography>
      )}
    </VStack>
  );
};
