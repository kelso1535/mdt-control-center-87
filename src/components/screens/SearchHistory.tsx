
import React, { useState, useEffect } from 'react';
import { SearchHistoryItem } from '@/types';

const mockSearchHistory: SearchHistoryItem[] = [
  {
    id: 'sh1',
    timestamp: '2024-02-20 19:45',
    type: 'Person',
    query: 'John Smith'
  },
  {
    id: 'sh2',
    timestamp: '2024-02-20 19:30',
    type: 'Vehicle',
    query: 'ABC123'
  },
  {
    id: 'sh3',
    timestamp: '2024-02-20 19:15',
    type: 'Serial',
    query: 'SN123456789'
  },
  {
    id: 'sh4',
    timestamp: '2024-02-20 19:00',
    type: 'Person',
    query: 'Jane Doe'
  }
];

const SearchHistory: React.FC = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHistory(mockSearchHistory);
      setLoading(false);
    }, 800);
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
      <h2 className="text-green-400 text-2xl font-bold mb-4">Search History</h2>
      
      <div className="bg-card/30 border border-border rounded-md p-4 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-green-400 py-2 px-1">Timestamp</th>
              <th className="text-green-400 py-2 px-1">Search Type</th>
              <th className="text-green-400 py-2 px-1">Query</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="border-t border-border/30">
                <td className="py-2 px-1 text-green-400">{item.timestamp}</td>
                <td className="py-2 px-1 text-green-400">{item.type}</td>
                <td className="py-2 px-1 text-green-400">{item.query}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchHistory;
