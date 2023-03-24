import React from 'react';
import { Center, Switch } from 'native-base';
import { useColorMode } from '../hooks';
import { useAppDispatch } from '../hooks';
import { settingActions } from '../store/slices';

export const Setting = () => {
  const colorMode = useColorMode();
  const dispatch = useAppDispatch();

  return (
    <Center flex={1} bg="gray.100" safeArea>
      <Switch
        isChecked={colorMode === 'light'}
        onTrackColor="orange.800"
        onThumbColor="gray.100"
        offTrackColor="gray.300"
        offThumbColor="gray.100"
        onToggle={() => {
          dispatch(
            settingActions.changeTheme(
              colorMode === 'light' ? 'dark' : 'light',
            ),
          );
        }}
      />
    </Center>
  );
};
