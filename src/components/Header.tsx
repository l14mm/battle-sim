import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  IconButton,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import Brightness4Icon from "@material-ui/icons/Brightness4";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    textAlign: 'center',
  },
  themeIcon: {
    color: "white",
  },
}));

export default function Header(props: {
  isThemeLight: boolean;
  toggleTheme: () => void;
}) {
  const classes = useStyles();
  const { isThemeLight, toggleTheme } = props;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h5" noWrap>
          Battle Simulator
        </Typography>
        <Tooltip title="Toggle theme" aria-label="toggle theme">
          <IconButton
            className={classes.themeIcon}
            aria-label="toggle theme"
            onClick={toggleTheme}
          >
            {isThemeLight ? <Brightness4Icon /> : <BrightnessHighIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
