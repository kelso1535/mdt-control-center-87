
// Officer statuses
export type OfficerStatus = 
  | 'Code 1 On Patrol'
  | 'Code 2 Responding'
  | 'Code 3 Emergency'
  | 'Code 4 Under Control'
  | 'Code 5 Stakeout'
  | 'Code 6 Investigating'
  | 'Code 7 Meal Break'
  | 'Off Duty';

// Search history item
export interface SearchHistoryItem {
  id: string;
  timestamp: string;
  type: string;
  query: string;
}

// Criminal record
export interface CriminalRecord {
  id: string;
  date: string;
  paid: boolean;
  amount: number;
  offense: string;
}

// Traffic offence
export interface TrafficOffence {
  id: string;
  date: string;
  type: string;
  amount: number;
  details: string;
}

// Financial record
export interface FinancialRecord {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: 'PAID' | 'UNPAID';
  description: string;
}

// Serial
export interface Serial {
  id: string;
  serial: string;
  type: string;
  model: string;
  owner: string;
  status: string;
  registeredDate: string;
  flags: {
    stolen: boolean;
    wanted: boolean;
  }
}

// Vehicle
export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  color: string;
  owner: string;
  registration: string;
  flags: {
    stolen: boolean;
    wanted: boolean;
  }
}

// Warrant
export interface Warrant {
  id: string;
  name: string;
  status: 'ACTIVE' | 'EXPIRED' | 'COMPLETED';
  count: number;
}

// Police Unit
export interface PoliceUnit {
  callsign: string;
  pin: string;
  name: string;
  updated: string;
  status: string;
  location: string;
  phone: string;
}
