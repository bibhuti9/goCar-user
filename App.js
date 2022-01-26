import React, {useEffect} from 'react';
import { Text } from 'react-native';
import AppNavigator from './src/navigator/AppNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
export default function App() {
  return (
    <PaperProvider>
      <AppNavigator/>
    </PaperProvider>
  );
}