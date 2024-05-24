import { PaletteMode, ThemeOptions, createTheme } from "@mui/material";

const customTheme = (mode: PaletteMode): ThemeOptions => {
  const themeOptions: ThemeOptions = {
    components: {
      MuiStepIcon: {
        styleOverrides: {
          root: {
            "&.Mui-completed": {
              color: "green",
            },
            "&.Mui-active": {
              color: "#2d86b8",
            },
            "&.Mui-disabled": {
              "& .MuiStepIcon-root": {
                color: "cyan",
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#bbdad6" : "#2a3653",
          },
        },
      },
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#48958a", // Light primary color
              contrastText: "#212121", // Text color for light primary
            },
            secondary: {
              main: "#2d86b8", // Light secondary color (deep blue)
              contrastText: "#fff", // Text color for light secondary
            },
            info: {
              main: "#5eb4a7", // Light info color (white)
              contrastText: "#212121", // Text color for light info
            },
            text: {
              primary: "#212121", // Light text color
              secondary: "#616161", // Light secondary text color
            },
            background: {
              default: "#FEFEFE", // Light background color
              paper: "#fff", // Light paper background color
            },
          }
        : {
            primary: {
              main: "#111934", // Dark primary color
              contrastText: "#fff", // Text color for dark primary
            },
            secondary: {
              main: "#75739d", // Dark secondary color (deep black)
              contrastText: "#fff", // Text color for dark secondary
            },
            info: {
              main: "#6076b9", // Dark info color (deep green)
              contrastText: "#fff", // Text color for dark info
            },
            text: {
              primary: "#fff", // Dark text color
              secondary: "#bdbdbd", // Dark secondary text color
            },
            background: {
              default: "#121212", // Dark background color
              paper: "#23272f", // Dark paper background color
            },
          }),
    },
  };

  return createTheme(themeOptions);
};

export default customTheme;
