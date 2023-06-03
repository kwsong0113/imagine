import React from 'react';
import { StatusBar, AppProvider } from './src/components';
import { RootTabNavigator } from './src/navigation';

import './src/i18n';

function App() {
  return (
    <AppProvider>
      <StatusBar />
      <RootTabNavigator />
    </AppProvider>
  );
}

export default App;
