
import React, { useState, useEffect } from 'react';
import { FinancialRecord } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

const mockFinancialRecords: FinancialRecord[] = [
  {
    id: 'fr1',
    date: '2024-02-20',
    type: 'Fine',
    amount: 3500,
    status: 'UNPAID',
    description: 'Traffic Violation'
  },
  {
    id: 'fr2',
    date: '2024-02-19',
    type: 'Fine',
    amount: 5000,
    status: 'PAID',
    description: 'Property Damage'
  },
  {
    id: 'fr3',
    date: '2024-02-18',
    type: 'Fee',
    amount: 1000,
    status: 'UNPAID',
    description: 'Court Processing'
  }
];

const FinancialRecords: React.FC = () => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setRecords(mockFinancialRecords);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-police-blue text-2xl font-bold">Financial Records</h2>
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
      
      <div className="bg-card/30 border border-border rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-police-blue py-2 px-2">Date</th>
              <th className="text-police-blue py-2 px-2">Type</th>
              <th className="text-police-blue py-2 px-2">Amount</th>
              <th className="text-police-blue py-2 px-2">Status</th>
              <th className="text-police-blue py-2 px-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center">
                  <div className="loading-dots inline-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-muted-foreground">
                  No financial records found
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id} className="border-t border-border/30">
                  <td className="py-2 px-2 text-police-blue">{record.date}</td>
                  <td className="py-2 px-2 text-police-blue">{record.type}</td>
                  <td className="py-2 px-2 text-police-blue">${record.amount.toLocaleString()}</td>
                  <td className={`py-2 px-2 ${record.status === 'PAID' ? 'text-paid' : 'text-unpaid'}`}>
                    {record.status}
                  </td>
                  <td className="py-2 px-2 text-police-blue">{record.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialRecords;
