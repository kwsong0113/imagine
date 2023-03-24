import React from 'react';
import { VStack, Switch, HStack } from 'native-base';
import { useColorMode } from '../hooks';
import { useAppDispatch } from '../hooks';
import { settingActions } from '../store/slices';
import { Header, Typography } from '../components';

export const Setting = () => {
  const colorMode = useColorMode();
  const dispatch = useAppDispatch();

  return (
    <VStack flex={1} p={6} space={6} bg="gray.100" safeArea>
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
    </VStack>
  );
};
