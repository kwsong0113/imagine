import React, { useRef } from 'react';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useCustomTheme } from '../hooks';
import { persistor, store } from '../store';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { initI18n } from '../i18n';
import analytics from '@react-native-firebase/analytics';
import { isEqual } from 'lodash';
import { WithCodePush } from './WithCodePush';
import { StatusBar } from './StatusBar';

interface Props {
  children: React.ReactNode;
}

const config = {
  screens: {
    BlankCanvas: 'blank',
  },
};

const linking = {
  prefixes: ['linky://'],
  config,
};

const NativeBaseThemeProvider = ({ children }: Props) => {
  const theme = useCustomTheme();
  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
};

export const AppProvider = ({ children }: Props) => {
  const navigationRef = useNavigationContainerRef();
  const routeRef = useRef<ReturnType<typeof navigationRef.getCurrentRoute>>();

  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        onBeforeLift={() => {
          initI18n();
        }}
      >
        <NavigationContainer
          // @ts-ignore
          linking={linking}
          ref={navigationRef}
          onReady={() => {
            routeRef.current = navigationRef.getCurrentRoute();
          }}
          onStateChange={async () => {
            const previousRoute = routeRef.current;
            const currentRoute = navigationRef.getCurrentRoute();

            if (!isEqual(previousRoute, currentRoute)) {
              routeRef.current = currentRoute;

              await analytics().logScreenView({
                screen_class: currentRoute?.name,
                screen_name: JSON.stringify(currentRoute?.params),
              });
            }
          }}
        >
          <NativeBaseThemeProvider>
            {/* eslint-disable react-native/no-inline-styles */}
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <WithCodePush>
                  <StatusBar />
                  {children}
                </WithCodePush>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </NativeBaseThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
