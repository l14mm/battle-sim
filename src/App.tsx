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
import { DiceRoll } from "./store/types";

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

const rollDice = () => {
  return Math.ceil(Math.random() * 6) as DiceRoll;
};

export default function App() {

  const [isThemeLight, setTheme] = React.useState(false);
  const toggleTheme = () => setTheme(!isThemeLight);

  console.log(rollDice())
  
  return (
    <MuiThemeProvider theme={isThemeLight ? themeLight : themeDark}>
      <CssBaseline />
      <Header isThemeLight={isThemeLight} toggleTheme={toggleTheme} />
    </MuiThemeProvider>
  );
}
