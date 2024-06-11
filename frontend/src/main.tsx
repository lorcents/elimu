import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider,createTheme } from "@mui/material/styles";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

const theme = createTheme({
  typography: {
    fontFamily: "Mulish, Arial",
  },
  palette: {
    primary: {
      main: "#5ACCCC",
      light: "#FFFFFF",
      dark: "#335C6E",
      contrastText: "#FABD33",
    },
    secondary: {
      main: "#CFFAFA",
      light: "#F76434",
      dark: "#4AA088",
      contrastText: "#FAAD00",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
