import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureProvider } from './providers/GestureProvider';
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { RootNavigator } from './navigation/RootNavigator';
import { colors } from './theme';

export function App() {
  return (
    <GestureProvider>
      <SafeAreaProvider>
        <QueryProvider>
          <ThemeProvider>
            <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
            <RootNavigator />
          </ThemeProvider>
        </QueryProvider>
      </SafeAreaProvider>
    </GestureProvider>
  );
}
