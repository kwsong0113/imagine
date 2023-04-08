import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppList, Custom, ActionList, CanvasTest } from '../screens/Custom';

export type CustomStackParamList = {
  Home: undefined;
  AppList: undefined;
  ActionList: undefined;
  CanvasTest: undefined;
};

const Stack = createStackNavigator<CustomStackParamList>();

export const CustomStackNavigator = () => {
  return (
    <Stack.Navigator
      id="Custom"
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Custom} />
      <Stack.Screen name="AppList" component={AppList} />
      <Stack.Screen name="ActionList" component={ActionList} />
      <Stack.Screen name="CanvasTest" component={CanvasTest} />
    </Stack.Navigator>
  );
};
