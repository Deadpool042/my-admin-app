import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { CustomThemeProvider } from "contexts/ThemeContext";
import { AuthProvider } from "contexts/AuthContext";
import { Provider } from "react-redux";
import store from "api/redux/store/store";

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <CustomThemeProvider>
          <AuthProvider>
            <CssBaseline />
            <App />
          </AuthProvider>
        </CustomThemeProvider>
      </React.StrictMode>
    </Provider>
  );
}
