
import React, { useState, useEffect } from 'react';

interface TrafficOffence {
  id: string;
  date: string;
  paid: boolean;
  amount: number;
  offense: string;
  vehicle: string;
}

const mockTrafficOffences: TrafficOffence[] = [
  {
    id: 'to1',
    date: '25/10/2023',
    paid: false,
    amount: 1200,
    offense: 'Speeding (30+ over limit)',
    vehicle: 'Sultan (ABC123)'
  },
  {
    id: 'to2',
    date: '18/10/2023',
    paid: true,
    amount: 800,
    offense: 'Running red light',
    vehicle: 'Sultan (ABC123)'
  },
  {
    id: 'to3',
    date: '11/10/2023',
    paid: false,
    amount: 500,
    offense: 'Illegal parking',
    vehicle: 'Sentinel (XYZ789)'
  },
  {
    id: 'to4',
    date: '02/10/2023',
    paid: true,
    amount: 1500,
    offense: 'Reckless driving',
    vehicle: 'Banshee (RST456)'
  }
];

const TrafficOffences: React.FC = () => {
  const [offences, setOffences] = useState<TrafficOffence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOffences(mockTrafficOffences);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="p-4 h-full bg-[#0a1726] text-white">
        <h1 className="text-2xl font-bold mb-4">Traffic Offences</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007bff]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full bg-[#0a1726] text-white">
      <h1 className="text-2xl font-bold mb-4">Traffic Offences</h1>
      
      <div className="bg-[#0d1e33] border border-[#1c3a5a] rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-[#1c3a5a]">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Paid</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Offense</th>
              <th className="py-2 px-4">Vehicle</th>
            </tr>
          </thead>
          <tbody>
            {offences.map((offence) => (
              <tr key={offence.id} className="border-b border-[#1c3a5a]/30 hover:bg-[#1c3a5a]/20">
                <td className="py-2 px-4">{offence.date}</td>
                <td className="py-2 px-4">{offence.paid ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4">${offence.amount}</td>
                <td className="py-2 px-4">{offence.offense}</td>
                <td className="py-2 px-4">{offence.vehicle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrafficOffences;
