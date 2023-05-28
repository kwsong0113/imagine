import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useCustomTheme } from '../hooks';
import { persistor, store } from '../store';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

interface Props {
  children: React.ReactNode;
}

const config = {
  screens: {
    Custom: {
      screens: {
        BlankCanvas: 'blank',
      },
    },
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
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* @ts-ignore */}
        <NavigationContainer linking={linking}>
          <NativeBaseThemeProvider>
            {/* eslint-disable react-native/no-inline-styles */}
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
            </GestureHandlerRootView>
          </NativeBaseThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
