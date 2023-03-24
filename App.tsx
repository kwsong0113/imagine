import React from 'react';
import { AppProvider } from './src/components/AppProvider';
import { RootTabNavigator } from './src/navigation';

function App() {
  return (
    <AppProvider>
      <RootTabNavigator />
    </AppProvider>
  );
}

export default App;
