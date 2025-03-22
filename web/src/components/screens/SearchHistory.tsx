
import React, { useState, useEffect } from 'react';

interface SearchRecord {
  id: string;
  type: 'person' | 'vehicle' | 'property';
  term: string;
  date: string;
  officerId: string;
}

const mockSearchRecords: SearchRecord[] = [
  {
    id: '1',
    type: 'person',
    term: 'John Doe',
    date: '2023-10-19 13:45',
    officerId: 'PD-123'
  },
  {
    id: '2',
    type: 'vehicle',
    term: 'ABC123',
    date: '2023-10-19 14:30',
    officerId: 'PD-123'
  },
  {
    id: '3',
    type: 'person',
    term: 'Jane Smith',
    date: '2023-10-18 09:15',
    officerId: 'PD-456'
  },
  {
    id: '4',
    type: 'property',
    term: 'Serial #45678',
    date: '2023-10-17 16:20',
    officerId: 'PD-789'
  }
];

const SearchHistory: React.FC = () => {
  const [records, setRecords] = useState<SearchRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecords(mockSearchRecords);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="p-4 h-full bg-[#0a1726] text-white">
        <h1 className="text-2xl font-bold mb-4">Search History</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007bff]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full bg-[#0a1726] text-white">
      <h1 className="text-2xl font-bold mb-4">Search History</h1>
      
      <div className="bg-[#0d1e33] border border-[#1c3a5a] rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-[#1c3a5a]">
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Search Term</th>
              <th className="py-2 px-4">Date & Time</th>
              <th className="py-2 px-4">Officer ID</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b border-[#1c3a5a]/30 hover:bg-[#1c3a5a]/20">
                <td className="py-2 px-4 capitalize">{record.type}</td>
                <td className="py-2 px-4">{record.term}</td>
                <td className="py-2 px-4">{record.date}</td>
                <td className="py-2 px-4">{record.officerId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchHistory;
