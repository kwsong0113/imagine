import { useMemo } from 'react';
import { ActionInstance } from '../features/action/types';
import { selectActionHistoryListToday } from '../store/slices/history';
import { useAppSelector } from './useApp';

export const useActionStat = () => {
  const actionHistoryListToday = useAppSelector(selectActionHistoryListToday);
  const actionStat: {
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
      );
  }, [actionHistoryListToday]);
  return actionStat;
};
