export interface Workout {
  id: string;
  name: string;
  activities: Activity[];
}

export interface Activity {
  name: string;
  secs: number;
  details?: string;
}
