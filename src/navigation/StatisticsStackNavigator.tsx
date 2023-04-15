import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { Statistics, Detail } from '../screens/Statistics';

export type StatisticsStackParamList = {
  StatisticsHome: undefined;
  Detail: undefined;
};

export type StatisticsStackNavigationProp =
  StackNavigationProp<StatisticsStackParamList>;

const Stack = createStackNavigator<StatisticsStackParamList>();

export const StatisticsStackNavigator = () => {
  return (
    <Stack.Navigator
      id="Statistics"
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="StatisticsHome"
    >
      <Stack.Screen name="StatisticsHome" component={Statistics} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};
