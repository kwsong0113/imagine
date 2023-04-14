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
  WholeActionList,
  ParamActionList,
  BlankCanvas,
  UrlSchemeHelp,
} from '../screens/Custom';

export type CustomStackParamList = {
  Home: undefined;
  AppList: undefined;
  ActionList: { appId: number };
  ParamActionList: {
    appId: number;
    actionId: number;
    type?: 'shortcutList' | 'customURLSchemeList';
  };
  CanvasTest: undefined;
  GestureList: undefined;
  WholeActionList: undefined;
  BlankCanvas: undefined;
  UrlSchemeHelp: undefined;
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
      <Stack.Screen name="WholeActionList" component={WholeActionList} />
      <Stack.Screen name="UrlSchemeHelp" component={UrlSchemeHelp} />

      <Stack.Screen
        name="BlankCanvas"
        component={BlankCanvas}
        options={{ animationEnabled: false }}
      />
    </Stack.Navigator>
  );
};
