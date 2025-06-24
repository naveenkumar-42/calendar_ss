import React from "react";
import { ThemeProvider, createTheme, CssBaseline, Container } from "@mui/material";
import Calendar from "./components/Calendar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
  typography: {
    fontFamily: "'Segoe UI', sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Calendar />
      </Container>
    </ThemeProvider>
  );
};

export default App;
