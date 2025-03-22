
import React from 'react';

const Units: React.FC = () => {
  return (
    <div className="p-4 h-full bg-[#0a1726] text-white">
      <h1 className="text-2xl font-bold mb-4">Supervisor Panel</h1>
      
      <div className="bg-[#0d1e33] border border-[#1c3a5a] rounded-md p-4 mb-4">
        <h2 className="text-xl font-semibold mb-3">Active Units</h2>
        
        <div className="space-y-2">
          <div className="bg-[#0a1422] border border-[#1c3a5a] p-3 rounded-md flex justify-between">
            <span>Unit 1-Adam-12</span>
            <span className="text-green-500">Available</span>
          </div>
          
          <div className="bg-[#0a1422] border border-[#1c3a5a] p-3 rounded-md flex justify-between">
            <span>Unit 2-Lincoln-20</span>
            <span className="text-yellow-500">Busy</span>
          </div>
          
          <div className="bg-[#0a1422] border border-[#1c3a5a] p-3 rounded-md flex justify-between">
            <span>Unit 3-Mary-5</span>
            <span className="text-red-500">Responding</span>
          </div>
        </div>
      </div>
      
      <div className="bg-[#0d1e33] border border-[#1c3a5a] rounded-md p-4">
        <h2 className="text-xl font-semibold mb-3">Unit Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-2 rounded">
            Dispatch All Units
          </button>
          
          <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-2 rounded">
            Recall All Units
          </button>
        </div>
      </div>
    </div>
  );
};

export default Units;
