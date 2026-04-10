'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  brandColor: string;
  setBrandColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => null,
  brandColor: '#3b82f6',
  setBrandColor: () => null,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [brandColor, setBrandColorState] = useState<string>('#3b82f6');

  useEffect(() => {
    // Load from local storage on mount
    const savedTheme = localStorage.getItem('nexus-theme') as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
    const savedColor = localStorage.getItem('nexus-brand-color');
    if (savedColor) {
      setBrandColorState(savedColor);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    const applyTheme = (t: Theme) => {
      let resolvedTheme = t;
      if (t === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      root.setAttribute('data-theme', resolvedTheme);
    };

    applyTheme(theme);
    localStorage.setItem('nexus-theme', theme);

    // Listen for system changes if set to system
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setBrandColor = (newColor: string) => {
    setBrandColorState(newColor);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', brandColor);
    localStorage.setItem('nexus-brand-color', brandColor);
  }, [brandColor]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, brandColor, setBrandColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
