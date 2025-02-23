import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface ThemedTextProps extends TextProps {
  type?: 'default' | 'title' | 'link';
  children: React.ReactNode;
}

export const ThemedText: React.FC<ThemedTextProps> = ({ 
  style, 
  type = 'default', 
  children,
  ...props 
}) => {
  return (
    <Text
      style={[
        styles.default,
        styles[type],
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    color: COLORS.white,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    color: COLORS.secondary,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
}); 