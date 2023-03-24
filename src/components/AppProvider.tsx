import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useCustomTheme } from '../hooks';
import { persistor, store } from '../store';
import { NavigationContainer } from '@react-navigation/native';

interface Props {
  children: React.ReactNode;
}

const NativeBaseThemeProvider = ({ children }: Props) => {
  const theme = useCustomTheme();
  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <NativeBaseThemeProvider>{children}</NativeBaseThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
