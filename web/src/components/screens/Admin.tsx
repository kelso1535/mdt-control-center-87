
import React from 'react';

const Admin: React.FC = () => {
  return (
    <div className="p-4 h-full bg-[#0a1726] text-white">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <div className="bg-[#0d1e33] border border-[#1c3a5a] rounded-md p-4">
        <p className="mb-4">Administrative functions</p>
        <div className="space-y-4">
          <div className="bg-[#0a1422] border border-[#1c3a5a] p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">User Management</h3>
            <p className="text-gray-400">Manage officer accounts and permissions</p>
          </div>
          
          <div className="bg-[#0a1422] border border-[#1c3a5a] p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">System Configuration</h3>
            <p className="text-gray-400">Configure MDT system settings</p>
          </div>
          
          <div className="bg-[#0a1422] border border-[#1c3a5a] p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Logs</h3>
            <p className="text-gray-400">View system activity logs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
