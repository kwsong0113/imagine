import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppList, Custom, ActionList } from '../screens/Custom';

export type CustomStackParamList = {
  Home: undefined;
  AppList: undefined;
  ActionList: undefined;
};

const Stack = createStackNavigator<CustomStackParamList>();

export const CustomStackNavigator = () => {
  return (
    <Stack.Navigator
      id="Custom"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Custom} />
      <Stack.Screen name="AppList" component={AppList} />
      <Stack.Screen name="ActionList" component={ActionList} />
    </Stack.Navigator>
  );
};
