import { useCallback } from 'react';
import { Linking } from 'react-native';
import { useAppList } from '../../hooks';
import { sleepTimeout } from '../../utils';
import { Action, ActionInstance } from './types';

export const useGetActionFromActionInstance = () => {
  const getAppForAction = useGetAppForAction();
  return useCallback(
    (actionInstance: ActionInstance) => {
      const matchedApp = getAppForAction(actionInstance);
      if (!matchedApp) {
        return undefined;
      }
      const matchedAction = matchedApp.actions.find(
        action => action.id === actionInstance.actionId,
      );
      return matchedAction;
    },
    [getAppForAction],
  );
};

export const executeAction = async (
  action: Action,
  param?: string,
  delay: number = 0,
) => {
  const url =
    'urlScheme' in action
      ? action.urlScheme
      : action.urlSchemeFunc(param as string);

  let success = true;
  await sleepTimeout(delay);
  await Linking.openURL(url).catch(() => {
    success = false;
  });
  return success;
};

export const useGetActionDescription = () => {
  const getActionFromActionInstance = useGetActionFromActionInstance();
  return useCallback(
    (actionInstance: ActionInstance) => {
      const action = getActionFromActionInstance(actionInstance);
      if (!action) {
        return undefined;
      }
      if ('descriptionFunc' in action && actionInstance.param !== undefined) {
        return action.descriptionFunc(actionInstance.param);
      }
      return action.description;
    },
    [getActionFromActionInstance],
  );
};

export const useGetAppForAction = () => {
  const appList = useAppList();
  return useCallback(
    (actionInstance: ActionInstance) =>
      appList.find(app => app.id === actionInstance.appId),
    [appList],
  );
};
