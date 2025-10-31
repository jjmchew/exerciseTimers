// @ts-ignore
import useSound from "use-sound";
import { useState, useEffect, useRef, forwardRef } from "react";
import Bell from "../assets/bell.wav";
import utils from "../utils.ts";
import Multiline from "./Multiline.tsx";

function useInterval(callback: any, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback?.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

interface TimerProps {
  handleClick: () => void;
  timer: {
    secs: number;
    name: string;
    details?: string;
  };
  nextTimer: () => void;
  isRunning?: boolean;
  selected?: boolean;
  ref?: any;
}

const Timer = forwardRef<HTMLElement, TimerProps>(
  (
    { timer, isRunning = false, selected = false, nextTimer, handleClick },
    ref,
  ) => {
    const { secs, name } = timer;

    const [count, setCount] = useState<number>(secs);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [msg, setMsg] = useState<string | null>(null);
    const [playSound] = useSound(Bell);
    const delay = 1000; // counter update in ms;

    useInterval(
      () => {
        setCount(count - 1);
      },
      isRunning && !isComplete ? delay : null,
    );

    useEffect(() => {
      if (count === -1) {
        playSound();
        setMsg("Complete");
        setIsComplete(true);
        setCount(secs);
        nextTimer();
      }
    }, [count]);

    let details = null;
    if (timer?.details) {
      details = <Multiline center={true} str={timer.details} />;
    }

    const timeClasses = ["currentTime"];
    const nameClasses = ["currentName"];

    if (selected) {
      timeClasses.push("selectedTime");
      nameClasses.push("selectedName");
    }

    return (
      <section ref={ref} onClick={handleClick}>
        <div className={nameClasses.join(" ")}>{name}</div>
        {details}
        <div className={timeClasses.join(" ")}>{utils.displayTime(count)}</div>
        <div className="centerDetails">{msg}</div>
      </section>
    );
  },
);
export default Timer;
