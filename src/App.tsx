import "./App.css";
import React, { RefObject, useReducer } from "react";
import {
  Button,
  createMuiTheme,
  CssBaseline,
  Grid,
  LinearProgress,
  makeStyles,
  MuiThemeProvider,
  responsiveFontSizes,
  Typography,
} from "@material-ui/core";
import Header from "./components/Header";
import MyDialog from "./components/MyDialog";
import player from "./sprites/player.png";
import monster from "./sprites/monster.png";
import TransitionText from "./components/TransitionText";
import { initialState, reducer } from "./store/reducer";
import { DiceRoll } from "./store/types";
import { MAX_HEALTH_PLAYER, MAX_HEALTH_MONSTER } from "./config";

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
  root: {
    flexGrow: 1,
    textAlign: "center",
    padding: theme.spacing(3),
  },
  grid: {
    height: "80vh",
  },
  healthRoot: {
    width: 100,
    height: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  healthBar: {
    transform: "rotate(-90deg)",
    width: 400,
    height: 10,
    top: 200,
    position: "relative",
    right: 150,
  },
  sprite: {
    width: 100,
    height: 100,
  },
  diceRoot: {
    display: "flex",
    flexDirection: "column",
    width: 75,
  },
  dice: {
    fontSize: 100,
  },
  attackMessage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  playerCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const rollDice = () => {
  return Math.ceil(Math.random() * 6) as DiceRoll;
};

const setDiceValue = (
  diceRef: RefObject<HTMLDivElement>,
  value: DiceRoll | null
) => {
  if (value && diceRef.current) {
    diceRef.current.innerHTML = `&#x268${value - 1};`;
  }
};

export default function App() {
  const classes = useStyles();

  const [isThemeLight, setTheme] = React.useState(false);
  const toggleTheme = () => setTheme(!isThemeLight);

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    playerHealth,
    monsterHealth,
    attackMessage,
    gameState,
    playerDice1,
    playerDice2,
    monsterDice1,
    monsterDice2,
    attacking,
    attacks,
  } = state;

  const onAttack = React.useCallback(() => {
    const roll1 = rollDice();
    const roll2 = rollDice();
    const playerDamage = roll1 + roll2;

    const roll3 = rollDice();
    const roll4 = rollDice();
    const monsterDamage = roll3 + roll4;

    dispatch({ type: "SET_DICE", payload: { roll1, roll2, roll3, roll4 } });
    dispatch({ type: "ATTACK", payload: { playerDamage, monsterDamage } });
    setTimeout(() => {
      dispatch({ type: "ATTACK_FINISH" });
    }, 500);
  }, []);

  const resetGame = React.useCallback(() => {
    dispatch({ type: "RESET_GAME" });
  }, []);

  const playerDice1Ref = React.createRef<HTMLDivElement>();
  const playerDice2Ref = React.createRef<HTMLDivElement>();

  const monsterDice1Ref = React.createRef<HTMLDivElement>();
  const monsterDice2Ref = React.createRef<HTMLDivElement>();

  React.useEffect(() => {setDiceValue(playerDice1Ref, playerDice1)}, [playerDice1Ref, playerDice1]);
  React.useEffect(() => {setDiceValue(playerDice2Ref, playerDice2)}, [playerDice2Ref, playerDice2]);
  React.useEffect(() => {setDiceValue(monsterDice1Ref, monsterDice1)}, [monsterDice1Ref, monsterDice1]);
  React.useEffect(() => {setDiceValue(monsterDice2Ref, monsterDice2)}, [monsterDice2Ref, monsterDice2]);

  const renderHealthBar = (health: number, maxHealth: number) => (
    <div className={classes.healthRoot}>
      <LinearProgress
        className={classes.healthBar}
        variant="determinate"
        color="secondary"
        value={(health / maxHealth) * 100}
      />
      <Typography variant="h6">{health}</Typography>
    </div>
  );

  const renderDice = (dice: RefObject<HTMLDivElement>[], key: string) => (
    <div className={classes.diceRoot}>
      {dice.map((ref, i) => (
        <div key={`${key}-${i}`} ref={ref} className={classes.dice} />
      ))}
    </div>
  );

  return (
    <MuiThemeProvider theme={isThemeLight ? themeLight : themeDark}>
      <CssBaseline />
      <Header isThemeLight={isThemeLight} toggleTheme={toggleTheme} />
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={5} className={classes.playerCard}>
            <div>
              <img className={classes.sprite} src={player} alt="player" />
              <Typography>Player</Typography>
            </div>
            {renderHealthBar(playerHealth, MAX_HEALTH_PLAYER)}
            {renderDice([playerDice1Ref, playerDice2Ref], "player")}
          </Grid>

          <Grid item xs={2} className={classes.attackMessage}>
            <TransitionText text={attackMessage} attacks={attacks} />
          </Grid>

          <Grid item xs={5} className={classes.playerCard}>
            {renderDice([monsterDice1Ref, monsterDice2Ref], "monster")}
            {renderHealthBar(monsterHealth, MAX_HEALTH_MONSTER)}
            <div>
              <img className={classes.sprite} src={monster} alt="monster" />
              <Typography>Monster</Typography>
            </div>
          </Grid>
        </Grid>

        <Button
          onClick={onAttack}
          disabled={attacking}
          variant="contained"
          color="secondary"
        >
          ATTACK!
        </Button>

        <MyDialog gameState={gameState} onClose={resetGame} />
      </div>
    </MuiThemeProvider>
  );
}
