import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Setting, Statistics } from '../screens';
import { useTheme } from 'native-base';
import { IonIcon } from '../components';
import { CustomStackNavigator } from './CustomStackNavigator';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

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
        component={CustomStackNavigator}
        options={({ route }) => ({
          tabBarItemStyle: {
            borderTopColor: colors.gray[300],
            borderTopWidth: 1,
          },
          ...(getFocusedRouteNameFromRoute(route) === 'BlankCanvas'
            ? { tabBarStyle: { display: 'none' } }
            : {}),
        })}
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
