import { Typography } from "@material-ui/core";
import React from "react";
import { CSSTransition } from "react-transition-group";

export default function TransitionText(props: {
  text: string;
  transitionTime?: number;
  attacks: number;
}) {
  const { text, transitionTime, attacks } = { ...{ transitionTime: 200 }, ...props };

  const [messageToShow, setMessageToShow] = React.useState<string>("");
  const [showMessage, setShowMessage] = React.useState(false);

  React.useEffect(() => {
    setShowMessage(false);
    setTimeout(() => {
      setMessageToShow("");
    }, transitionTime / 2);
    setTimeout(() => {
      setShowMessage(true);
      setMessageToShow(text);
    }, transitionTime);
  }, [text, transitionTime, attacks]);

  return (
    <CSSTransition
      in={showMessage}
      timeout={200}
      classNames="attack-message"
      unmountOnExit
    >
      <Typography variant="h4">{messageToShow}</Typography>
    </CSSTransition>
  );
}
