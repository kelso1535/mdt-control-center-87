
import React, { useState, useEffect } from 'react';

interface CriminalRecord {
  id: string;
  date: string;
  paid: boolean;
  amount: number;
  offense: string;
}

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
  }
];

const CriminalHistory: React.FC = () => {
  const [records, setRecords] = useState<CriminalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecords(mockCriminalRecords);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="p-4 h-full bg-[#0a1726] text-white">
        <h1 className="text-2xl font-bold mb-4">Criminal History</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007bff]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full bg-[#0a1726] text-white">
      <h1 className="text-2xl font-bold mb-4">Criminal History</h1>
      
      <div className="bg-[#0d1e33] border border-[#1c3a5a] rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-[#1c3a5a]">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Paid</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Offense</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b border-[#1c3a5a]/30 hover:bg-[#1c3a5a]/20">
                <td className="py-2 px-4">{record.date}</td>
                <td className="py-2 px-4">{record.paid ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4">${record.amount}</td>
                <td className="py-2 px-4">{record.offense}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CriminalHistory;
