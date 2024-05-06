import { useState, useEffect } from 'react';
import { Activity } from '../types.ts';
import Timer from './Timer.tsx';

interface TimerWrapperProps {
  activities: Activity[] | null,
}

const TimerWrapper = ({ activities }: TimerWrapperProps) => {
  const [currentTimer, setCurrentTimer] = useState<number>(0);

  useEffect(() => {
    setCurrentTimer(0);
  }, [activities])

  if (activities === null || currentTimer > activities.length) return null;

  const nextTimer = () => {
    if (currentTimer < activities.length - 1)
      setCurrentTimer(currentTimer => currentTimer + 1);
    else return;
  };

  const display = activities ? <Timer
    timer={activities[currentTimer]}
    nextTimer={nextTimer}
    autoRun={currentTimer !== 0}
    nonFinal={currentTimer < activities.length - 1}
  /> : null;

  const nextDesc = activities && currentTimer < activities.length - 1 
    ? <div className="nextDesc">{activities[currentTimer + 1].name} : {activities[currentTimer + 1].secs} secs</div>
    : null;
  
  return (
    <>
      {display}
      {nextDesc}
    </>
  );
};

export default TimerWrapper;
