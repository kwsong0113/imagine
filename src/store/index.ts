import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { reducers } from './slices';

const rootReducer = combineReducers({ ...reducers });
type ReducersState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<ReducersState> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['baseSettingReducer'], // persist store에 저장 할 reducer들
  blacklist: ['globalStateReducer'], // persist store에 저장하지 않을 reducer들
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
