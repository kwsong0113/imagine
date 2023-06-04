import React from 'react';
import { StatusBar, AppProvider } from './src/components';
import { RootTabNavigator } from './src/navigation';

function App() {
  return (
    <AppProvider>
      <StatusBar />
      <RootTabNavigator />
    </AppProvider>
  );
}

export default App;
