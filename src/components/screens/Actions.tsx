
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Actions: React.FC = () => {
  const [warrantReason, setWarrantReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');

  const handleAddWarrant = () => {
    if (!warrantReason.trim()) {
      toast.error('Please enter a warrant reason');
      return;
    }
    
    toast.success('Warrant added successfully');
    setWarrantReason('');
  };

  return (
    <div className="fade-in">
      <h2 className="text-xl text-blue-400 font-bold mb-4">Police Actions</h2>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Button className="bg-secondary hover:bg-secondary/80">
          Toggle Suspend Driver's Licence
        </Button>
        <Button className="bg-secondary hover:bg-secondary/80">
          Revoke Prov Chgr/PIN Notice
        </Button>
        <Button className="bg-secondary hover:bg-secondary/80">
          Revoke Weapon Licence
        </Button>
        
        <Button className="bg-secondary hover:bg-secondary/80">
          Flag Weapons
        </Button>
        <Button className="bg-secondary hover:bg-secondary/80">
          Flag Mental Health
        </Button>
        <Button className="bg-secondary hover:bg-secondary/80">
          Flag Violence
        </Button>
        
        <Button className="bg-secondary hover:bg-secondary/80">
          Toggle Stolen Vehicle
        </Button>
        <Button className="bg-secondary hover:bg-secondary/80">
          Flag Violence Agn Police
        </Button>
        <Button className="bg-destructive hover:bg-destructive/80">
          CLEAR Criminal Warrants
        </Button>
        
        <Button className="bg-secondary hover:bg-secondary/80">
          CLEAR Active Bails
        </Button>
        <Button className="bg-secondary hover:bg-secondary/80">
          Revoke Mobility Aid
        </Button>
      </div>
      
      <div className="mb-6 bg-card border border-border p-4 rounded-md">
        <h3 className="text-destructive mb-2">Warrant</h3>
        <div className="bg-red-900/20 border border-red-900/30 p-3 rounded mb-4">
          <p className="text-sm text-red-400 mb-1">
            <strong>1:1 Outstanding Warrant E-Warrant ID | or Wanted for Questioning</strong> (Vehicle Details Only, Suspect Visual Description) (#)
          </p>
          <p className="text-xs text-red-300">
            Type of Charges
          </p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-red-400 mb-1">Report Details:</h4>
          <Textarea 
            placeholder="Your report should contain sufficient information for police who come across the individual to not only have a reasonable basis to pick up and pursue the matter further (including any Magistrate hearing that might result), but also sufficient to enable them to identify the individual (eg. identifying features, known addresses, known associates, known hangouts, etc.)."
            className="h-32 bg-black/50 border-red-900/30 text-white placeholder:text-red-900/60"
            value={reportDetails}
            onChange={(e) => setReportDetails(e.target.value)}
          />
        </div>
        
        <Button 
          className="bg-destructive hover:bg-destructive/80"
          onClick={handleAddWarrant}
        >
          Add Warrant
        </Button>
      </div>
    </div>
  );
};

export default Actions;
