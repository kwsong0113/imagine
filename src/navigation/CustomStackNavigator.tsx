import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  AppList,
  Custom,
  ActionList,
  CanvasTest,
  GestureList,
  ParamActionList,
} from '../screens/Custom';

export type CustomStackParamList = {
  Home: undefined;
  AppList: undefined;
  ActionList: { appId: number };
  ParamActionList: { appId: number; actionId: number };
  CanvasTest: undefined;
  GestureList: undefined;
};

export type CustomStackNavigationProp =
  StackNavigationProp<CustomStackParamList>;

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
      <Stack.Screen name="ParamActionList" component={ParamActionList} />
      <Stack.Screen name="CanvasTest" component={CanvasTest} />
      <Stack.Screen name="GestureList" component={GestureList} />
    </Stack.Navigator>
  );
};
