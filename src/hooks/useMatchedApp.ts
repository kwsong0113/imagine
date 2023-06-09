import { useMemo } from 'react';
import { useAppList } from './useAppList';

export const useMatchedApp = (appId: number) => {
  const appList = useAppList();
  return useMemo(
    () => appList.find(({ id }) => id === appId),
    [appId, appList],
  );
};
