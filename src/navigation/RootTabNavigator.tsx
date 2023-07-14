import React from 'react';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Setting, Statistics, Custom } from '../screens';
import { useTheme } from 'native-base';
import { IonIcon } from '../components';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { AppStackParamList } from './AppStackNavigator';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from '@react-navigation/native';

export type RootTabParamList = {
  Custom: undefined;
  Statistics: undefined;
  Setting: undefined;
};

export type RootTabNavigationProp<T extends keyof RootTabParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, T>,
    NativeStackNavigationProp<AppStackParamList>
  >;

export type RootTabScreenProps<T extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, T>,
    NativeStackScreenProps<AppStackParamList>
  >;

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabBarIconMap: Record<
  string,
  ({ color }: { color: string }) => JSX.Element
> = {
  Statistics: ({ color }) => (
    <IonIcon name="stats-chart" size={34.67} color={color} />
  ),
  Custom: ({ color }) => <IonIcon name="add-circle" size={10} color={color} />,
  Setting: ({ color }) => <IonIcon name="cog-sharp" size={10} color={color} />,
};

export const RootTabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Custom"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'orange.700',
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          height: 86,
          backgroundColor: colors.gray[100],
          borderTopWidth: 0,
        },
        tabBarIcon: tabBarIconMap[route.name],
      })}
    >
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarItemStyle: {
            borderTopLeftRadius: 30,
            borderTopColor: colors.gray[300],
            borderTopWidth: 1,
          },
        }}
      />
      <Tab.Screen
        name="Custom"
        component={Custom}
        options={{
          tabBarItemStyle: {
            borderTopColor: colors.gray[300],
            borderTopWidth: 1,
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarItemStyle: {
            borderTopRightRadius: 30,
            borderTopColor: colors.gray[300],
            borderTopWidth: 1,
          },
        }}
      />
    </Tab.Navigator>
  );
};
