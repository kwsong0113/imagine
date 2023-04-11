import React, { ComponentProps } from 'react';
import { HStack } from 'native-base';
import { IonIcon } from './IonIcon';
import { Typography } from './Typography';

type Props = {
  iconName: string;
  iconColor: ComponentProps<typeof IonIcon>['color'];
  message: string;
} & Pick<ComponentProps<typeof HStack>, 'bg'>;

export const Toast = ({
  iconName,
  iconColor,
  message,
  bg = 'gray.100',
}: Props) => {
  return (
    <HStack
      alignItems="center"
      bg={bg}
      borderRadius={16}
      px={3}
      py={4}
      space={1.5}
      mb={12}
    >
      <IonIcon name={iconName} size={5} color={iconColor} />
      <Typography variant="body">{message}</Typography>
    </HStack>
  );
};
