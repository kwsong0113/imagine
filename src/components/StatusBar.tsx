import React from 'react';
import { StatusBar as _StatusBar } from 'native-base';
import { useColorModeValue } from '../hooks/useColorModevalue';

export const StatusBar = () => {
  const barStyle = useColorModeValue('dark-content', 'light-content');
  return <_StatusBar barStyle={barStyle} />;
};
