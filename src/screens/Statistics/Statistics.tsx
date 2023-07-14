import React, { ComponentProps, useMemo } from 'react';
import { HStack, VStack } from 'native-base';
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
import { useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RootTabScreenProps } from '../../navigation';

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

export const Statistics = ({
  navigation,
}: RootTabScreenProps<'Statistics'>) => {
  const { t } = useTranslation('statistics');
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

  const hasShowAllButton = actionStat.length > numTopActionStat;

  return (
    <ScreenContainer>
      <Header
        hasBackButton={false}
        title={t('header.title')}
        description={t('header.description')}
      />
      <VStack space={4}>
        <CountInfo
          count={activeGestureList.length}
          description={t('countInfo.num_actions')}
        />
        <HStack space={4}>
          <CountInfo
            flex={1}
            count={actionHistoryListToday.length}
            description={t('countInfo.num_actions_today')}
          />
          <CountInfo
            flex={1}
            count={Math.round(numActionsPerDay)}
            description={t('countInfo.num_actions_per_day')}
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
              ? t('message.no_actions_today')
              : actionHistoryListToday.length > numActionsPerDay
              ? t('message.more_actions_today')
              : actionHistoryListToday.length === numActionsPerDay
              ? t('message.same_actions_today')
              : t('message.less_actions_today')}
          </Typography>
        </HStack>
        {topActionStat.map((props, idx) => {
          return (
            <StatisticsActionRow
              key={JSON.stringify(props.actionInstance)}
              {...props}
              hasTopBorder={idx > 0}
              hasBottomBorder={
                !hasShowAllButton && idx === topActionStat.length - 1
              }
            />
          );
        })}
        {hasShowAllButton && (
          <ListRowButton
            title={t('see_all')}
            onPress={() =>
              navigation.navigate('StatisticsStack', { screen: 'Detail' })
            }
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
