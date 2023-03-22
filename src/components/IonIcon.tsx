import React, { ComponentProps } from 'react';
import { Icon as _Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const IonIcon = (props: Omit<ComponentProps<typeof _Icon>, 'as'>) => {
  return <_Icon as={Ionicons} {...props} />;
};
