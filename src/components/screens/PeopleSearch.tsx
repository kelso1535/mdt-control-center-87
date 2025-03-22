
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Person } from '@/types';

const mockPerson: Person = {
  id: '12345',
  name: 'Braxton Jones',
  dob: '1972-3-23',
  gender: 'M',
  address: 'STRAWBERRY, LOS SANTOS',
  phone: '5836764',
  licenseClass: '[CAR] [RIDER]',
  licenseExpiry: '2023-11-13 00:00 AM',
  licenseStatus: 'CURRENT',
  demeritPoints: 0,
  flags: {
    wanted: false,
    bail: false,
    possessWeapon: false,
    violencePolice: true,
    violence: false,
  },
  weapons: {
    longarm: false,
    concealCarry: false,
    prohibOrder: false,
    handgun: false,
  },
  imageUrl: '/lovable-uploads/1384504f-656b-468e-adff-9af978864dfb.png'
};

const PeopleSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a name to search');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResult(mockPerson);
      setLoading(false);
      toast.success(`Search complete for "${searchQuery}"`);
    }, 800);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">People Screen</h2>
      
      <div className="flex mb-2">
        <input
          type="text"
          placeholder="Enter name to search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mr-2 px-2 py-1 bg-black border border-gray-600 text-white"
          style={{ width: '300px' }}
        />
        <button 
          onClick={handleSearch}
          className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Run Person Check'}
        </button>
      </div>
      
      {searchResult && (
        <div className="border border-gray-700 p-2 mt-4">
          <h3 className="text-xl mb-2">LEAP DATABASE ENTRY</h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex">
              <span className="mr-2">NAME:</span>
              <span>{searchResult.name}</span>
            </div>
            <div className="flex">
              <span className="mr-2">DOB:</span>
              <span>{searchResult.dob}</span>
            </div>
            <div className="flex">
              <span className="mr-2">SEX:</span>
              <span>{searchResult.gender}</span>
            </div>
            <div className="flex">
              <span className="mr-2">HOME ADDR:</span>
              <span>{searchResult.address}</span>
            </div>
            <div className="flex">
              <span className="mr-2">PHONE NO:</span>
              <span>{searchResult.phone}</span>
            </div>
          </div>
          
          <hr className="my-2 border-gray-700" />
          
          <h3 className="text-xl mb-2">ROAD TRAFFIC AUTHORITY</h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex">
              <span className="mr-2">LIC CLASS:</span>
              <span>{searchResult.licenseClass}</span>
            </div>
            <div className="flex">
              <span className="mr-2">LIC STATUS:</span>
              <span>{searchResult.licenseStatus}</span>
            </div>
            <div className="flex">
              <span className="mr-2">EXPIRES:</span>
              <span>{searchResult.licenseExpiry}</span>
            </div>
            <div></div>
            <div className="flex">
              <span className="mr-2">CONDITIONS:</span>
              <span>{searchResult.demeritPoints === 0 ? 'NONE' : 'POINTS'}</span>
            </div>
            <div className="flex">
              <span className="mr-2">DEMERIT PTS:</span>
              <span>{searchResult.demeritPoints} (LAST 7 DAYS)</span>
            </div>
          </div>
          
          <hr className="my-2 border-gray-700" />
          
          <h3 className="text-xl mb-2">FLAGS</h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex">
              <span className="mr-2">WANTED:</span>
              <span>{searchResult.flags.wanted ? 'YES' : 'NO'}</span>
            </div>
            <div className="flex">
              <span className="mr-2">VIOLENCE POLICE:</span>
              <span>{searchResult.flags.violencePolice ? 'YES' : 'NO'}</span>
            </div>
            <div className="flex">
              <span className="mr-2">BAIL:</span>
              <span>{searchResult.flags.bail ? 'YES' : 'NO'}</span>
            </div>
            <div className="flex">
              <span className="mr-2">VIOLENCE:</span>
              <span>{searchResult.flags.violence ? 'YES' : 'NO'}</span>
            </div>
            <div className="flex">
              <span className="mr-2">POS WEAP:</span>
              <span>{searchResult.flags.possessWeapon ? 'YES' : 'NO'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleSearch;
