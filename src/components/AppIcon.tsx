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
  13: require('../assets/images/apps/13.png'),
  14: require('../assets/images/apps/14.png'),
  15: require('../assets/images/apps/15.png'),
  16: require('../assets/images/apps/16.png'),
  17: require('../assets/images/apps/17.png'),
  18: require('../assets/images/apps/18.png'),
  19: require('../assets/images/apps/19.png'),
  20: require('../assets/images/apps/20.png'),
  21: require('../assets/images/apps/21.png'),
  22: require('../assets/images/apps/22.png'),
  23: require('../assets/images/apps/23.png'),
  24: require('../assets/images/apps/24.png'),
  25: require('../assets/images/apps/25.png'),
  26: require('../assets/images/apps/26.png'),
  27: require('../assets/images/apps/27.png'),
  28: require('../assets/images/apps/28.png'),
  29: require('../assets/images/apps/29.png'),
  30: require('../assets/images/apps/30.png'),
  31: require('../assets/images/apps/31.png'),
  32: require('../assets/images/apps/32.png'),
  33: require('../assets/images/apps/33.png'),
  34: require('../assets/images/apps/34.png'),
  35: require('../assets/images/apps/35.png'),
  36: require('../assets/images/apps/36.png'),
  37: require('../assets/images/apps/37.png'),
  38: require('../assets/images/apps/38.png'),
  39: require('../assets/images/apps/39.png'),
  40: require('../assets/images/apps/40.png'),
  41: require('../assets/images/apps/41.png'),
  42: require('../assets/images/apps/42.png'),
  43: require('../assets/images/apps/43.png'),
  44: require('../assets/images/apps/44.png'),
  45: require('../assets/images/apps/45.png'),
  46: require('../assets/images/apps/46.png'),
  47: require('../assets/images/apps/47.png'),
  48: require('../assets/images/apps/48.png'),
  49: require('../assets/images/apps/49.png'),
  50: require('../assets/images/apps/50.png'),
  1000: require('../assets/images/apps/1000.png'),
  1001: require('../assets/images/apps/1001.png'),
};

interface Props {
  id: number;
  name: string;
}

export const AppIcon = ({ id, name }: Props) => (
  <Image alt={name} source={appIconMap[id]} size={9} />
);
