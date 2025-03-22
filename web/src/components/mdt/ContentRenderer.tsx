
import React from 'react';

// Create placeholder components instead of trying to import missing ones
const PeopleSearch = () => <div className="p-4"><h2 className="text-xl mb-4">People Search</h2><p>Search for people in the database</p></div>;
const VehicleSearch = () => <div className="p-4"><h2 className="text-xl mb-4">Vehicle Search</h2><p>Search for vehicles in the database</p></div>;
const SearchHistory = () => <div className="p-4"><h2 className="text-xl mb-4">Search History</h2><p>View your recent searches</p></div>;
const CriminalHistory = () => <div className="p-4"><h2 className="text-xl mb-4">Criminal History</h2><p>View criminal records</p></div>;
const TrafficOffences = () => <div className="p-4"><h2 className="text-xl mb-4">Traffic Offences</h2><p>View traffic violations</p></div>;
const FinancialRecords = () => <div className="p-4"><h2 className="text-xl mb-4">Financial Records</h2><p>View financial information</p></div>;
const SerialSearch = () => <div className="p-4"><h2 className="text-xl mb-4">Serial Search</h2><p>Search for serial numbers</p></div>;
const Actions = () => <div className="p-4"><h2 className="text-xl mb-4">Actions</h2><p>Perform police actions</p></div>;
const Units = () => <div className="p-4"><h2 className="text-xl mb-4">Units</h2><p>View and manage units</p></div>;
const Warrants = () => <div className="p-4"><h2 className="text-xl mb-4">Warrants</h2><p>View and manage warrants</p></div>;
const Reports = () => <div className="p-4"><h2 className="text-xl mb-4">Reports</h2><p>View and create reports</p></div>;
const Admin = () => <div className="p-4"><h2 className="text-xl mb-4">Admin</h2><p>Administrative functions</p></div>;

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
