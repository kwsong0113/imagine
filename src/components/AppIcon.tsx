import React from 'react';
import { Image } from 'native-base';

const appIconMap: Record<number, any> = {
  0: require('../assets/images/apps/0.png'),
  1: require('../assets/images/apps/1.png'),
};

interface Props {
  id: number;
  name: string;
}

export const AppIcon = ({ id, name }: Props) => (
  <Image alt={name} source={appIconMap[id]} size={9} />
);
