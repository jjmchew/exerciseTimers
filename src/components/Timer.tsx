import { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import Bell from '../assets/bell.wav';
import utils from '../utils.ts';
import Multiline from './Multiline.tsx';

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
  timer: {
    secs: number,
    name: string,
    details?: string,
  },
  nextTimer: () => void,
  autoRun: boolean,
  nonFinal: boolean,
}

const Timer = ({
  timer,
  nextTimer,
  autoRun,
  nonFinal
}: TimerProps) => {

  const { secs, name } = timer;
  const [count, setCount] = useState<number>(secs);
  const [isRunning, setIsRunning] = useState<boolean>(autoRun);
  const [msg, setMsg] = useState<string | null>(null);
  const [playSound] = useSound(Bell);
  const delay = 1000;

  useInterval(() => {
    setCount(count - 1);
  }, isRunning ? delay : null);

  const startCount = () => {
    if (count == -1) resetCount();

    setIsRunning(true);
  };

  const resetCount = () => {
    setCount(secs);
    setIsRunning(autoRun);
    setMsg(null);
  };

  useEffect(() => {
    if (count == -1) {
      playSound();
      setMsg("Complete");
      if (nonFinal) nextTimer();
      else {
        setIsRunning(false);
        setCount(0);
      }
    }
  }, [count]);

  useEffect(() => {
    resetCount();
  }, [timer]);

  let details = null;
  if (timer?.details) {
    details = <Multiline str={timer.details} />;
  }

  return (
    <>
      <button onClick={startCount}>Start</button>
      <button onClick={() => setIsRunning(false)}>Pause</button>
      <div className="currentName">{name}</div>
      {details}
      <div className="currentTime">{utils.displayTime(count)}</div>
      <button onClick={resetCount}>Reset</button>
      <div>{msg}</div>
    </>
  );
}

export default Timer;
