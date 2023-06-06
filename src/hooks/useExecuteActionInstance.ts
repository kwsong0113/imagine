import { useCallback } from 'react';
import { ActionInstance } from '../features/action/types';
import {
  executeAction,
  useGetActionFromActionInstance,
} from '../features/action/utils';
import { historyActions } from '../store/slices/history';
import { useAppDispatch } from './useApp';

export const useExecuteActionInstance = () => {
  const dispatch = useAppDispatch();
  const getActionFromActionInstance = useGetActionFromActionInstance();
  const callback = useCallback(
    async (actionInstance: ActionInstance, delay: number = 0) => {
      const action = getActionFromActionInstance(actionInstance);
      if (action) {
        dispatch(
          historyActions.addActionHistory({
            actionInstance,
            date: new Date().getTime(),
          }),
        );
        return await executeAction(action, actionInstance.param, delay);
      }
      return false;
    },
    [dispatch, getActionFromActionInstance],
  );
  return callback;
};
