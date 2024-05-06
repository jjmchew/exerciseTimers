import { Activity } from '../types.ts';
import Multiline from './Multiline.tsx';

interface ActivityDisplayProps {
  activities: Activity[] | null,
}

const ActivityDisplay = (
  { activities }: ActivityDisplayProps
) => {

  if (!activities) return null;

  const displayInfo = activities.map((obj, idx) => {
    return (
      <div
        key={idx + obj.name + obj.details + obj.secs}
        className='activity'
      >
        <div className="actName">{obj.name}</div>
        <div className="actDetails">
          <Multiline str={obj.details} />
        </div>
        <div className="actSecs"><em>Seconds:</em> {obj.secs}</div>
      </div>
    );
  });

  return (
    <>
      {displayInfo}
    </>
  )
};

export default ActivityDisplay;




