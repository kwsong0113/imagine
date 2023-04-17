import { Linking } from 'react-native';
import { sleepTimeout } from '../../utils';
import { appList } from './app';
import { Action, ActionInstance } from './types';

export const executeActionInstance = (actionInstance: ActionInstance) => {
  const action = getActionFromActionInstance(actionInstance);
  if (action) {
    executeAction(action, actionInstance.param);
  }
};

export const getActionFromActionInstance = (actionInstance: ActionInstance) => {
  const matchedApp = getAppForAction(actionInstance);
  if (!matchedApp) {
    return undefined;
  }
  const matchedAction = matchedApp.actions.find(
    action => action.id === actionInstance.actionId,
  );
  return matchedAction;
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

export const getActionDescription = (actionInstance: ActionInstance) => {
  const action = getActionFromActionInstance(actionInstance);
  if (!action) {
    return undefined;
  }
  if ('descriptionFunc' in action && actionInstance.param !== undefined) {
    return action.descriptionFunc(actionInstance.param);
  }
  return action.description;
};

export const getAppForAction = (actionInstance: ActionInstance) => {
  return appList.find(app => app.id === actionInstance.appId);
};
