import { useState, useEffect } from "react";
import { Workout } from "./types.ts";
import API from "./components/api.ts";
import WorkoutSelect from "./components/WorkoutSelect.tsx";
import TimersList from "./components/TimersList/TimersList.tsx";
import utils from "./utils.ts";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const workout: Workout | null = utils.getWorkout(selected, workouts);

  useEffect(() => {
    if (workouts === null) {
      API.getData().then((data) => setWorkouts(data));
    }
  }, []);

  const handleSelect = (workoutId: string | null) => {
    setSelected(workoutId);
  };

  if (!workouts) return <p>loading...</p>;

  const mainPage = (
    <>
      <h1>Exercise timers</h1>
      <WorkoutSelect workouts={workouts} handleSelect={handleSelect} />
    </>
  );

  return (
    <>
      {workout ? (
        <TimersList
          key={selected}
          workoutName={workout.name}
          activities={workout.activities}
          onDeselect={() => handleSelect(null)}
        />
      ) : (
        mainPage
      )}
    </>
  );
}

export default App;
