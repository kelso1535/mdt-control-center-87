// Officer statuses
export type OfficerStatus = 
  | 'Code 1 On Patrol' 
  | 'Code 2 Responding' 
  | 'Code 3 Emergency' 
  | 'Code 4 Scene Secure' 
  | 'Code 5 Stakeout' 
  | 'Code 6 Investigating' 
  | 'Code 7 Meal Break'
  | 'Code 8 Request Cover'
  | 'Code 9 All Units Standby'
  | 'Code 10 SWAT Deploy'
  | 'Out of Service';

// Warrant type
export interface Warrant {
  id: string;
  name: string;
  status: 'ACTIVE' | 'CLOSED' | 'PENDING';
  count: number;
}

// Other types can be added as needed
