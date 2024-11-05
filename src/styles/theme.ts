import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#d0b444",
      light: "#e0c966",
      dark: "#b39438",
      contrastText: "#000000"
    },
    secondary: {
      main: "#000000",
      light: "#3e3e3e", // Couleur légèrement grisée pour le mode clair
      dark: "#000000",
      contrastText: "#ffffff"
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#ffffff"
    },
    warning: {
      main: "#ffa726",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "#000000"
    },
    info: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1",
      contrastText: "#ffffff"
    },
    success: {
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "#ffffff"
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff"
    },
    text: {
      primary: "#000000",
      secondary: "#3e3e3e"
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#b39438", // Adaptation pour la lisibilité en mode sombre
      light: "#e0c966",
      dark: "#8a6e1f", // Teinte plus sombre pour le mode dark
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#ffffff",
      light: "#b0b0b0",
      dark: "#808080",
      contrastText: "#000000"
    },
    error: {
      main: "#ef5350",
      light: "#e57373",
      dark: "#c62828",
      contrastText: "#ffffff"
    },
    warning: {
      main: "#ffa726",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "#000000"
    },
    info: {
      main: "#4fc3f7",
      light: "#81d4fa",
      dark: "#0288d1",
      contrastText: "#ffffff"
    },
    success: {
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "#ffffff"
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e"
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3"
    }
  }
});

export { lightTheme, darkTheme };
