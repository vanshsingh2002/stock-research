"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface Theme {
  darkMode: boolean;
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  borderPrimary: string;
  borderSecondary: string;
  buttonPrimary: string;
  buttonPrimaryHover: string;
  buttonPrimaryText: string;
  inputBg: string;
  inputText: string;
  inputBorder: string;
  inputFocusRing: string;
  suggestionsBg: string;
  suggestionsText: string;
  suggestionsBorder: string;
  suggestionsHover: string;
  userMessageBg: string;
  userMessageText: string;
  botMessageBg: string;
  botMessageText: string;
  chartGrid: string;
  chartText: string;
  chartTooltipBg: string;
  chartLine: string;
  chartBar: string;
  chartArea: string;
  timelineLine: string;
  timelineDot: string;
  timelineDotRing: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleDarkMode: () => void;
  textPrimary: string;
  textSecondary: string;
  codeBg: string;
  codeText: string;
  codeBorder: string;
  bgTertiary: string;
  timelineLine: string;
  timelineDot: string;
  timelineDotRing: string;
}

const lightTheme: Theme = {
    darkMode: false,
    bgPrimary: 'bg-white',
    bgSecondary: 'bg-gray-100', // Slightly darker for contrast
    bgTertiary: 'bg-gray-200', // More contrast
    textPrimary: 'text-gray-900', // Darker for better readability
    textSecondary: 'text-gray-700', // Slightly darker
    textTertiary: 'text-gray-600', 
    borderPrimary: 'border-gray-300',
    borderSecondary: 'border-gray-400', // More visible borders
    buttonPrimary: 'bg-blue-600', // Stronger blue for better visibility
    buttonPrimaryHover: 'hover:bg-blue-700',
    buttonPrimaryText: 'text-white',
    inputBg: 'bg-gray-50', // Slightly lighter input field
    inputText: 'text-gray-900',
    inputBorder: 'border-gray-400', // More contrast
    inputFocusRing: 'focus:ring-blue-600',
    suggestionsBg: 'bg-white',
    suggestionsText: 'text-gray-900',
    suggestionsBorder: 'border-gray-400',
    suggestionsHover: 'hover:bg-gray-300', // More visible hover effect
    userMessageBg: 'bg-blue-600',
    userMessageText: 'text-white',
    botMessageBg: 'bg-gray-300',
    botMessageText: 'text-gray-900',
    chartGrid: '#D1D5DB', // Slightly darker grid
    chartText: '#111827', // Stronger black for better readability
    chartTooltipBg: '#F9FAFB', // Softer white
    chartLine: '#1E40AF', // Deep blue for lines
    chartBar: '#D97706', // Stronger orange for bars
    chartArea: '#059669', // More vibrant green
    timelineLine: 'bg-gray-400',
    timelineDot: 'bg-indigo-700',
    timelineDotRing: 'ring-gray-300',
  };
  

  const darkTheme: Theme = {
    darkMode: true,
    bgPrimary: 'bg-gray-900', // Darker for a true dark mode experience
    bgSecondary: 'bg-gray-800', // Slightly lighter for contrast
    bgTertiary: 'bg-gray-700', // More distinct contrast
    textPrimary: 'text-gray-50', // Brighter text for better readability
    textSecondary: 'text-gray-300', // Balanced contrast
    textTertiary: 'text-gray-400',
    borderPrimary: 'border-gray-600', // More visible borders
    borderSecondary: 'border-gray-500', 
    buttonPrimary: 'bg-blue-500', // More vibrant button color
    buttonPrimaryHover: 'hover:bg-blue-600',
    buttonPrimaryText: 'text-white',
    inputBg: 'bg-gray-800', // Slightly lighter for better visibility
    inputText: 'text-gray-100',
    inputBorder: 'border-gray-500', // More contrast
    inputFocusRing: 'focus:ring-blue-400',
    suggestionsBg: 'bg-gray-800',
    suggestionsText: 'text-gray-100',
    suggestionsBorder: 'border-gray-500',
    suggestionsHover: 'hover:bg-gray-600',
    userMessageBg: 'bg-blue-500', // More eye-catching user message color
    userMessageText: 'text-white',
    botMessageBg: 'bg-gray-800', // Slightly darker for contrast
    botMessageText: 'text-gray-100',
    chartGrid: '#6B7280', // Lighter grid lines for better visibility
    chartText: '#F3F4F6', // Brighter text for readability
    chartTooltipBg: '#374151', // Softer background
    chartLine: '#60A5FA', // Lighter blue for better contrast
    chartBar: '#FACC15', // More vibrant yellow for clarity
    chartArea: '#34D399', // Stronger green for a pleasant look
    timelineLine: 'bg-gray-400', // Brighter for visibility
    timelineDot: 'bg-indigo-500', // More vibrant dot color
    timelineDotRing: 'ring-gray-500', // More contrast on ring
  };
  

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = savedTheme !== null ? savedTheme === 'true' : prefersDark;
    
    setTheme(initialDarkMode ? darkTheme : lightTheme);
    document.documentElement.classList.toggle('dark', initialDarkMode);
    setIsInitialized(true);
  }, []);

  const toggleDarkMode = () => {
    if (!theme) return;
    
    const newDarkMode = !theme.darkMode;
    const newTheme = newDarkMode ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  if (!isInitialized || !theme) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    );
  }

  const contextValue: ThemeContextType = {
    theme,
    toggleDarkMode,
    textPrimary: theme.textPrimary,
    textSecondary: theme.textSecondary,
    codeBg: theme.bgTertiary,
    codeText: theme.textPrimary,
    codeBorder: theme.borderPrimary,
    bgTertiary: theme.bgTertiary,
    timelineLine: theme.timelineLine,
    timelineDot: theme.timelineDot,
    timelineDotRing: theme.timelineDotRing,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};