import { Workout } from '../types.ts';
import utils from '../utils.ts';

interface WorkoutSelectProps {
  workouts: Workout[],
  handleSelect: (e: string) => void,
}

const WorkoutSelect = (
  { workouts, handleSelect }: WorkoutSelectProps
) => {
  const displayNames = workouts.map(obj => {
    return (
      <li
        key={obj.id}
        className="selectable"
        onClick={() => handleSelect(obj.id)}
      >
        {obj.name}: <span className="workoutTime">{utils.displayTime(obj.total)}</span>
      </li>
    );
  });

  return (
    <>
      <div>Saved Timers</div>
      <ul>
        {displayNames}
      </ul>
    </>
  )
};

export default WorkoutSelect;



