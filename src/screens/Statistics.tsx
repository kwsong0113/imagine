import React, { ComponentProps } from 'react';
import { HStack, VStack } from 'native-base';
import { ScreenContainer, Header, Typography } from '../components';
import { useAppSelector } from '../hooks';
import { selectActiveGestureList } from '../store/slices/gesture';

type CountInfoProps = {
  count: number;
  description: string;
} & Pick<ComponentProps<typeof VStack>, 'flex'>;

const CountInfo = ({ count, description, ...props }: CountInfoProps) => {
  return (
    <VStack
      bg="gray.300"
      space={3}
      py={5}
      borderRadius={16}
      alignItems="center"
      {...props}
    >
      <Typography variant="title">{count}</Typography>
      <Typography variant="caption" color="gray.600">
        {description}
      </Typography>
    </VStack>
  );
};

export const Statistics = () => {
  const activeGestureList = useAppSelector(selectActiveGestureList);

  return (
    <ScreenContainer>
      <Header
        hasBackButton={false}
        title="통계"
        description="어떤 액션을 주로 사용했는지 확인해보세요"
      />
      <VStack space={4}>
        <CountInfo
          count={activeGestureList.length}
          description="등록된 액션의 수"
        />
        <HStack space={4}>
          <CountInfo flex={1} count={49} description="오늘 액션 실행 횟수" />
          <CountInfo
            flex={1}
            count={73}
            description="하루 평균 액션 실행 횟수"
          />
        </HStack>
      </VStack>
    </ScreenContainer>
  );
};
