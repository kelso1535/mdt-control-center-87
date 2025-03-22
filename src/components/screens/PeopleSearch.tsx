
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
      <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-2">Search Person</h2>
      
      <div className="flex space-x-2 mb-3">
        <Input
          type="text"
          placeholder="Enter name to search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Button 
          onClick={handleSearch}
          className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/90 text-white"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Run Person Check'}
        </Button>
      </div>
      
      {searchResult && (
        <div className="bg-card border border-border rounded-md p-3 mt-3 animate-slide-in overflow-y-auto max-h-[calc(100vh-220px)]">
          <div className="flex justify-between">
            <div className="flex-1">
              <div className="text-center mb-1">
                <h3 className="text-[hsl(var(--police-blue))] text-lg">------- LEAP DATABASE ENTRY -------</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-1">
                <div className="data-line">
                  <span className="text-[hsl(var(--police-blue))]">NAME:</span>
                  <span>{searchResult.name}</span>
                </div>
                <div className="data-line">
                  <span className="text-[hsl(var(--police-blue))]">DOB:</span>
                  <span>{searchResult.dob}</span>
                </div>
                <div className="data-line">
                  <span className="text-[hsl(var(--police-blue))]">SEX:</span>
                  <span>{searchResult.gender}</span>
                </div>
                <div className="data-line">
                  <span className="text-[hsl(var(--police-blue))]">HOME ADDR:</span>
                  <span>{searchResult.address}</span>
                </div>
                <div className="data-line">
                  <span className="text-[hsl(var(--police-blue))]">PHONE NO:</span>
                  <span>{searchResult.phone}</span>
                </div>
              </div>
              
              <DashedDivider />
              
              <div className="text-center mb-1">
                <h3 className="text-[hsl(var(--police-blue))]">------- ROAD TRAFFIC AUTHORITY -------</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-1">
                <div className="data-line">
                  <span className="text-[hsl(var(--police-blue))]">LIC CLASS:</span>
                  <span>{searchResult.licenseClass}</span>
                </div>
                <div className="data-line">
                  <span className="text-[hsl(var(--police-blue))]">LIC STATUS:</span>
                  <span>{searchResult.licenseStatus}</span>
                </div>
                <div className="data-line">
                  <span className="text-[hsl(var(--police-blue))]">EXPIRES:</span>
                  <span>{searchResult.licenseExpiry}</span>
                </div>
                <div></div>
                <div className="data-line">
                  <span className="text-[hsl(var(--police-blue))]">CONDITIONS:</span>
                  <span>{searchResult.demeritPoints === 0 ? 'NONE' : 'POINTS'}</span>
                </div>
                <div className="data-line">
                  <span className="text-[hsl(var(--police-blue))]">DEMERIT PTS:</span>
                  <span>{searchResult.demeritPoints} (LAST 7 DAYS)</span>
                </div>
              </div>
              
              <DashedDivider />
              
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <div className="text-center mb-1">
                    <h3 className="text-[hsl(var(--police-blue))]">------- WANTED -------</h3>
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="data-line">
                      <span className="text-[hsl(var(--police-blue))]">WANTED:</span>
                      <span>{searchResult.flags.wanted ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="data-line">
                      <span className="text-[hsl(var(--police-blue))]">BAIL:</span>
                      <span>{searchResult.flags.bail ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="data-line">
                      <span className="text-[hsl(var(--police-blue))]">MEN. HEALTH:</span>
                      <span>{searchResult.flags.mentalHealth ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="data-line">
                      <span className="text-[hsl(var(--police-blue))]">POS WEAP:</span>
                      <span>{searchResult.flags.possessWeapon ? 'YES' : 'NO'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-center mb-1">
                    <h3 className="text-[hsl(var(--police-blue))]">------- FLAGS -------</h3>
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="data-line">
                      <span className="text-[hsl(var(--police-blue))]">VIOLENCE POLICE:</span>
                      <span>{searchResult.flags.violencePolice ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="data-line">
                      <span className="text-[hsl(var(--police-blue))]">VIOLENCE:</span>
                      <span>{searchResult.flags.violence ? 'YES' : 'NO'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <DashedDivider />
              
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <div className="text-center mb-1">
                    <h3 className="text-[hsl(var(--police-blue))]">------- WEAPON LONGARM -------</h3>
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="data-line">
                      <span className="text-[hsl(var(--police-blue))]">WEAPON LONGARM:</span>
                      <span>{searchResult.weapons.longarm ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="data-line">
                      <span className="text-[hsl(var(--police-blue))]">CONCEAL CARRY PERMIT:</span>
                      <span>{searchResult.weapons.concealCarry ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="data-line">
                      <span className="text-[hsl(var(--police-blue))]">F/ARM PROHIB ORDER:</span>
                      <span>{searchResult.weapons.prohibOrder ? 'YES' : 'NO'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-center mb-1">
                    <h3 className="text-[hsl(var(--police-blue))]">------- WEAPON LICENCES -------</h3>
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="data-line">
                      <span className="text-[hsl(var(--police-blue))]">HANDGUN:</span>
                      <span>{searchResult.weapons.handgun ? 'YES' : 'NO'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <DashedDivider />
              
              <div className="text-center mb-1">
                <h3 className="text-[hsl(var(--police-blue))]">------- OTHER -------</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-1">
                <div className="data-line">
                  <span className="text-[hsl(var(--police-blue))]">DNA ON FILE:</span>
                  <span>CURRENT ON FILE</span>
                </div>
                <div className="data-line">
                  <span className="text-[hsl(var(--police-blue))]">FINE / CHARGE:</span>
                  <span>$ - AS NECESSARY</span>
                </div>
              </div>
            </div>
            
            {searchResult.imageUrl && (
              <div className="ml-3">
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
