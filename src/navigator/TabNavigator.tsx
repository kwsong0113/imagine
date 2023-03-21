import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Setting, Custom, Statistics } from '../screens';
import { useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Custom"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.orange[700],
        tabBarInactiveTintColor: colors.gray[400],
      }}
    >
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="stats-chart" color={color} size={32.5} />
          ),
        }}
      />
      <Tab.Screen
        name="Custom"
        component={Custom}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="add-circle" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cog-sharp" color={color} size={40} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
