import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: "#1565C0",
      },

      secondary: {
        main: "#42A5F5",
      },

      background: {
        default:
          mode === "light"
            ? "#F5F7FA"
            : "#121212",

        paper:
          mode === "light"
            ? "#FFFFFF"
            : "#1E1E1E",
      },

      success: {
        main: "#2E7D32",
      },

      error: {
        main: "#D32F2F",
      },

      warning: {
        main: "#ED6C02",
      },

      info: {
        main: "#0288D1",
      },
    },

    typography: {
      fontFamily:
        "'Poppins','Roboto','Arial',sans-serif",

      h3: {
        fontWeight: 700,
      },

      h4: {
        fontWeight: 700,
      },

      h5: {
        fontWeight: 600,
      },

      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },

    shape: {
      borderRadius: 14,
    },

    components: {

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            paddingTop: 10,
            paddingBottom: 10,
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
      },
    },
  });