import { Activity, Workout } from "./types.ts";

const getActivities = (
  selected: string,
  workouts: Workout[] | null,
): Activity[] | null => {
  if (!workouts) return null;

  const workout = workouts.filter((obj) => obj.id === selected);
  if (workout.length !== 0) return workout[0].activities;
  else return null;
};

const displayTime = (secs: number | null): string | null => {
  if (secs === null) return null;

  const f = (num: number): string => {
    let str = String(num);
    return str.padStart(2, "0");
  };

  const hrs = Math.floor(secs / 3600);
  const mins = Math.floor((secs - 3600 * hrs) / 60);
  const rsecs = secs - 3600 * hrs - 60 * mins;
  return `${f(hrs)}:${f(mins)}:${f(rsecs)}`;
};

const calculateTotal = (activities: Activity[]) => {
  return activities.reduce((total, current) => total + current.secs, 0);
};

export default { getActivities, displayTime, calculateTotal };
