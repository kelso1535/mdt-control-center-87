
export interface Person {
  id: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  licenseClass: string;
  licenseExpiry: string;
  licenseStatus: string;
  demeritPoints: number;
  flags: {
    wanted: boolean;
    bail: boolean;
    possessWeapon: boolean;
    violencePolice: boolean;
    violence: boolean;
  };
  weapons: {
    longarm: boolean;
    concealCarry: boolean;
    prohibOrder: boolean;
    handgun: boolean;
  };
  imageUrl?: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  color: string;
  owner: string;
  registration: 'VALID' | 'EXPIRED' | 'SUSPENDED';
  flags: {
    stolen: boolean;
    wanted: boolean;
  };
}

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
  };
}

export interface CriminalRecord {
  id: string;
  date: string;
  paid: boolean;
  amount: number;
  offense: string;
}

export interface FinancialRecord {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: 'PAID' | 'UNPAID';
  description: string;
}

export interface TrafficOffence {
  id: string;
  date: string;
  type: string;
  amount: number;
  details: string;
}

export interface SearchHistoryItem {
  id: string;
  timestamp: string;
  type: string;
  query: string;
}

export interface Warrant {
  id: string;
  name: string;
  status: 'ACTIVE';
  count: number;
}

export interface PoliceUnit {
  callsign: string;
  pin: string;
  name: string;
  updated: string;
  status: string;
  location: string;
  phone: string;
}

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

export interface CourtCase {
  id: string;
  title: string;
  description: string;
  date: string | null;
  time: string | null;
  status: 'scheduled' | 'pending' | 'completed' | 'dismissed';
  createdBy: string;
  prosecutor: string;
  defendant: string;
  charges: string[];
  witnesses: string[];
  evidence: string[];
  notes: string;
  verdict?: string;
  sentence?: string;
}

export interface MagistrateAvailability {
  id: string;
  magistrateName: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
}
