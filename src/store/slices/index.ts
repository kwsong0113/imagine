export * from './setting';
import settingReducer from './setting';
import gestureReducer from './gesture';
import historyReducer from './history';

export const reducers = {
  setting: settingReducer,
  gesture: gestureReducer,
  history: historyReducer,
};
