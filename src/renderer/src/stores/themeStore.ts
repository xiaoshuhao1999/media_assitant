import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  primaryColor: string;
  borderRadius: number;
  fontSize: number;
  toggleTheme: () => void;
  setPrimaryColor: (color: string) => void;
  setBorderRadius: (radius: number) => void;
  setFontSize: (size: number) => void;
  resetTheme: () => void;
}

const defaultTheme = {
  isDarkMode: false,
  primaryColor: '#1890ff',
  borderRadius: 6,
  fontSize: 14,
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      ...defaultTheme,
      
      toggleTheme: () => {
        const newTheme = !get().isDarkMode;
        set({ isDarkMode: newTheme });
        
        // 同步到主进程配置
        window.electronAPI?.setConfig('theme', newTheme ? 'dark' : 'light');
      },
      
      setPrimaryColor: (color: string) => {
        set({ primaryColor: color });
        window.electronAPI?.setConfig('primaryColor', color);
      },
      
      setBorderRadius: (radius: number) => {
        set({ borderRadius: radius });
        window.electronAPI?.setConfig('borderRadius', radius);
      },
      
      setFontSize: (size: number) => {
        set({ fontSize: size });
        window.electronAPI?.setConfig('fontSize', size);
      },
      
      resetTheme: () => {
        set(defaultTheme);
        window.electronAPI?.setConfig('theme', 'light');
        window.electronAPI?.setConfig('primaryColor', defaultTheme.primaryColor);
        window.electronAPI?.setConfig('borderRadius', defaultTheme.borderRadius);
        window.electronAPI?.setConfig('fontSize', defaultTheme.fontSize);
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        primaryColor: state.primaryColor,
        borderRadius: state.borderRadius,
        fontSize: state.fontSize,
      }),
    }
  )
); 