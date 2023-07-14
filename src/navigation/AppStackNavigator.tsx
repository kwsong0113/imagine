import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { RootTabNavigator, RootTabParamList } from './RootTabNavigator';
import {
  StatisticsStackNavigator,
  StatisticsStackParamList,
} from './StatisticsStackNavigator';
import {
  CustomStackNavigator,
  CustomStackParamList,
} from './CustomStackNavigator';
import { BlankCanvas, Help } from '../screens/Custom';

export type AppStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList>;
  CustomStack: NavigatorScreenParams<CustomStackParamList>;
  StatisticsStack: NavigatorScreenParams<StatisticsStackParamList>;
  BlankCanvas: undefined;
  Help: undefined;
};

export type AppStackNavigationProp<T extends keyof AppStackParamList> =
  NativeStackNavigationProp<AppStackParamList, T>;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      id="App"
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Root"
    >
      <Stack.Screen name="Root" component={RootTabNavigator} />
      <Stack.Screen name="CustomStack" component={CustomStackNavigator} />
      <Stack.Screen
        name="StatisticsStack"
        component={StatisticsStackNavigator}
      />
      <Stack.Group>
        <Stack.Screen
          name="BlankCanvas"
          component={BlankCanvas}
          options={{ presentation: 'containedModal' }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{ presentation: 'modal' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
