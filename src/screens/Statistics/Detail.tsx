import { ScrollView } from 'native-base';
import React from 'react';
import { ScreenContainer, Header, StatisticsActionRow } from '../../components';
import { useActionStat } from '../../hooks';

export const Detail = () => {
  const actionStat = useActionStat();

  return (
    <ScreenContainer>
      <Header variant="center" title="오늘의 액션 통계" />
      <ScrollView mx={-3} px={3}>
        {actionStat.map((props, idx) => {
          return (
            <StatisticsActionRow
              key={JSON.stringify(props.actionInstance)}
              {...props}
              hasBottomBorder={idx === actionStat.length - 1}
            />
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};
