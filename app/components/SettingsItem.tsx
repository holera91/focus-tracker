import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { COLORS } from '../constants/theme';

interface SettingsItemProps {
  title: string;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  unit: string;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  value,
  onIncrease,
  onDecrease,
  unit,
}) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <View style={styles.controls}>
        <TouchableOpacity onPress={onDecrease} style={styles.button}>
          <ThemedText style={styles.buttonText}>-</ThemedText>
        </TouchableOpacity>
        
        <ThemedText style={styles.value}>{value} {unit}</ThemedText>
        
        <TouchableOpacity onPress={onIncrease} style={styles.button}>
          <ThemedText style={styles.buttonText}>+</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
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
  value: {
    marginHorizontal: 20,
    fontSize: 18,
  },
}); 