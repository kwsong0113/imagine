import { ScrollView } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenContainer, Header, StatisticsActionRow } from '../../components';
import { useActionStat } from '../../hooks';

export const Detail = () => {
  const { t } = useTranslation('statistics');
  const actionStat = useActionStat();

  return (
    <ScreenContainer>
      <Header variant="center" title={t('detail_title')} />
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
