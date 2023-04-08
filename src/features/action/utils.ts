import { Linking } from 'react-native';
import { appList } from './app';
import { Action, ActionInstance } from './types';

export const executeActionInstance = (actionInstance: ActionInstance) => {
  const action = getActionFromActionInstance(actionInstance);
  if (action) {
    executeAction(action, actionInstance.param);
  }
};

const getActionFromActionInstance = (actionInstance: ActionInstance) => {
  const matchedApp = appList.find(app => app.id === actionInstance.appId);
  if (!matchedApp) {
    return undefined;
  }
  const matchedAction = matchedApp.actions.find(
    action => action.id === actionInstance.actionId,
  );
  return matchedAction;
};

const executeAction = (action: Action, param?: string) => {
  if ('urlScheme' in action) {
    Linking.openURL(action.urlScheme);
  } else {
    Linking.openURL(action.urlSchemeFunc(param as string));
  }
};
