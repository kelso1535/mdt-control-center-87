
import React from 'react';

const Reports: React.FC = () => {
  return (
    <div className="p-4 h-full bg-[#0a1726] text-white">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          placeholder="Search reports..." 
          className="flex-1 px-3 py-2 bg-[#0a1422] border border-[#1c3a5a] rounded text-white"
        />
        <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
      
      <div className="flex justify-end mb-4">
        <button className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-2 rounded">
          New Report
        </button>
      </div>
      
      <div className="bg-[#0d1e33] border border-[#1c3a5a] rounded-md p-4">
        <p className="text-center text-gray-400">No reports found</p>
      </div>
    </div>
  );
};

export default Reports;
