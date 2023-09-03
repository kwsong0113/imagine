import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { TouchableOpacity } from 'react-native';
import { Text } from '../components/ios';
import { useCurrentLangaugeValue } from './useCurrentLanguage';
import { useToken } from 'native-base';
import { useColorMode } from './useColorMode';

type Options = NativeStackNavigatorProps['screenOptions'] & {
  headerMainTitle?: [string, string];
  headerRightTitle?: [string, string];
  useTransparent?: boolean;
  onHeaderRightPress?: () => void;
};

export function useHeader(
  {
    headerMainTitle,
    headerRightTitle,
    onHeaderRightPress,
    useTransparent = false,
    ...restOptions
  }: Options = {},
  deps: Parameters<typeof useLayoutEffect>[1] = [],
) {
  const navigation = useNavigation();
  const headerTitleValue = useCurrentLangaugeValue(
    ...(headerMainTitle ?? ['', '']),
  );
  const headerRightTitleValue = useCurrentLangaugeValue(
    ...(headerRightTitle ?? ['', '']),
  );
  const [system] = useToken('colors', ['system']);
  const colorMode = useColorMode();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: useTransparent,
      headerBlurEffect: useTransparent ? colorMode : undefined,
      headerTintColor: system.label,
      headerStyle: {
        backgroundColor: useTransparent ? 'transparent' : system.background,
      },
      title: headerTitleValue,
      headerRight: headerRightTitle
        ? () => (
            <TouchableOpacity onPress={onHeaderRightPress}>
              <Text font="headline" color="system.blue" bold>
                {headerRightTitleValue}
              </Text>
            </TouchableOpacity>
          )
        : undefined,
      ...restOptions,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, navigation, colorMode]);
}
