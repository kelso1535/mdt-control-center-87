
export type OfficerStatus = 
  | 'Code 1 On Patrol'
  | 'Code 2 Responding'
  | 'Code 3 Emergency'
  | 'Break'
  | 'Meal Break'
  | 'Off Duty'
  | 'On Scene'
  | 'Unavailable'
  | 'Busy';

export interface CriminalRecord {
  id: string;
  date: string;
  paid: boolean;
  amount: number;
  offense: string;
}

export interface TrafficOffence {
  id: string;
  date: string;
  paid: boolean;
  amount: number;
  offense: string;
  vehicle: string;
}

export interface SearchRecord {
  id: string;
  type: 'person' | 'vehicle' | 'property';
  term: string;
  date: string;
  officerId: string;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  mugshot?: string;
  address: string;
  licenses: string[];
  flags: string[];
  notes?: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  color: string;
  owner: string;
  registered: boolean;
  stolen: boolean;
  insurance: string;
  flags: string[];
  notes?: string;
}

export interface Report {
  id: string;
  title: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
  attachments?: string[];
}

export interface Warrant {
  id: string;
  suspectName: string;
  reason: string;
  date: string;
  expiry: string;
  approved: boolean;
  approvedBy?: string;
  officers: string[];
}
