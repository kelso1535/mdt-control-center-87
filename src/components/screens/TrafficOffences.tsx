
import React, { useState, useEffect } from 'react';
import { TrafficOffence } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

const mockTrafficOffences: TrafficOffence[] = [
  {
    id: 'to1',
    date: '2024-02-20',
    type: 'Speeding Fine',
    amount: 250,
    details: 'Exceeded speed limit by 20km/h'
  },
  {
    id: 'to2',
    date: '2024-02-19',
    type: 'Unregistered Vehicle',
    amount: 500,
    details: 'Operating an unregistered vehicle'
  }
];

const TrafficOffences: React.FC = () => {
  const [offences, setOffences] = useState<TrafficOffence[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setOffences(mockTrafficOffences);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-police-blue text-2xl font-bold">Infringement Notices & Fines</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="bg-card border-primary/30 text-primary" 
            size="sm"
            onClick={loadData}
            disabled={loading}
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="ml-1">Refresh</span>
          </Button>
        </div>
      </div>
      
      <div className="data-panel">
        <table className="mdt-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center">
                  <div className="loading-dots inline-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
            ) : offences.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-muted-foreground">
                  No traffic offences found
                </td>
              </tr>
            ) : (
              offences.map((offence) => (
                <tr key={offence.id}>
                  <td>{offence.date}</td>
                  <td>{offence.type}</td>
                  <td>${offence.amount}</td>
                  <td>{offence.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrafficOffences;
