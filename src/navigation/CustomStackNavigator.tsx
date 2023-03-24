import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppList, Custom, ActionList } from '../screens/Custom';

const Stack = createStackNavigator();

export const CustomStackNavigator = () => {
  return (
    <Stack.Navigator
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
