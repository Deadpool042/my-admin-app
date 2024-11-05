import React, { createContext, useState, useContext, useEffect } from "react";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import { darkTheme, lightTheme } from "styles/theme";
import { useMediaQuery } from "@mui/material";

interface ThemeContextProps {
  setThemeMode: (mode: "light" | "dark" | "system") => void;
  mode: "light" | "dark" | "system";
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeContext must be used within a ThemeProvider");
  return context;
};

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [mode, setMode] = useState<"light" | "dark" | "system">("system");
  const [theme, setTheme] = useState(createTheme(lightTheme));

  useEffect(() => {
    const updateTheme = () => {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const selectedTheme =
        mode === "system"
          ? prefersDarkMode
            ? createTheme(darkTheme)
            : createTheme(lightTheme)
          : createTheme(mode === "light" ? lightTheme : darkTheme);

      setTheme(selectedTheme);
      document.body.style.transition =
        "background-color 0.3s ease, color 0.3s ease";
    };

    updateTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateTheme);

    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, [mode]);

  const setThemeMode = (newMode: "light" | "dark" | "system") =>
    setMode(newMode);

  return (
    <ThemeContext.Provider value={{ setThemeMode, mode, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
