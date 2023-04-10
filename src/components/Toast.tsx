import React, { ComponentProps } from 'react';
import { HStack } from 'native-base';
import { IonIcon } from './IonIcon';
import { Typography } from './Typography';

interface Props {
  iconName: string;
  iconColor: ComponentProps<typeof IonIcon>['color'];
  message: string;
}

export const Toast = ({ iconName, iconColor, message }: Props) => {
  return (
    <HStack
      alignItems="center"
      bg="gray.100"
      borderRadius={16}
      px={3}
      py={4}
      space={1.5}
      mb={8}
    >
      <IonIcon name={iconName} size={5} color={iconColor} />
      <Typography variant="body">{message}</Typography>
    </HStack>
  );
};
