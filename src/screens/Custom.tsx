import { VStack } from 'native-base';
import React from 'react';
import { Header } from '../components';

export const Custom = () => {
  return (
    <VStack flex={1} p={6} space={6} bg="gray.100" safeArea>
      <Header
        hasBackButton={false}
        title="커스텀 제스처"
        description="원하는 액션을 커스텀 제스처로 실행해요"
      />
    </VStack>
  );
};

export default Custom;
