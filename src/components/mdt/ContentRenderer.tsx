
import React from 'react';
import PeopleSearch from '../screens/PeopleSearch';
import VehicleSearch from '../screens/VehicleSearch';
import SerialSearch from '../screens/SerialSearch';
import CriminalHistory from '../screens/CriminalHistory';
import TrafficOffences from '../screens/TrafficOffences';
import Reports from '../screens/Reports';
import FinancialRecords from '../screens/FinancialRecords';
import Actions from '../screens/Actions';
import Supervisor from '../screens/Units';
import Warrants from '../screens/Warrants';
import Admin from '../screens/Admin';
import SearchHistory from '../screens/SearchHistory';
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
  | 'actions' 
  | 'supervisor' 
  | 'financial' 
  | 'serials' 
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
  let content;

  switch (currentScreen) {
    case 'people':
      content = <PeopleSearch />;
      break;
    case 'vehicles':
      content = <VehicleSearch />;
      break;
    case 'serials':
      content = <SerialSearch />;
      break;
    case 'criminal':
      content = <CriminalHistory />;
      break;
    case 'traffic':
      content = <TrafficOffences />;
      break;
    case 'reports':
      content = <Reports />;
      break;
    case 'financial':
      content = <FinancialRecords />;
      break;
    case 'history':
      content = <SearchHistory />;
      break;
    case 'actions':
      content = <Actions />;
      break;
    case 'supervisor':
      content = <Supervisor />;
      break;
    case 'wanted':
      content = <Warrants />;
      break;
    case 'admin':
      content = <Admin />;
      break;
    case 'court':
      content = <CourtCases userRole={userRole} callsign={callsign} />;
      break;
    case 'magistrate':
      content = <MagistrateAvailability callsign={callsign} />;
      break;
    default:
      content = <div>No content available for {currentScreen}</div>;
  }

  return (
    <div className="p-4 overflow-y-auto max-h-[calc(100vh-32px)]">
      {content}
    </div>
  );
};

export default ContentRenderer;
