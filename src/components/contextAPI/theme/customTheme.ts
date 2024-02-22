import { PaletteMode } from "@mui/material";

const customTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#FEFEFE", // Light primary color
            contrastText: "#212121", // Text color for light primary
          },
          secondary: {
            main: "#074a41", // Light secondary color
            contrastText: "#fff", // Text color for light secondary
          },
          info: {
            main: "#FEFEFE", // Light info color
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
            main: "#121212", // Dark primary color
            contrastText: "#fff", // Text color for dark primary
          },
          secondary: {
            main: "#090909", // Dark secondary color
            contrastText: "#fff", // Text color for dark secondary
          },
          info: {
            main: "#1e2c92", // Dark info color
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
});

export default customTheme;
