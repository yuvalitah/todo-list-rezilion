import { createTheme as createMuiTheme, PaletteMode } from "@mui/material";

export const APP_BAR_HEIGHT = 64;

export const createTheme = (mode: PaletteMode) =>
  createMuiTheme({
    palette: {
      mode,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          positionStatic: {
            height: APP_BAR_HEIGHT,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              color: mode === "light" ? "#FFFFFF" : "#90caf9",
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: mode === "light" ? "#FFFFFF" : "#90caf9",
          },
        },
      },
    },
  });
