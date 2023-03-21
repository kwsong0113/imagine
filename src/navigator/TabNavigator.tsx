import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Setting, Custom, Statistics } from '../screens';
import { useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const tabBarIconMap: Record<
  string,
  ({ color }: { color: string }) => JSX.Element
> = {
  Statistics: ({ color }) => (
    <Icon name="stats-chart" size={34.67} color={color} />
  ),
  Custom: ({ color }) => <Icon name="add-circle" size={40} color={color} />,
  Setting: ({ color }) => <Icon name="cog-sharp" size={40} color={color} />,
};

export const TabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Custom"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.orange[700],
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
