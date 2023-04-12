import { useMemo } from 'react';
import { useMatchedApp } from './useMatchedApp';

export const useMatchedAction = (appId: number, actionId: number) => {
  const matchedApp = useMatchedApp(appId);
  return useMemo(
    () => matchedApp?.actions.find(({ id }) => id === actionId),
    [actionId, matchedApp],
  );
};
