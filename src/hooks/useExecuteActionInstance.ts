import { useCallback } from 'react';
import { ActionInstance } from '../features/action/types';
import {
  executeAction,
  useParseActionInstance,
} from '../features/action/utils';
import { historyActions } from '../store/slices/history';
import { useAppDispatch } from './useApp';
import analytics from '@react-native-firebase/analytics';

export const useExecuteActionInstance = () => {
  const dispatch = useAppDispatch();
  const parseActionInstance = useParseActionInstance();
  const callback = useCallback(
    async (actionInstance: ActionInstance, delay: number = 0) => {
      const { app, action } = parseActionInstance(actionInstance);
      if (app && action) {
        dispatch(
          historyActions.addActionHistory({
            actionInstance,
            date: new Date().getTime(),
          }),
        );
        analytics().logEvent('action', {
          ...actionInstance,
          appName: app.name,
          actionDescription: action.description,
        });
        return await executeAction(action, actionInstance.param, delay);
      }
      return false;
    },
    [dispatch, parseActionInstance],
  );
  return callback;
};
