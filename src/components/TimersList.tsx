import { useState, useEffect, useRef } from "react";
import { Activity } from "../types.ts";
import Timer from "./Timer.tsx";
import PlayPauseButton from "./PlayPauseButton/PlayPauseButton.tsx";

interface TimersListProps {
  activities: Activity[] | null;
}

const TimersList = ({ activities }: TimersListProps) => {
  const [currentTimerIdx, setCurrentTimerIdx] = useState<number>(0);
  const timerRefs = useRef<(HTMLElement | null)[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [clickTimestamp, setClickTimestamp] = useState<string>(
    Date.now().toString(),
  );

  // adjust scroll to current timer
  useEffect(() => {
    if (!activities || currentTimerIdx >= activities.length) return;
    const el = timerRefs.current[currentTimerIdx];
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentTimerIdx]);

  if (!activities || currentTimerIdx > activities.length) return null;

  const nextTimer = () => {
    if (currentTimerIdx < activities.length - 1) {
      setCurrentTimerIdx((currentTimerIdx) => currentTimerIdx + 1);
    } else return;
  };

  const handleTimerSelect = (idx: number) => {
    // new timestamp captured to reset timers in display
    // (i.e., create new element key in `listOfTimers`)
    setClickTimestamp(Date.now().toString());
    setCurrentTimerIdx(idx);
  };

  const handlePlayPauseButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isRunning) setIsRunning(false);
    else setIsRunning(true);
  };

  const listOfTimers = activities.map((activity, idx) => {
    return currentTimerIdx === idx ? (
      <div
        key={clickTimestamp + idx.toString()}
        className="timerRow"
        onClick={() => handleTimerSelect(idx)}
      >
        <PlayPauseButton
          key={"playPauseButton" + clickTimestamp + idx.toString()}
          ref={buttonRef}
          handleClick={handlePlayPauseButton}
          isRunning={isRunning}
        />
        <Timer
          key={"timer" + clickTimestamp + idx.toString()}
          timer={activity}
          nextTimer={nextTimer}
          isRunning={isRunning}
          selected={true}
          ref={(el: HTMLElement | null) => (timerRefs.current[idx] = el)}
        />
      </div>
    ) : (
      <div
        key={clickTimestamp + idx.toString()}
        className="timerRow"
        onClick={() => handleTimerSelect(idx)}
      >
        <div
          key={"spacer" + clickTimestamp + idx.toString()}
          className="buttonSpacer"
        ></div>
        <Timer
          key={"timer" + clickTimestamp + idx.toString()}
          timer={activity}
          nextTimer={nextTimer}
          ref={(el: HTMLElement | null) => (timerRefs.current[idx] = el)}
        />
      </div>
    );
  });

  return <>{listOfTimers}</>;
};

export default TimersList;
