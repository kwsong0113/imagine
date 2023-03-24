import React from 'react';
import { VStack } from 'native-base';
import { Header } from '../components';

export const Statistics = () => {
  return (
    <VStack flex={1} p={6} space={6} bg="gray.100" safeArea>
      <Header
        hasBackButton={false}
        title="통계"
        description="어떤 액션을 주로 사용했는지 확인해보세요"
      />
    </VStack>
  );
};
