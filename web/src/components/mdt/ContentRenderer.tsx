
import React from 'react';
import PeopleSearch from '../screens/PeopleSearch';
import VehicleSearch from '../screens/VehicleSearch';
import SearchHistory from '../screens/SearchHistory';
import CriminalHistory from '../screens/CriminalHistory';
import TrafficOffences from '../screens/TrafficOffences';
import FinancialRecords from '../screens/FinancialRecords';
import SerialSearch from '../screens/SerialSearch';
import Actions from '../screens/Actions';
import Units from '../screens/Units';
import Warrants from '../screens/Warrants';
import Reports from '../screens/Reports';
import Admin from '../screens/Admin';
import CourtCases from '../screens/CourtCases';
import MagistrateAvailability from '../screens/MagistrateAvailability';

type Screen = 
  | 'login'
  | 'people'
  | 'vehicles'
  | 'history'
  | 'criminal'
  | 'traffic'
  | 'reports'
  | 'serials'
  | 'actions'
  | 'financial'
  | 'supervisor'
  | 'wanted'
  | 'admin'
  | 'court'
  | 'magistrate';

interface ContentRendererProps {
  currentScreen: Screen;
  userRole?: 'officer' | 'magistrate';
  callsign?: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ 
  currentScreen,
  userRole = 'officer',
  callsign = ''
}) => {
  switch (currentScreen) {
    case 'people':
      return <PeopleSearch />;
    case 'vehicles':
      return <VehicleSearch />;
    case 'history':
      return <SearchHistory />;
    case 'criminal':
      return <CriminalHistory />;
    case 'traffic':
      return <TrafficOffences />;
    case 'reports':
      return <Reports />;
    case 'serials':
      return <SerialSearch />;
    case 'actions':
      return <Actions />;
    case 'financial':
      return <FinancialRecords />;
    case 'supervisor':
      return <Units />;
    case 'wanted':
      return <Warrants />;
    case 'admin':
      return <Admin />;
    case 'court':
      return <CourtCases userRole={userRole} callsign={callsign} />;
    case 'magistrate':
      return <MagistrateAvailability callsign={callsign} />;
    default:
      return <PeopleSearch />;
  }
};

export default ContentRenderer;
