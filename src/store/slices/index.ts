export * from './setting';
import settingReducer from './setting';
import gestureReducer from './gesture';

export const reducers = {
  setting: settingReducer,
  gesture: gestureReducer,
};
