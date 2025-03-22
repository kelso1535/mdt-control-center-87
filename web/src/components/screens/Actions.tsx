
import React from 'react';

const Actions: React.FC = () => {
  return (
    <div className="p-4 h-full bg-[#0a1726] text-white">
      <h1 className="text-2xl font-bold mb-4">Actions</h1>
      
      <div className="bg-[#0d1e33] border border-[#1c3a5a] rounded-md p-4">
        <p className="mb-4">Available actions</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-3 rounded">
            Issue APB
          </button>
          
          <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-3 rounded">
            Create BOLO
          </button>
          
          <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-3 rounded">
            Request Backup
          </button>
          
          <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-3 rounded">
            Dispatch Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default Actions;
