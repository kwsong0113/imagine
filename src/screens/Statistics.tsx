import React from 'react';
import { ScreenContainer, Header } from '../components';

export const Statistics = () => {
  return (
    <ScreenContainer>
      <Header
        hasBackButton={false}
        title="통계"
        description="어떤 액션을 주로 사용했는지 확인해보세요"
      />
    </ScreenContainer>
  );
};
