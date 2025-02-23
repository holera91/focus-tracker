import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { COLORS } from '../constants/theme';

interface TimerSettingsProps {
  duration: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const TimerSettings: React.FC<TimerSettingsProps> = ({ 
  duration,
  onIncrease,
  onDecrease,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDecrease} style={styles.button}>
        <ThemedText style={styles.buttonText}>-</ThemedText>
      </TouchableOpacity>
      <ThemedText style={styles.duration}>{Math.floor(duration / 60)}м</ThemedText>
      <TouchableOpacity onPress={onIncrease} style={styles.button}>
        <ThemedText style={styles.buttonText}>+</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: COLORS.secondary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: COLORS.white,
  },
  duration: {
    marginHorizontal: 20,
    fontSize: 18,
  },
}); 