
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Vehicle } from '@/types';
import DashedDivider from '../DashedDivider';
import { SectionHeader } from '../DataSection';

const mockVehicle: Vehicle = {
  id: 'v12345',
  plate: 'ABC123',
  model: 'BUFFALO STX',
  color: 'BLACK',
  owner: 'JOHN DOE',
  registration: 'VALID',
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
      <h2 className="text-xl text-blue-400 font-bold mb-2">Search Vehicle</h2>
      
      <div className="flex space-x-2 mb-2">
        <Input
          type="text"
          placeholder="Enter plate number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Button 
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Run Vehicle Check'}
        </Button>
      </div>
      
      {searchResult && (
        <div className="data-card animate-slide-in">
          <SectionHeader title="VEHICLE DATABASE ENTRY" />
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mb-2">
            <div className="data-line">
              <span>PLATE:</span>
              <span>{searchResult.plate}</span>
            </div>
            <div className="data-line">
              <span>MODEL:</span>
              <span>{searchResult.model}</span>
            </div>
            
            <div className="data-line">
              <span>COLOR:</span>
              <span>{searchResult.color}</span>
            </div>
            <div className="data-line">
              <span>OWNER:</span>
              <span>{searchResult.owner}</span>
            </div>
            
            <div className="data-line">
              <span>REGISTRATION:</span>
              <span className={searchResult.registration === 'VALID' ? 'text-green-400' : 'text-red-400'}>
                {searchResult.registration}
              </span>
            </div>
          </div>
          
          <DashedDivider />
          
          <SectionHeader title="FLAGS" />
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
            <div className="data-line">
              <span>STOLEN:</span>
              <span className={searchResult.flags.stolen ? 'text-red-400' : ''}>
                {searchResult.flags.stolen ? 'YES' : 'NO'}
              </span>
            </div>
            <div className="data-line">
              <span>WANTED:</span>
              <span className={searchResult.flags.wanted ? 'text-red-400' : ''}>
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
