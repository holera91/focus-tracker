import React from 'react';
import { View, ViewProps } from 'react-native';
import { COLORS } from '../constants/theme';

interface ThemedViewProps extends ViewProps {
  children: React.ReactNode;
}

export const ThemedView: React.FC<ThemedViewProps> = ({ style, children, ...props }) => {
  return (
    <View
      style={[
        {
          backgroundColor: COLORS.primary,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}; 