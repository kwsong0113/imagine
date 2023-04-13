import React from 'react';
import { Image } from 'native-base';

const appIconMap: Record<number, any> = {
  0: require('../assets/images/apps/0.png'),
  1: require('../assets/images/apps/1.png'),
  2: require('../assets/images/apps/2.png'),
  3: require('../assets/images/apps/3.png'),
  4: require('../assets/images/apps/4.png'),
  5: require('../assets/images/apps/5.png'),
  6: require('../assets/images/apps/6.png'),
  7: require('../assets/images/apps/7.png'),
  8: require('../assets/images/apps/8.png'),
  9: require('../assets/images/apps/9.png'),
  10: require('../assets/images/apps/10.png'),
  11: require('../assets/images/apps/11.png'),
  12: require('../assets/images/apps/12.png'),
  1000: require('../assets/images/apps/1000.png'),
};

interface Props {
  id: number;
  name: string;
}

export const AppIcon = ({ id, name }: Props) => (
  <Image alt={name} source={appIconMap[id]} size={9} />
);
