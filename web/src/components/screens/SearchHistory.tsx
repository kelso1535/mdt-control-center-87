
import React from 'react';

const SearchHistory: React.FC = () => {
  return (
    <div className="p-4 h-full bg-[#0a1726] text-white">
      <h1 className="text-2xl font-bold mb-4">Search History</h1>
      
      <div className="bg-[#0d1e33] border border-[#1c3a5a] rounded-md p-4">
        <p className="text-center text-gray-400 mb-4">Recent search history</p>
        
        <div className="space-y-2">
          <div className="bg-[#0a1422] border border-[#1c3a5a] p-3 rounded-md">
            <div className="flex justify-between">
              <span>Person: John Doe</span>
              <span className="text-gray-400 text-sm">10 minutes ago</span>
            </div>
          </div>
          
          <div className="bg-[#0a1422] border border-[#1c3a5a] p-3 rounded-md">
            <div className="flex justify-between">
              <span>Vehicle: ABC123</span>
              <span className="text-gray-400 text-sm">25 minutes ago</span>
            </div>
          </div>
          
          <div className="bg-[#0a1422] border border-[#1c3a5a] p-3 rounded-md">
            <div className="flex justify-between">
              <span>Person: Jane Smith</span>
              <span className="text-gray-400 text-sm">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
