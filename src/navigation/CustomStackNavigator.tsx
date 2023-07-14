import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  AppList,
  Custom,
  ActionList,
  GestureList,
  WholeActionList,
  ParamActionList,
  BlankCanvas,
  UrlSchemeHelp,
  Help,
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
  GestureList: undefined;
  WholeActionList: undefined;
  BlankCanvas: undefined;
  UrlSchemeHelp: undefined;
  Help: undefined;
};

export type CustomStackNavigationProp =
  NativeStackNavigationProp<CustomStackParamList>;

const Stack = createNativeStackNavigator<CustomStackParamList>();

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
      <Stack.Screen name="GestureList" component={GestureList} />
      <Stack.Screen name="WholeActionList" component={WholeActionList} />
      <Stack.Screen name="UrlSchemeHelp" component={UrlSchemeHelp} />
      <Stack.Screen
        name="BlankCanvas"
        component={BlankCanvas}
        options={{ presentation: 'fullScreenModal' }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};
