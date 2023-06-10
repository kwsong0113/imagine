import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createMigrate,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reducers } from './slices';
import reactotron from '../../ReactotronConfig';
import { migrations } from './migrations';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const rootReducer = combineReducers({ ...reducers });
type ReducersState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<ReducersState> = {
  key: 'root',
  version: 0,
  storage: AsyncStorage,
  whitelist: ['setting', 'gesture', 'history'],
  migrate: createMigrate(migrations as any, { debug: false }),
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const enhancer = reactotron.createEnhancer?.();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 1000 },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 1000,
      },
    }),
  enhancers: enhancer ? [enhancer] : undefined,
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
