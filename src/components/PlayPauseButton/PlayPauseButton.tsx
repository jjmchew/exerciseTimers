import React, { forwardRef } from "react";
import styles from "./PlayPauseButton.module.css";
import PauseIcon from "../PauseIcon/PauseIcon.tsx";
import PlayIcon from "../PlayIcon/PlayIcon.tsx";

export interface PlayPauseButtonProps {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  isRunning: boolean;
}

const PlayPauseButton = forwardRef<HTMLButtonElement, PlayPauseButtonProps>(
  ({ handleClick, isRunning }, ref) => {
    let classes = [styles.buttonIcon];
    if (isRunning) classes.push(styles.pause);
    else classes.push(styles.play);

    return (
      <button ref={ref} onClick={handleClick} className={classes.join(" ")}>
        {isRunning ? <PauseIcon /> : <PlayIcon />}
      </button>
    );
  },
);

export default PlayPauseButton;
