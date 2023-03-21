import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { theme } from '../theme';
import { TabNavigator } from './TabNavigator';

export const RootNavigator = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
