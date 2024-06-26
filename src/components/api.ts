import { Workout, Activity } from "../types.ts";
// import db from '../../db.json';
// const BASE_URL = process.env.NODE_ENV === 'production'
//   ? 'https://80087355.xyz/workouts'
//   : 'http://localhost:3003/workouts';
const BASE_URL = 'https://80087355.xyz/workouts';

interface JSONActivity {
  name: string,
  secs: string,
  details?: string,
}

interface JSONWorkout {
  id: string,
  name: string,
  total: string,
  activities: JSONActivity[]
}

const convertActivities = (activities: JSONActivity[]): Activity[] => {
  const newObj = activities.map(obj => {
    return {
      ...obj,
      secs: parseInt(obj.secs, 10),
    };
  });
  return newObj;
};

const getData = async (): Promise<Workout[]> => {
  const raw = await fetch(BASE_URL);
  const data = await raw.json();
  // const data = db.workouts;
  return data.map((obj: JSONWorkout) => {
    return {
      ...obj,
      total: parseInt(obj.total, 10),
      activities: convertActivities(obj.activities),
    }
  });
};

export default { getData };

