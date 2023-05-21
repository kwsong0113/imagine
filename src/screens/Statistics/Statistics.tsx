import React, { ComponentProps, useMemo } from 'react';
import { HStack, VStack } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import {
  ScreenContainer,
  Header,
  Typography,
  ListRowButton,
  StatisticsActionRow,
} from '../../components';
import { useAppSelector, useActionStat } from '../../hooks';
import { selectActiveGestureList } from '../../store/slices/gesture';
import {
  selectActionHistoryListToday,
  selectNumActionsPerDay,
} from '../../store/slices/history';
import { ActionInstance } from '../../features/action/types';
import { StatisticsStackParamList } from '../../navigation/StatisticsStackNavigator';
import { useWindowDimensions } from 'react-native';

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

type Props = StackScreenProps<StatisticsStackParamList, 'StatisticsHome'>;

export const Statistics = ({ navigation }: Props) => {
  const activeGestureList = useAppSelector(selectActiveGestureList);
  const numActionsPerDay = useAppSelector(selectNumActionsPerDay);
  const actionHistoryListToday = useAppSelector(selectActionHistoryListToday);
  const actionStat = useActionStat();

  const numTopActionStat = useNumTopActionStat();

  const topActionStat: {
    actionInstance: ActionInstance;
    numExecution: number;
  }[] = useMemo(() => {
    return actionStat.slice(0, numTopActionStat);
  }, [actionStat, numTopActionStat]);

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
          <CountInfo
            flex={1}
            count={actionHistoryListToday.length}
            description="오늘 액션 실행 횟수"
          />
          <CountInfo
            flex={1}
            count={Math.round(numActionsPerDay)}
            description="하루 평균 액션 실행 횟수"
          />
        </HStack>
      </VStack>
      <VStack>
        <HStack
          bg="gray.200"
          p={4}
          borderBottomWidth={1}
          borderTopWidth={1}
          borderColor="gray.300"
        >
          <Typography variant="description" color="red.700">
            {actionHistoryListToday.length === 0
              ? '오늘 액션을 실행하지 않았어요!'
              : actionHistoryListToday.length > numActionsPerDay
              ? '평소보다 액션을 더 많이 실행했어요!'
              : actionHistoryListToday.length === numActionsPerDay
              ? '평소만큼 액션을 실행했어요!'
              : '평소보다 액션을 더 적게 실행했어요!'}
          </Typography>
        </HStack>
        {topActionStat.map((props, idx) => {
          return (
            <StatisticsActionRow
              key={JSON.stringify(props.actionInstance)}
              {...props}
              hasTopBorder={idx > 0}
            />
          );
        })}
        {topActionStat.length === numTopActionStat && (
          <ListRowButton
            title="모두 보기"
            onPress={() => navigation.navigate('Detail')}
          />
        )}
      </VStack>
    </ScreenContainer>
  );
};

const useNumTopActionStat = () => {
  const { height } = useWindowDimensions();
  if (height < 656) {
    return 1;
  }
  if (height < 744) {
    return 2;
  }
  if (height < 832) {
    return 3;
  }
  if (height < 920) {
    return 4;
  }
  return 5;
};
