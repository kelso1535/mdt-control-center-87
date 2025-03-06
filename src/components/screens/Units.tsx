
import React, { useState, useEffect } from 'react';
import { PoliceUnit } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Phone } from 'lucide-react';

const mockUnits: PoliceUnit[] = [
  {
    callsign: "CRV-625",
    pin: "405666",
    name: "JOHNNY ENDICANE",
    updated: "19:09",
    status: "UNAVAILABLE: STATION",
    location: "Sinner St & Alley St, Mission Row",
    phone: "555-3456"
  },
  {
    callsign: "M1-202",
    pin: "931398",
    name: "ARTHUR MILLER",
    updated: "17:54",
    status: "UNAVAILABLE: BUSY",
    location: "San Andreas Ave & Palomino Ave, Little Seoul",
    phone: "555-6789"
  },
  {
    callsign: "SRU-103",
    pin: "856432",
    name: "BOBBY RIVERS",
    updated: "18:32",
    status: "PATROLLING",
    location: "Elgin Ave, Strawberry",
    phone: "555-2345"
  },
  {
    callsign: "DNR-242",
    pin: "979806",
    name: "RICK BOBBY",
    updated: "18:13",
    status: "UNAVAILABLE: BUSY",
    location: "San Andreas Ave, Pillow Hill",
    phone: "555-9012"
  },
  {
    callsign: "LYK-207",
    pin: "967222",
    name: "SHERMAN HILL",
    updated: "18:26",
    status: "ON SITE",
    location: "Elgin Ave & Olympic Fwy, Strawberry",
    phone: "555-4567"
  },
  {
    callsign: "MIL-215",
    pin: "508856",
    name: "ADAM FREEMAN",
    updated: "18:10",
    status: "UNAVAILABLE: STATION",
    location: "Sinner St & Alley St, Mission Row",
    phone: "555-8901"
  }
];

const Units: React.FC = () => {
  const [units, setUnits] = useState<PoliceUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPhones, setShowPhones] = useState(false);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setUnits(mockUnits);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4 text-center">
        <h2 className="text-blue-400 text-2xl font-bold w-full">SUPERVISOR</h2>
      </div>
      
      <div className="flex justify-end gap-2 mb-4">
        <Button 
          variant="outline" 
          className="bg-blue-500/20 border-blue-500/50 text-blue-400" 
          size="sm"
          onClick={loadData}
          disabled={loading}
        >
          <RefreshCcw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
          Refresh Units
        </Button>
        <Button 
          variant="outline" 
          className="bg-blue-500/20 border-blue-500/50 text-blue-400" 
          size="sm"
          onClick={() => setShowPhones(!showPhones)}
        >
          <Phone className="w-4 h-4 mr-1" />
          Phone Numbers
        </Button>
      </div>
      
      <div className="bg-card/30 border border-border rounded-md p-4">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-green-400">
              <th className="py-1 px-1">CALLSIGN</th>
              <th className="py-1 px-1">PIN #</th>
              <th className="py-1 px-1">NAME</th>
              <th className="py-1 px-1">UPDATED</th>
              <th className="py-1 px-1">STATUS</th>
              <th className="py-1 px-1">LOCATION</th>
              {showPhones && <th className="py-1 px-1">PHONE</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={showPhones ? 7 : 6} className="py-8 text-center">
                  <div className="loading-dots inline-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
            ) : units.length === 0 ? (
              <tr>
                <td colSpan={showPhones ? 7 : 6} className="py-8 text-center text-muted-foreground">
                  No units currently on duty
                </td>
              </tr>
            ) : (
              units.map((unit, index) => (
                <tr key={index} className="border-t border-border/30">
                  <td className="py-1 px-1 text-green-400">{unit.callsign}</td>
                  <td className="py-1 px-1 text-green-400">{unit.pin}</td>
                  <td className="py-1 px-1 text-green-400">{unit.name}</td>
                  <td className="py-1 px-1 text-green-400">{unit.updated}</td>
                  <td className="py-1 px-1 text-green-400">{unit.status}</td>
                  <td className="py-1 px-1 text-green-400">{unit.location}</td>
                  {showPhones && <td className="py-1 px-1 text-green-400">{unit.phone}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Units;
