
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ReportType = 'Arrest Report' | 'Warrant' | 'Serial# KALOF' | 'Field Contact Report';

const Actions: React.FC = () => {
  const [reportType, setReportType] = useState<ReportType>('Arrest Report');
  const [section1Text, setSection1Text] = useState('');
  const [section2Text, setSection2Text] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const handleAddReport = () => {
    if (!section1Text.trim() || !section2Text.trim()) {
      toast.error('Please complete both sections of the report');
      return;
    }
    if (reportType === 'Serial# KALOF' && !serialNumber.trim()) {
      toast.error('Please enter a serial number');
      return;
    }
    toast.success(`${reportType} added successfully`);
    setSection1Text('');
    setSection2Text('');
    setSerialNumber('');
  };

  const loadPursuitTemplate = () => {
    setReportType('Warrant');
    setSection1Text('Outstanding Warrant for Questioning - FIRSTNAME LASTNAME\n\nList of Charges and/or PINS:\n- Engage in a Police pursuit / Evade Police');
    setSection2Text('Preliminary Details\nTime: xxxx HRS\nDate: xx/xx/20\n\nWarrant Details:\n[CALL SIGN] signalled for [VEHICLE DESCRIPTION] to stop. The driver of the vehicle deliberately increased their speed and engaged in a police pursuit. The vehicle was successful in evading police. The registered owner of the vehicle is [REGISTERED OWNER\'S NAME] and the vehicle was NOT listed as stolen at the time of the pursuit. The accused is required to provide evidence of the driver at the time of the incident or they are to be charged with the above charges as the registered owner of the vehicle.\n\nEvidence:\nEvidence Locker: \n\n- Example: Highway Patrol Radar Print Out\n\nANPR Hits:\nIf applicable - to be copied from your MDT\n\nVicRoads Profile:\nTo be copied and pasted after running a vehicle check on the license plate\n\nSigned,\nFIRSTNAME LASTNAME\nRank | Callsign\nVictoria Police');
  };

  const loadStolenWeaponTemplate = () => {
    setReportType('Serial# KALOF');
    setSection1Text('SERIAL KALOF - Reported stolen\n\nCHARGES: \n-Robbery\n-Possess a [Class A / B / C] firearm without legal authority');
    setSection2Text('Preliminary Details:\nTime: xxxx HRS\nDate: xx/xx/20\n\nAt Approx. [TIME]hrs [CALL SIGN] responded to a 000 call in relation to a stolen weapon. After discussing with [REGISTERED OWNER], it was ascertained that they had complied with their weapons license and had their [Weapon type] stolen by an individual, [NAME|DESCRIPTION|UNKNOWN]. \n\n[Serial information to be Copy and Pasted here]\n\nWhoever is found in possession of this firearm is to be charged with the above offence(s) and any others attached to this firearm serial.');
    setSerialNumber(''); // Clear the serial number field when loading the template
  };

  return <div className="fade-in">
      <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-3">Police Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-5">
        <Button className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white text-xs h-auto py-1.5 px-2 min-h-[2.5rem] whitespace-normal text-left">
          Toggle Suspend Driver's Licence
        </Button>
        <Button className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white text-xs h-auto py-1.5 px-2 min-h-[2.5rem] whitespace-normal text-left">Toggle Stolen Weapon</Button>
        <Button className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white text-xs h-auto py-1.5 px-2 min-h-[2.5rem] whitespace-normal text-left">
          Revoke Weapon Licence
        </Button>
        
        <Button className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white text-xs h-auto py-1.5 px-2 min-h-[2.5rem] whitespace-normal text-left">
          Flag Weapons
        </Button>
        <Button className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white text-xs h-auto py-1.5 px-2 min-h-[2.5rem] whitespace-normal text-left">
          Toggle Stolen Weapon
        </Button>
        <Button className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white text-xs h-auto py-1.5 px-2 min-h-[2.5rem] whitespace-normal text-left">
          Flag Violence
        </Button>
        
        <Button className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white text-xs h-auto py-1.5 px-2 min-h-[2.5rem] whitespace-normal text-left">
          Toggle Stolen Vehicle
        </Button>
        <Button className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white text-xs h-auto py-1.5 px-2 min-h-[2.5rem] whitespace-normal text-left">
          Flag Violence Agn Police
        </Button>
        <Button className="bg-destructive hover:bg-destructive/80 text-white text-xs h-auto py-1.5 px-2 min-h-[2.5rem] whitespace-normal text-left">
          CLEAR Criminal Warrants
        </Button>
      </div>
      
      <div className="mb-3 flex justify-between items-center">
        <div className="flex-1">
          <Select onValueChange={(value) => {
            if (value === 'pursuit') loadPursuitTemplate();
            else if (value === 'weapon') loadStolenWeaponTemplate();
          }}>
            <SelectTrigger className="w-[220px] bg-[hsl(var(--police-blue))] text-white border-[hsl(var(--police-blue))]/50">
              <SelectValue placeholder="Select Template" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-[hsl(var(--police-blue))]/30">
              <SelectItem value="pursuit">Pursuit Template</SelectItem>
              <SelectItem value="weapon">Stolen Weapon Template</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm text-[hsl(var(--police-blue))] mr-2">Report Type:</span>
          <Select 
            value={reportType} 
            onValueChange={(value) => setReportType(value as ReportType)}
          >
            <SelectTrigger className="w-[180px] bg-black/50 border-[hsl(var(--police-blue))]/30">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-[hsl(var(--police-blue))]/30">
              <SelectItem value="Arrest Report">Arrest Report</SelectItem>
              <SelectItem value="Warrant">Warrant</SelectItem>
              <SelectItem value="Serial# KALOF">Serial# KALOF</SelectItem>
              <SelectItem value="Field Contact Report">Field Contact Report</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="bg-card/30 border border-[hsl(var(--police-blue))]/20 p-4 rounded-md">
        {reportType === 'Serial# KALOF' && (
          <div className="mb-4">
            <label className="text-[hsl(var(--police-blue))] block mb-2">Serial Number:</label>
            <Input 
              placeholder="Enter the serial number..." 
              className="bg-black/50 border-[hsl(var(--police-blue))]/30 text-white" 
              value={serialNumber} 
              onChange={e => setSerialNumber(e.target.value)} 
            />
          </div>
        )}
        
        <div className="mb-4">
          <h3 className="text-[hsl(var(--police-blue))] mb-2">Section 1 - {reportType}</h3>
          <Textarea 
            placeholder="Enter details for Section 1..." 
            className="h-32 bg-black/50 border-[hsl(var(--police-blue))]/30 text-white" 
            value={section1Text} 
            onChange={e => setSection1Text(e.target.value)} 
          />
        </div>
        
        <div className="mb-4">
          <h3 className="text-[hsl(var(--police-blue))] mb-2">Section 2 - Report Details</h3>
          <Textarea 
            placeholder="Enter detailed information for Section 2..." 
            className="h-48 bg-black/50 border-[hsl(var(--police-blue))]/30 text-white" 
            value={section2Text} 
            onChange={e => setSection2Text(e.target.value)} 
          />
        </div>
        
        <div>
          <Button 
            className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
            onClick={handleAddReport}
          >
            Submit Report
          </Button>
        </div>
      </div>
    </div>;
};

export default Actions;
