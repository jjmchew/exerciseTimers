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

  // adjust play-pause button position
  useEffect(() => {
    const buttonEl = buttonRef.current;
    if (!buttonEl) return;

    const updateButtonPosition = () => {
      const timerEl = timerRefs.current[currentTimerIdx];
      if (!timerEl) return;

      const rect = timerEl.getBoundingClientRect();
      buttonEl.style.position = "fixed";
      buttonEl.style.top = `${rect.top + rect.height / 2 + 5}px`;
      buttonEl.style.left = `12%`;
      buttonEl.style.transform = "translate(-50%, -50%)";
    };

    updateButtonPosition();
    window.addEventListener("scroll", updateButtonPosition, { passive: true });
    window.addEventListener("resize", updateButtonPosition);

    return () => {
      window.removeEventListener("scroll", updateButtonPosition);
      window.removeEventListener("resize", updateButtonPosition);
    };
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

  const handlePlayPauseButton = () => {
    if (isRunning) setIsRunning(false);
    else setIsRunning(true);
  };

  const listOfTimers = activities.map((activity, idx) => {
    return currentTimerIdx === idx ? (
      <Timer
        key={clickTimestamp + idx}
        timer={activity}
        nextTimer={nextTimer}
        isRunning={isRunning}
        selected={true}
        handleClick={() => handleTimerSelect(idx)}
        ref={(el: HTMLElement | null) => (timerRefs.current[idx] = el)}
      />
    ) : (
      <Timer
        key={clickTimestamp + idx}
        timer={activity}
        nextTimer={nextTimer}
        ref={(el: HTMLElement | null) => (timerRefs.current[idx] = el)}
        handleClick={() => handleTimerSelect(idx)}
      />
    );
  });

  return (
    <>
      <PlayPauseButton
        ref={buttonRef}
        handleClick={handlePlayPauseButton}
        isRunning={isRunning}
      />
      {listOfTimers}
    </>
  );
};

export default TimersList;
