import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider, CssBaseline } from "@mui/material";

import "./index.css";
import App from "./App.jsx";

import { getTheme } from "./theme/theme";

function Root() {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  const theme = useMemo(
    () => getTheme(mode),
    [mode]
  );

  const toggleTheme = () => {
    const newMode =
      mode === "light" ? "dark" : "light";

    setMode(newMode);

    localStorage.setItem("theme", newMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <App
        mode={mode}
        toggleTheme={toggleTheme}
      />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);