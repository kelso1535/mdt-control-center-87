
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
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'people': return 'People Screen';
      case 'vehicles': return 'Vehicle Screen';
      case 'history': return 'Search History Screen';
      case 'criminal': return 'Criminal History Screen';
      case 'traffic': return 'Traffic Offenses Screen';
      case 'reports': return 'Reports Screen';
      case 'serials': return 'Serial Search Screen';
      case 'actions': return 'Actions Screen';
      case 'financial': return 'Financial Records Screen';
      case 'supervisor': return 'Units Screen';
      case 'wanted': return 'Warrants Screen';
      case 'admin': return 'Admin Screen';
      default: return 'Unknown Screen';
    }
  };
  
  // Simple fallback content for screens without content
  const SimplePlaceholder = () => (
    <div>
      <h2 className="text-2xl mb-4">{getScreenTitle()}</h2>
      <p>This is the {currentScreen} screen. Content will be rendered here.</p>
    </div>
  );

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
      return <SimplePlaceholder />;
  }
};

export default ContentRenderer;
