import { useState, useEffect } from 'react'
import { Workout, Activity } from './types.ts';
import API from './components/api.ts';
import WorkoutSelect from './components/WorkoutSelect.tsx';
import ActivityDisplay from './components/ActivityDisplay.tsx';
import TimerWrapper from './components/TimerWrapper.tsx';
import utils from './utils.ts';
import './App.css'

function App() {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [selected, setSelected] = useState<string>('');
  const activities: Activity[] | null = utils.getActivities(selected, workouts);

  useEffect(() => {
    if (workouts === null) {
      API.getData()
        .then(data => setWorkouts(data));
    }
  }, []);


  const handleSelect = (e: string) => {
    setSelected(e);
  };

  if (!workouts) return (<p>loading...</p>);

  return (
    <>
      <h1>Exercise timer</h1>
      <WorkoutSelect workouts={workouts} handleSelect={handleSelect} />
      <ActivityDisplay activities={activities} />
      <TimerWrapper activities={activities} />
    </>
  )
}

export default App
