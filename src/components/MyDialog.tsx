import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles, Typography } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { GameState } from "../store/types";

const useStyles = makeStyles((theme) => ({
  lose: {
    color: red[500],
  },
  win: {
    color: green[500],
  },
}));

export default function MyDialog(props: {
  onClose: () => void;
  gameState: GameState;
}) {
  const classes = useStyles();
  const { onClose, gameState } = props;

  const handleClose = () => {
    onClose();
  };

  const message =
    gameState === GameState.win
      ? "You win"
      : gameState === GameState.lose
      ? "Game over"
      : "";

  return (
    <Dialog
      aria-labelledby="dialog"
      open={gameState !== GameState.playing}
    >
      <DialogTitle disableTypography id="dialog">
        <Typography
          className={gameState === GameState.win ? classes.win : classes.lose}
          variant="h1"
        >
          {message}
        </Typography>
      </DialogTitle>
      <Button onClick={handleClose}>Play again</Button>
    </Dialog>
  );
}
