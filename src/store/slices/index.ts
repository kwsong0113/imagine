export * from './setting';
import settingReducer, { SettingState } from './setting';
import gestureReducer, { GestureState } from './gesture';
import historyReducer, { HistoryState } from './history';

export const reducers = {
  setting: settingReducer,
  gesture: gestureReducer,
  history: historyReducer,
};

export interface WhiteListApplicationState {
  setting: SettingState;
  gesture: GestureState;
  history: HistoryState;
}
