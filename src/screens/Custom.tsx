import { Box, Text, Button } from 'native-base';
import React from 'react';
import { useAppDispatch } from '../hooks';
import { settingActions } from '../store/slices';
import { StatusBar } from '../components';

export const Custom = () => {
  const dispatch = useAppDispatch();

  return (
    <Box flex="1" bg="gray.100" safeArea>
      <StatusBar />
      <Box bg="orange.900">
        <Text fontSize="24px">안녕하세요</Text>
      </Box>
      <Button
        bg="red.700"
        onPress={() => dispatch(settingActions.changeTheme('light'))}
      >
        <Text>Light</Text>
      </Button>
      <Button
        bg="blue.700"
        onPress={() => dispatch(settingActions.changeTheme('dark'))}
      >
        <Text>Dark</Text>
      </Button>
      <Button
        bg="teal.700"
        onPress={() => dispatch(settingActions.changeTheme('system'))}
      >
        <Text>System</Text>
      </Button>
    </Box>
  );
};

export default Custom;
