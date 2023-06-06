import React from 'react';
import { ActionInstance } from '../features/action/types';
import {
  useGetActionDescription,
  useGetAppForAction,
} from '../features/action/utils';
import { Typography } from './Typography';
import { AppIcon } from './AppIcon';
import { ListRow } from './ListRow';

interface Props {
  actionInstance: ActionInstance;
  numExecution: number;
  hasTopBorder?: boolean;
  hasBottomBorder?: boolean;
}

export const StatisticsActionRow = ({
  actionInstance,
  numExecution,
  hasTopBorder = true,
  hasBottomBorder = false,
}: Props) => {
  const getAppForAction = useGetAppForAction();
  const getActionDescription = useGetActionDescription();
  const app = getAppForAction(actionInstance);
  const description = getActionDescription(actionInstance);

  if (!app || !description) {
    return <></>;
  }

  return (
    <ListRow
      left={<AppIcon id={app.id} name={app.name} />}
      right={
        <Typography variant="subtitle2" color="gray.700">
          {numExecution}
        </Typography>
      }
      title={app.name}
      description={description}
      hasTopBorder={hasTopBorder}
      hasBottomBorder={hasBottomBorder}
      isPressable={false}
    />
  );
};
