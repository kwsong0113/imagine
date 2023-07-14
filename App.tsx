import React from 'react';
import { StatusBar, AppProvider } from './src/components';
import { AppStackNavigator } from './src/navigation';

function App() {
  return (
    <AppProvider>
      <StatusBar />
      <AppStackNavigator />
    </AppProvider>
  );
}

export default App;
