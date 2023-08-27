import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { TouchableOpacity } from 'react-native';
import { Text } from '../components/ios';
import { useCurrentLangaugeValue } from './useCurrentLanguage';
import { useToken } from 'native-base';
import { useColorMode } from './useColorMode';

type Options = NativeStackNavigatorProps['screenOptions'] & {
  headerRightTitle?: [string, string];
  onHeaderRightPress?: () => void;
};

export function useHeader(
  { headerRightTitle, onHeaderRightPress, ...restOptions }: Options = {},
  deps: Parameters<typeof useLayoutEffect>[1] = [],
) {
  const navigation = useNavigation();
  const headerRightTitleValue = useCurrentLangaugeValue(
    ...(headerRightTitle ?? ['', '']),
  );
  const [system] = useToken('colors', ['system']);
  const colorMode = useColorMode();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerBlurEffect: colorMode,
      headerTintColor: system.label,
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerRight: headerRightTitle
        ? () => (
            <TouchableOpacity onPress={onHeaderRightPress}>
              <Text font="headline" color="system.blue">
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
