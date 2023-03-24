import { Box, VStack } from 'native-base';
import React from 'react';
import { StatusBar, Header } from '../components';

export const Custom = () => {
  return (
    <Box flex={1} bg="gray.100" safeArea>
      <StatusBar />
      <VStack flex={1} p={6} space={6}>
        <Header
          hasBackButton={false}
          title="커스텀 제스처"
          description="원하는 액션을 커스텀 제스처로 실행해요"
        />
      </VStack>
    </Box>
  );
};

export default Custom;
