import { useCallback } from 'react';
import { ActionInstance } from '../features/action/types';
import {
  getActionFromActionInstance,
  executeAction,
} from '../features/action/utils';
import { historyActions } from '../store/slices/history';
import { useAppDispatch } from './useApp';

export const useExecuteActionInstance = () => {
  const dispatch = useAppDispatch();
  const callback = useCallback(
    (actionInstance: ActionInstance) => {
      const action = getActionFromActionInstance(actionInstance);
      if (action) {
        dispatch(
          historyActions.addActionHistory({
            actionInstance,
            date: new Date().getTime(),
          }),
        );
        executeAction(action, actionInstance.param);
      }
    },
    [dispatch],
  );
  return callback;
};
