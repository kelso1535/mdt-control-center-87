
import React from 'react';
import PeopleSearch from '@/components/screens/PeopleSearch';
import VehicleSearch from '@/components/screens/VehicleSearch';
import SearchHistory from '@/components/screens/SearchHistory';
import CriminalHistory from '@/components/screens/CriminalHistory';
import TrafficOffences from '@/components/screens/TrafficOffences';
import FinancialRecords from '@/components/screens/FinancialRecords';
import SerialSearch from '@/components/screens/SerialSearch';
import Actions from '@/components/screens/Actions';
import Units from '@/components/screens/Units';
import Warrants from '@/components/screens/Warrants';
import Reports from '@/components/screens/Reports';
import Admin from '@/components/screens/Admin';

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
  | 'admin';

interface ContentRendererProps {
  currentScreen: Screen;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ currentScreen }) => {
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
    default:
      return <PeopleSearch />;
  }
};

export default ContentRenderer;
