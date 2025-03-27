
import React from 'react';
import PeopleSearch from '../screens/PeopleSearch';
import VehicleSearch from '../screens/VehicleSearch';
import SerialSearch from '../screens/SerialSearch';
import CriminalHistory from '../screens/CriminalHistory';
import TrafficOffences from '../screens/TrafficOffences';
import Reports from '../screens/Reports';
import FinancialRecords from '../screens/FinancialRecords';
import Actions from '../screens/Actions';
import Units from '../screens/Units';
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
  // Render the appropriate screen component based on the current screen
  switch (currentScreen) {
    case 'people':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <PeopleSearch />
        </div>
      );
    case 'vehicles':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <VehicleSearch />
        </div>
      );
    case 'serials':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <SerialSearch />
        </div>
      );
    case 'criminal':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <CriminalHistory />
        </div>
      );
    case 'traffic':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <TrafficOffences />
        </div>
      );
    case 'reports':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <Reports />
        </div>
      );
    case 'financial':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <FinancialRecords />
        </div>
      );
    case 'history':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <SearchHistory />
        </div>
      );
    case 'actions':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <Actions />
        </div>
      );
    case 'supervisor':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <Units />
        </div>
      );
    case 'wanted':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <Warrants />
        </div>
      );
    case 'admin':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <Admin />
        </div>
      );
    case 'court':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <CourtCases userRole={userRole} callsign={callsign} />
        </div>
      );
    case 'magistrate':
      return (
        <div className="p-4 overflow-y-auto h-full">
          <MagistrateAvailability callsign={callsign} />
        </div>
      );
    default:
      return (
        <div className="p-4 overflow-y-auto h-full">
          <div>No content available for {currentScreen}</div>
        </div>
      );
  }
};

export default ContentRenderer;
