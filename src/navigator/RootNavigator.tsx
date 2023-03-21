import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { TabNavigator } from './TabNavigator';
import { useCustomTheme } from '../hooks';

export const RootNavigator = () => {
  const theme = useCustomTheme();
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
