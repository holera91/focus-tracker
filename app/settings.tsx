import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from './components/ThemedView';
import { ThemedText } from './components/ThemedText';
import { useSettings } from './context/SettingsContext';
import { SettingsItem } from './components/SettingsItem';

export default function SettingsScreen() {
  const { settings, updateSettings } = useSettings();

  return (
    <ThemedView style={styles.container}>
      <SettingsItem
        title="Время фокусировки"
        value={settings.pomodoro}
        onIncrease={() => updateSettings('pomodoro', settings.pomodoro + 1)}
        onDecrease={() => updateSettings('pomodoro', Math.max(1, settings.pomodoro - 1))}
        unit="мин"
      />
      <SettingsItem
        title="Короткий перерыв"
        value={settings.shortBreak}
        onIncrease={() => updateSettings('shortBreak', settings.shortBreak + 1)}
        onDecrease={() => updateSettings('shortBreak', Math.max(1, settings.shortBreak - 1))}
        unit="мин"
      />
      <SettingsItem
        title="Длинный перерыв"
        value={settings.longBreak}
        onIncrease={() => updateSettings('longBreak', settings.longBreak + 1)}
        onDecrease={() => updateSettings('longBreak', Math.max(1, settings.longBreak - 1))}
        unit="мин"
      />
      <SettingsItem
        title="Циклов в сессии"
        value={settings.cyclesPerSession}
        onIncrease={() => updateSettings('cyclesPerSession', settings.cyclesPerSession + 1)}
        onDecrease={() => updateSettings('cyclesPerSession', Math.max(1, settings.cyclesPerSession - 1))}
        unit="циклов"
      />
      <SettingsItem
        title="Количество сессий"
        value={settings.sessionsCount}
        onIncrease={() => updateSettings('sessionsCount', settings.sessionsCount + 1)}
        onDecrease={() => updateSettings('sessionsCount', Math.max(1, settings.sessionsCount - 1))}
        unit="сессий"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
}); 