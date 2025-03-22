
import React, { useState, useEffect } from 'react';
import { CriminalRecord } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

const mockCriminalRecords: CriminalRecord[] = [
  {
    id: 'cr1',
    date: '19/10/2023',
    paid: false,
    amount: 3500,
    offense: 'CHARGE: Engage in a Police Pursuit / Evade Police'
  },
  {
    id: 'cr2',
    date: '19/10/2023',
    paid: false,
    amount: 3500,
    offense: 'CHARGE: Assault Police'
  },
  {
    id: 'cr3',
    date: '19/10/2023',
    paid: true,
    amount: 1,
    offense: 'CHARGE: Right to Trial'
  },
  {
    id: 'cr4',
    date: '19/10/2023',
    paid: false,
    amount: 5000,
    offense: 'CHARGE: Kidnapping'
  },
  {
    id: 'cr5',
    date: '03/10/2023',
    paid: false,
    amount: 20000,
    offense: 'CHARGE: Attempted Murder (Police)'
  },
  {
    id: 'cr6',
    date: '03/10/2023',
    paid: false,
    amount: 2000,
    offense: 'CHARGE: Armed Robbery'
  },
  {
    id: 'cr7',
    date: '21/03/2023',
    paid: true,
    amount: 1,
    offense: 'CHARGE: Right to Trial'
  },
  {
    id: 'cr8',
    date: '21/03/2023',
    paid: true,
    amount: 3500,
    offense: 'CHARGE: Engage in a Police Pursuit / Evade Police'
  },
  {
    id: 'cr9',
    date: '21/03/2023',
    paid: true,
    amount: 20000,
    offense: 'CHARGE: Attempted Murder (Police)'
  },
  {
    id: 'cr10',
    date: '21/03/2023',
    paid: true,
    amount: 1000,
    offense: 'CHARGE: Contempt of Court'
  },
  {
    id: 'cr11',
    date: '21/03/2023',
    paid: true,
    amount: 2000,
    offense: 'CHARGE: Possess weapon (firearm) without legal authority'
  },
  {
    id: 'cr12',
    date: '21/03/2023',
    paid: true,
    amount: 2000,
    offense: 'CHARGE: Discharge weapon in a public place'
  }
];

const CriminalHistory: React.FC = () => {
  const [records, setRecords] = useState<CriminalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRecords(mockCriminalRecords);
      setLoading(false);
    }, 800);
  };
  
  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-police-blue text-2xl font-bold">LEAP CRIMINAL HISTORY</h2>
        <Button 
          variant="outline" 
          className="bg-card border-primary/30 text-primary" 
          size="sm"
          onClick={loadData}
        >
          <RefreshCcw className="w-4 h-4" />
          <span className="ml-1">Refresh</span>
        </Button>
      </div>
      
      <div className="mdt-table-container">
        <table className="mdt-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>P? Amount</th>
              <th>Offence</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>
                  {record.paid ? 'Y' : 'N'} ${record.amount}
                </td>
                <td>{record.offense}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CriminalHistory;
