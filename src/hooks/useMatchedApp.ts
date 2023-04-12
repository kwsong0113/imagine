import { useMemo } from 'react';
import { appList } from '../features/action/app';

export const useMatchedApp = (appId: number) => {
  return useMemo(() => appList.find(({ id }) => id === appId), [appId]);
};
