import React from 'react';
import { Switch, HStack } from 'native-base';
import { useColorMode } from '../hooks';
import { useAppDispatch } from '../hooks';
import { settingActions } from '../store/slices';
import { Header, ScreenContainer, Typography } from '../components';

export const Setting = () => {
  const colorMode = useColorMode();
  const dispatch = useAppDispatch();

  return (
    <ScreenContainer>
      <Header
        hasBackButton={false}
        title="설정"
        description="나에게 맞는 옵션을 찾아보세요"
      />
      <HStack
        justifyContent="space-between"
        alignItems="center"
        borderTopWidth={1}
        borderBottomWidth={1}
        borderColor="gray.300"
        py={2}
        px={1}
      >
        <Typography variant="body">테마</Typography>
        <Switch
          size="sm"
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
      </HStack>
    </ScreenContainer>
  );
};
