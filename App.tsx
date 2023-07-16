import React from 'react';
import { AppProvider } from './src/components';
import { AppStackNavigator } from './src/navigation';

function App() {
  return (
    <AppProvider>
      <AppStackNavigator />
    </AppProvider>
  );
}

export default App;
