import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ScreenContainer,
  Header,
  StatisticsActionRow,
  ScrollableList,
} from '../../components';
import { useActionStat } from '../../hooks';

export const Detail = () => {
  const { t } = useTranslation('statistics');
  const actionStat = useActionStat();

  return (
    <ScreenContainer>
      <Header variant="center" title={t('detail_title')} />
      <ScrollableList>
        {actionStat.map((props, idx) => {
          return (
            <StatisticsActionRow
              key={JSON.stringify(props.actionInstance)}
              {...props}
              hasBottomBorder={idx === actionStat.length - 1}
            />
          );
        })}
      </ScrollableList>
    </ScreenContainer>
  );
};
