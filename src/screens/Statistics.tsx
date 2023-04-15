import React, { ComponentProps, useMemo } from 'react';
import { HStack, VStack, Center, Pressable } from 'native-base';
import {
  ScreenContainer,
  Header,
  Typography,
  ListRow,
  AppIcon,
} from '../components';
import { useAppSelector } from '../hooks';
import { selectActiveGestureList } from '../store/slices/gesture';
import {
  selectActionHistoryListToday,
  selectNumActionsPerDay,
} from '../store/slices/history';
import { ActionInstance } from '../features/action/types';
import {
  getActionDescription,
  getAppForAction,
} from '../features/action/utils';

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
  const numActionsPerDay = useAppSelector(selectNumActionsPerDay);
  const actionHistoryListToday = useAppSelector(selectActionHistoryListToday);

  const topActionInstances: {
    actionInstance: ActionInstance;
    numExecution: number;
  }[] = useMemo(() => {
    const actionInstanceMap: Record<string, number> = {};
    actionHistoryListToday.forEach(({ actionInstance }) => {
      const actionInstanceString = JSON.stringify(actionInstance);
      if (actionInstanceString in actionInstanceMap) {
        actionInstanceMap[actionInstanceString] += 1;
      } else {
        actionInstanceMap[actionInstanceString] = 1;
      }
    });
    return Object.entries(actionInstanceMap)
      .map(([actionInstanceString, numExecution]) => ({
        actionInstance: JSON.parse(actionInstanceString),
        numExecution,
      }))
      .sort(
        ({ numExecution: numExecution1 }, { numExecution: numExecution2 }) =>
          numExecution2 - numExecution1,
      )
      .slice(0, 4);
  }, [actionHistoryListToday]);

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
            count={numActionsPerDay}
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
            {actionHistoryListToday.length > numActionsPerDay
              ? '평소보다 액션을 더 많이 실행했어요!'
              : actionHistoryListToday.length === numActionsPerDay
              ? '평소만큼 액션을 실행했어요!'
              : '평소보다 액션을 더 적게 실행했어요!'}
          </Typography>
        </HStack>
        {topActionInstances.map(({ actionInstance, numExecution }, idx) => {
          const app = getAppForAction(actionInstance);
          const description = getActionDescription(actionInstance);

          return (
            app &&
            description && (
              <ListRow
                key={JSON.stringify(actionInstance)}
                left={<AppIcon id={app.id} name={app.name} />}
                right={
                  <Typography variant="subtitle2" color="gray.700">
                    {numExecution}
                  </Typography>
                }
                title={app.name}
                description={description}
                hasTopBorder={idx > 0}
                isPressable={false}
              />
            )
          );
        })}
        <Pressable>
          <Center
            bg="gray.200"
            py={3}
            borderBottomWidth={1}
            borderTopWidth={1}
            borderColor="gray.300"
          >
            <Typography variant="body" color="blue.600">
              모두 보기
            </Typography>
          </Center>
        </Pressable>
      </VStack>
    </ScreenContainer>
  );
};
