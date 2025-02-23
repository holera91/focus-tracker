import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { COLORS } from '../constants/theme';

interface TimerProps {
  duration: number;
  onComplete: () => void;
}

export const Timer: React.FC<TimerProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(duration);
    setIsRunning(false);
  }, [duration]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playSound();
      onComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const playSound = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' },
        { shouldPlay: true }
      );
      await sound.playAsync();
      // Освобождаем ресурсы после воспроизведения
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        if (status.isPlaying === false && status.positionMillis === status.durationMillis) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Ошибка воспроизведения звука:', error);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.timer}>{formatTime(timeLeft)}</ThemedText>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setIsRunning(!isRunning)}
      >
        <ThemedText style={styles.buttonText}>
          {isRunning ? 'Пауза' : 'Старт'}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 