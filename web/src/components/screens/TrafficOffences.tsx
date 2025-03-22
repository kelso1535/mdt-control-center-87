
import React from 'react';

const TrafficOffences: React.FC = () => {
  return (
    <div className="p-4 h-full bg-[#0a1726] text-white">
      <h1 className="text-2xl font-bold mb-4">Traffic Offences</h1>
      
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          placeholder="Search traffic violations..." 
          className="flex-1 px-3 py-2 bg-[#0a1422] border border-[#1c3a5a] rounded text-white"
        />
        <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
      
      <div className="bg-[#0d1e33] border border-[#1c3a5a] rounded-md p-4">
        <p className="text-center text-gray-400">No traffic violations found</p>
      </div>
    </div>
  );
};

export default TrafficOffences;
