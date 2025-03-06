
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Person } from '@/types';
import DataSection from '../DataSection';
import DashedDivider from '../DashedDivider';

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
    mentalHealth: false,
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
    <div className="fade-in">
      <h2 className="text-xl text-blue-400 font-bold mb-4">Search Person</h2>
      
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Enter name to search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Button 
          onClick={handleSearch}
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Run Person Check'}
        </Button>
      </div>
      
      {searchResult && (
        <div className="bg-card border border-border rounded-md p-4 mt-4 animate-slide-in overflow-y-auto max-h-[calc(100vh-220px)]">
          <div className="flex justify-between">
            <div className="flex-1">
              <div className="text-center mb-2">
                <h3 className="text-primary text-lg">------- LEAP DATABASE ENTRY -------</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="data-line">
                  <span className="text-primary">NAME:</span>
                  <span>{searchResult.name}</span>
                </div>
                <div className="data-line">
                  <span className="text-primary">DOB:</span>
                  <span>{searchResult.dob}</span>
                </div>
                <div className="data-line">
                  <span className="text-primary">SEX:</span>
                  <span>{searchResult.gender}</span>
                </div>
                <div className="data-line">
                  <span className="text-primary">HOME ADDR:</span>
                  <span>{searchResult.address}</span>
                </div>
                <div className="data-line">
                  <span className="text-primary">PHONE NO:</span>
                  <span>{searchResult.phone}</span>
                </div>
              </div>
              
              <DashedDivider />
              
              <div className="text-center mb-2">
                <h3 className="text-primary">------- ROAD TRAFFIC AUTHORITY -------</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="data-line">
                  <span className="text-primary">LIC CLASS:</span>
                  <span>{searchResult.licenseClass}</span>
                </div>
                <div className="data-line">
                  <span className="text-primary">LIC STATUS:</span>
                  <span>{searchResult.licenseStatus}</span>
                </div>
                <div className="data-line">
                  <span className="text-primary">EXPIRES:</span>
                  <span>{searchResult.licenseExpiry}</span>
                </div>
                <div></div>
                <div className="data-line">
                  <span className="text-primary">CONDITIONS:</span>
                  <span>{searchResult.demeritPoints === 0 ? 'NONE' : 'POINTS'}</span>
                </div>
                <div className="data-line">
                  <span className="text-primary">DEMERIT PTS:</span>
                  <span>{searchResult.demeritPoints} (LAST 7 DAYS)</span>
                </div>
              </div>
              
              <DashedDivider />
              
              <div className="grid grid-cols-2 gap-x-8">
                <div>
                  <div className="text-center mb-2">
                    <h3 className="text-primary">------- WANTED -------</h3>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="data-line">
                      <span className="text-primary">WANTED:</span>
                      <span>{searchResult.flags.wanted ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="data-line">
                      <span className="text-primary">BAIL:</span>
                      <span>{searchResult.flags.bail ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="data-line">
                      <span className="text-primary">MEN. HEALTH:</span>
                      <span>{searchResult.flags.mentalHealth ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="data-line">
                      <span className="text-primary">POS WEAP:</span>
                      <span>{searchResult.flags.possessWeapon ? 'YES' : 'NO'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-center mb-2">
                    <h3 className="text-primary">------- FLAGS -------</h3>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="data-line">
                      <span className="text-primary">VIOLENCE POLICE:</span>
                      <span>{searchResult.flags.violencePolice ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="data-line">
                      <span className="text-primary">VIOLENCE:</span>
                      <span>{searchResult.flags.violence ? 'YES' : 'NO'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <DashedDivider />
              
              <div className="grid grid-cols-2 gap-x-8">
                <div>
                  <div className="text-center mb-2">
                    <h3 className="text-primary">------- WEAPON LONGARM -------</h3>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="data-line">
                      <span className="text-primary">WEAPON LONGARM:</span>
                      <span>{searchResult.weapons.longarm ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="data-line">
                      <span className="text-primary">CONCEAL CARRY PERMIT:</span>
                      <span>{searchResult.weapons.concealCarry ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="data-line">
                      <span className="text-primary">F/ARM PROHIB ORDER:</span>
                      <span>{searchResult.weapons.prohibOrder ? 'YES' : 'NO'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-center mb-2">
                    <h3 className="text-primary">------- WEAPON LICENCES -------</h3>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="data-line">
                      <span className="text-primary">HANDGUN:</span>
                      <span>{searchResult.weapons.handgun ? 'YES' : 'NO'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <DashedDivider />
              
              <div className="text-center mb-2">
                <h3 className="text-primary">------- OTHER -------</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="data-line">
                  <span className="text-primary">DNA ON FILE:</span>
                  <span>CURRENT ON FILE</span>
                </div>
                <div className="data-line">
                  <span className="text-primary">FINE / CHARGE:</span>
                  <span>$ - AS NECESSARY</span>
                </div>
              </div>
            </div>
            
            {searchResult.imageUrl && (
              <div className="ml-4">
                <img 
                  src={searchResult.imageUrl} 
                  alt={searchResult.name} 
                  className="w-32 h-32 object-cover rounded-md border border-border"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleSearch;
