import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  AppList,
  ActionList,
  GestureList,
  WholeActionList,
  ParamActionList,
  UrlSchemeHelp,
} from '../screens/Custom';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from '@react-navigation/native';
import { AppStackParamList } from './AppStackNavigator';

export type CustomStackParamList = {
  AppList: undefined;
  ActionList: { appId: number };
  ParamActionList: {
    appId: number;
    actionId: number;
    type?: 'shortcutList' | 'customURLSchemeList';
  };
  GestureList: undefined;
  WholeActionList: undefined;
  UrlSchemeHelp: undefined;
};

export type CustomStackNavigationProp<T extends keyof CustomStackParamList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<CustomStackParamList, T>,
    NativeStackNavigationProp<AppStackParamList>
  >;

export type CustomStackScreenProps<T extends keyof CustomStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CustomStackParamList, T>,
    NativeStackScreenProps<AppStackParamList>
  >;

const Stack = createNativeStackNavigator<CustomStackParamList>();

export const CustomStackNavigator = () => {
  return (
    <Stack.Navigator
      id="Custom"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AppList" component={AppList} />
      <Stack.Screen name="ActionList" component={ActionList} />
      <Stack.Screen name="ParamActionList" component={ParamActionList} />
      <Stack.Screen name="GestureList" component={GestureList} />
      <Stack.Screen name="WholeActionList" component={WholeActionList} />
      <Stack.Screen name="UrlSchemeHelp" component={UrlSchemeHelp} />
    </Stack.Navigator>
  );
};
