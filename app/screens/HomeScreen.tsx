import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { Timer } from '../components/Timer';
import { COLORS } from '../constants/theme';
import { useSettings } from '../context/SettingsContext';
import { ThemedText } from '../components/ThemedText';

export const HomeScreen = () => {
  const { settings } = useSettings();
  const [currentSession, setCurrentSession] = useState(1);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');

  const getCurrentDuration = () => {
    switch (mode) {
      case 'pomodoro':
        return settings.pomodoro * 60;
      case 'shortBreak':
        return settings.shortBreak * 60;
      case 'longBreak':
        return settings.longBreak * 60;
    }
  };

  const handleTimerComplete = () => {
    if (mode === 'pomodoro') {
      if (currentCycle % settings.cyclesPerSession === 0) {
        setMode('longBreak');
        if (currentSession < settings.sessionsCount) {
          setCurrentSession(prev => prev + 1);
        }
      } else {
        setMode('shortBreak');
      }
      setCurrentCycle(prev => prev + 1);
    } else {
      setMode('pomodoro');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.info}>
        {mode === 'pomodoro' ? 'Время фокусировки' : 
         mode === 'shortBreak' ? 'Короткий перерыв' : 
         'Длинный перерыв'}
      </ThemedText>
      <ThemedText style={styles.info}>
        Сессия {currentSession} из {settings.sessionsCount}
      </ThemedText>
      <ThemedText style={styles.info}>
        Цикл {currentCycle} из {settings.cyclesPerSession}
      </ThemedText>
      <Timer 
        duration={getCurrentDuration()} 
        onComplete={handleTimerComplete}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
}); 