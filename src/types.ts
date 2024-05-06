export interface Workout {
  id: string,
  name: string,
  total: number,
  activities: Activity[],
}

export interface Activity {
  name: string,
  secs: number,
  details?: string,
}


