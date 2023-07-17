import React from 'react';
import { VStack, HStack, Center } from 'native-base';
import { Typography } from './Typography';
import { AnimatedIconButton } from './AnimatedIconButton';
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
    <VStack space={3}>
      <HStack space={2.5} alignItems="center">
        {hasBackButton && (
          <AnimatedIconButton
            name="chevron-back-circle"
            color="gray.500"
            size={30}
            onPress={navigation.goBack}
          />
        )}
        {variant === 'left' ? (
          <Typography bold variant="title">
            {title}
          </Typography>
        ) : (
          <Center flex={1} pr={hasBackButton ? 10 : 0}>
            <Typography bold variant="subtitle2">
              {title}
            </Typography>
          </Center>
        )}
      </HStack>
      {description && variant === 'left' && (
        <Typography variant="body">{description}</Typography>
      )}
    </VStack>
  );
};
