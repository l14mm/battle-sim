import "./App.css";
import React from "react";
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  MuiThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core";
import Header from "./components/Header";

const themeLight = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "light",
    },
  })
);

const themeDark = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
    },
  })
);

const useStyles = makeStyles((theme) => ({
}));

export default function App() {

  const [isThemeLight, setTheme] = React.useState(false);
  const toggleTheme = () => setTheme(!isThemeLight);

  return (
    <MuiThemeProvider theme={isThemeLight ? themeLight : themeDark}>
      <CssBaseline />
      <Header isThemeLight={isThemeLight} toggleTheme={toggleTheme} />
    </MuiThemeProvider>
  );
}
