
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Vehicle } from '@/types';
import DashedDivider from '../DashedDivider';

const mockVehicle: Vehicle = {
  id: 'v12345',
  plate: 'ABC123',
  model: 'BUFFALO STX',
  color: 'BLACK',
  owner: 'JOHN DOE',
  registration: 'VALID',
  insurance: 'VALID',
  flags: {
    stolen: false,
    wanted: false
  }
};

const VehicleSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a plate number to search');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResult(mockVehicle);
      setLoading(false);
      toast.success(`Search complete for plate "${searchQuery}"`);
    }, 800);
  };

  return (
    <div className="fade-in">
      <h2 className="text-xl text-blue-400 font-bold mb-4">Search Vehicle</h2>
      
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Enter plate number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Button 
          onClick={handleSearch}
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Run Vehicle Check'}
        </Button>
      </div>
      
      {searchResult && (
        <div className="bg-card border border-border rounded-md p-4 mt-4 animate-slide-in">
          <div className="text-center mb-2">
            <h3 className="text-primary text-lg">------- VEHICLE DATABASE ENTRY -------</h3>
            <p className="text-primary">---</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="data-line">
              <span className="text-primary">PLATE:</span>
              <span>{searchResult.plate}</span>
            </div>
            <div className="data-line">
              <span className="text-primary">MODEL:</span>
              <span>{searchResult.model}</span>
            </div>
            
            <div className="data-line">
              <span className="text-primary">COLOR:</span>
              <span>{searchResult.color}</span>
            </div>
            <div className="data-line">
              <span className="text-primary">OWNER:</span>
              <span>{searchResult.owner}</span>
            </div>
            
            <div className="data-line">
              <span className="text-primary">REGISTRATION:</span>
              <span className={searchResult.registration === 'VALID' ? 'text-primary' : 'text-destructive'}>
                {searchResult.registration}
              </span>
            </div>
            <div className="data-line">
              <span className="text-primary">INSURANCE:</span>
              <span className={searchResult.insurance === 'VALID' ? 'text-primary' : 'text-destructive'}>
                {searchResult.insurance}
              </span>
            </div>
          </div>
          
          <DashedDivider />
          
          <div className="text-center my-2">
            <h3 className="text-primary">------- FLAGS -------</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="data-line">
              <span className="text-primary">STOLEN:</span>
              <span className={searchResult.flags.stolen ? 'text-destructive' : ''}>
                {searchResult.flags.stolen ? 'YES' : 'NO'}
              </span>
            </div>
            <div className="data-line">
              <span className="text-primary">WANTED:</span>
              <span className={searchResult.flags.wanted ? 'text-destructive' : ''}>
                {searchResult.flags.wanted ? 'YES' : 'NO'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleSearch;
