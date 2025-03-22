
import React, { useState } from 'react';

const VehicleSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-4 h-full bg-[#0a1726] text-white">
      <h1 className="text-2xl font-bold mb-4">Vehicle Search</h1>
      
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          placeholder="Enter license plate to search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 bg-[#0a1422] border border-[#1c3a5a] rounded text-white"
        />
        <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-2 rounded">
          Run Vehicle Check
        </button>
      </div>
      
      <div className="bg-[#0d1e33] border border-[#1c3a5a] rounded-md p-4">
        <p className="text-center text-gray-400">No results found</p>
      </div>
    </div>
  );
};

export default VehicleSearch;
