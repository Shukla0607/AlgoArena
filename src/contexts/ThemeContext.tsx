import React, { createContext, useContext, useState, useEffect } from "react";

export interface Theme {
  id: string;
  name: string;
  colors: {
    bg: string;
    cardBg: string;
    cardBorder: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    primary: string;
    secondary: string;
    accent: string;
    success: string;
  };
}

export const themes: Theme[] = [
  {
    id: "dark",
    name: "Dark Mode",
    colors: {
      bg: "rgb(15, 23, 42)",
      cardBg: "rgb(30, 41, 59)",
      cardBorder: "rgb(71, 85, 105)",
      textPrimary: "rgb(255, 255, 255)",
      textSecondary: "rgb(226, 232, 240)",
      textMuted: "rgb(203, 213, 225)",
      primary: "rgb(139, 92, 246)",
      secondary: "rgb(6, 182, 212)",
      accent: "rgb(245, 158, 11)",
      success: "rgb(16, 185, 129)",
    },
  },
  {
    id: "midnight",
    name: "Midnight Blue",
    colors: {
      bg: "rgb(8, 20, 35)",
      cardBg: "rgb(15, 32, 56)",
      cardBorder: "rgb(30, 58, 94)",
      textPrimary: "rgb(255, 255, 255)",
      textSecondary: "rgb(203, 213, 225)",
      textMuted: "rgb(148, 163, 184)",
      primary: "rgb(59, 130, 246)",
      secondary: "rgb(14, 165, 233)",
      accent: "rgb(251, 191, 36)",
      success: "rgb(34, 197, 94)",
    },
  },
  {
    id: "forest",
    name: "Forest Green",
    colors: {
      bg: "rgb(12, 24, 18)",
      cardBg: "rgb(22, 40, 30)",
      cardBorder: "rgb(34, 60, 46)",
      textPrimary: "rgb(255, 255, 255)",
      textSecondary: "rgb(220, 230, 225)",
      textMuted: "rgb(160, 180, 170)",
      primary: "rgb(34, 197, 94)",
      secondary: "rgb(16, 185, 129)",
      accent: "rgb(251, 146, 60)",
      success: "rgb(74, 222, 128)",
    },
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentThemeId, setCurrentThemeId] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("algoarena-theme");
    if (savedTheme && themes.find((t) => t.id === savedTheme)) {
      setCurrentThemeId(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("algoarena-theme", currentThemeId);

    // Apply theme to document root
    const theme = themes.find((t) => t.id === currentThemeId) || themes[0];
    const root = document.documentElement;

    root.style.setProperty("--theme-bg", theme.colors.bg);
    root.style.setProperty("--theme-card-bg", theme.colors.cardBg);
    root.style.setProperty("--theme-card-border", theme.colors.cardBorder);
    root.style.setProperty("--theme-text-primary", theme.colors.textPrimary);
    root.style.setProperty(
      "--theme-text-secondary",
      theme.colors.textSecondary,
    );
    root.style.setProperty("--theme-text-muted", theme.colors.textMuted);
    root.style.setProperty("--theme-primary", theme.colors.primary);
    root.style.setProperty("--theme-secondary", theme.colors.secondary);
    root.style.setProperty("--theme-accent", theme.colors.accent);
    root.style.setProperty("--theme-success", theme.colors.success);
  }, [currentThemeId]);

  const setTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
  };

  const currentTheme = themes.find((t) => t.id === currentThemeId) || themes[0];

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
