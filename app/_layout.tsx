import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Tabs } from 'expo-router';
import { SettingsProvider } from './context/SettingsContext';
import { COLORS } from './constants/theme';
import { Ionicons } from '@expo/vector-icons';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SettingsProvider>
        <Tabs screenOptions={{
          tabBarStyle: { backgroundColor: COLORS.primary },
          tabBarActiveTintColor: COLORS.secondary,
          tabBarInactiveTintColor: COLORS.white,
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
        }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Таймер',
              tabBarIcon: ({ color }) => <Ionicons name="timer-outline" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Настройки',
              tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={24} color={color} />,
            }}
          />
        </Tabs>
      </SettingsProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
