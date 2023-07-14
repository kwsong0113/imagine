import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Detail } from '../screens/Statistics';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from '@react-navigation/native';
import { AppStackParamList } from './AppStackNavigator';

export type StatisticsStackParamList = {
  Detail: undefined;
};

export type StatisticsStackNavigationProp<
  T extends keyof StatisticsStackParamList,
> = CompositeNavigationProp<
  NativeStackNavigationProp<StatisticsStackParamList, T>,
  NativeStackNavigationProp<AppStackParamList>
>;

export type StatisticsStackScreenProps<
  T extends keyof StatisticsStackParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<StatisticsStackParamList, T>,
  NativeStackScreenProps<AppStackParamList>
>;

const Stack = createNativeStackNavigator<StatisticsStackParamList>();

export const StatisticsStackNavigator = () => {
  return (
    <Stack.Navigator
      id="Statistics"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};
