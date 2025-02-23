import React, { createContext, useContext, useState } from 'react';
import { TIMES } from '../constants/theme';

interface Settings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  cyclesPerSession: number;
  sessionsCount: number;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (key: keyof Settings, value: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    pomodoro: TIMES.defaultPomodoro / 60,
    shortBreak: TIMES.defaultShortBreak / 60,
    longBreak: TIMES.defaultLongBreak / 60,
    cyclesPerSession: 4,
    sessionsCount: 1,
  });

  const updateSettings = (key: keyof Settings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}; 