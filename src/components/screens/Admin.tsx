
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Template {
  id: string;
  name: string;
  section1: string;
  section2: string;
  type: string;
}

const Admin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 'template1',
      name: 'Pursuit Template',
      type: 'Warrant',
      section1: 'Outstanding Warrant for Questioning - FIRSTNAME LASTNAME\n\nList of Charges and/or PINS:\n- Engage in a Police pursuit / Evade Police',
      section2: 'Preliminary Details\nTime: xxxx HRS\nDate: xx/xx/20\n\nWarrant Details:\n[CALL SIGN] signalled for [VEHICLE DESCRIPTION] to stop. The driver of the vehicle deliberately increased their speed and engaged in a police pursuit. The vehicle was successful in evading police. The registered owner of the vehicle is [REGISTERED OWNER\'S NAME] and the vehicle was NOT listed as stolen at the time of the pursuit. The accused is required to provide evidence of the driver at the time of the incident or they are to be charged with the above charges as the registered owner of the vehicle.\n\nEvidence:\nEvidence Locker: \n\n- Example: Highway Patrol Radar Print Out\n\nANPR Hits:\nIf applicable - to be copied from your MDT\n\nVicRoads Profile:\nTo be copied and pasted after running a vehicle check on the license plate\n\nSigned,\nFIRSTNAME LASTNAME\nRank | Callsign\nVictoria Police'
    },
    {
      id: 'template2',
      name: 'Stolen Weapon Template',
      type: 'Serial# KALOF',
      section1: 'SERIAL KALOF - Reported stolen\n\nCHARGES: \n-Robbery\n-Possess a [Class A / B / C] firearm without legal authority',
      section2: 'Preliminary Details:\nTime: xxxx HRS\nDate: xx/xx/20\n\nAt Approx. [TIME]hrs [CALL SIGN] responded to a 000 call in relation to a stolen weapon. After discussing with [REGISTERED OWNER], it was ascertained that they had complied with their weapons license and had their [Weapon type] stolen by an individual, [NAME|DESCRIPTION|UNKOWN]. \n\n[Serial information to be Copy and Pasted here]\n\nWhoever is found in possession of this firearm is to be charged with the above offence(s) and any others attached to this firearm serial.'
    }
  ]);

  const [newTemplate, setNewTemplate] = useState<Omit<Template, 'id'>>({
    name: '',
    type: 'Warrant',
    section1: '',
    section2: ''
  });

  const [citizenId, setCitizenId] = useState('');
  const [fineAmount, setFineAmount] = useState('');
  const [fineReason, setFineReason] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleAuthenticate = () => {
    // In a real implementation, we would check against Config.AdminPassword
    // But for this frontend component, we'll just simulate authentication
    if (password === 'admin123') {
      setAuthenticated(true);
      toast.success('Admin authentication successful');
    } else {
      toast.error('Invalid admin password');
    }
  };

  const handleAddTemplate = () => {
    if (!newTemplate.name || !newTemplate.section1 || !newTemplate.section2) {
      toast.error('Please fill all template fields');
      return;
    }

    const newTemplateWithId = {
      ...newTemplate,
      id: `template${Date.now()}`
    };

    setTemplates([...templates, newTemplateWithId]);
    setNewTemplate({
      name: '',
      type: 'Warrant',
      section1: '',
      section2: ''
    });

    toast.success('Template added successfully');
  };

  const handleEditTemplate = (template: Template) => {
    setNewTemplate({
      name: template.name,
      type: template.type,
      section1: template.section1,
      section2: template.section2
    });
    setSelectedTemplate(template.id);
    setEditMode(true);
  };

  const handleUpdateTemplate = () => {
    if (!selectedTemplate) return;

    const updatedTemplates = templates.map(template => 
      template.id === selectedTemplate 
        ? { ...template, ...newTemplate } 
        : template
    );

    setTemplates(updatedTemplates);
    setNewTemplate({
      name: '',
      type: 'Warrant',
      section1: '',
      section2: ''
    });
    setSelectedTemplate(null);
    setEditMode(false);
    toast.success('Template updated successfully');
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
    toast.success('Template deleted successfully');
  };

  const handleIssueFine = () => {
    if (!citizenId || !fineAmount || !fineReason) {
      toast.error('Please fill all fine fields');
      return;
    }

    // In a real implementation, we would send this to the server
    toast.success(`Fine of $${fineAmount} issued to ${citizenId} for ${fineReason}`);
    setCitizenId('');
    setFineAmount('');
    setFineReason('');
  };

  if (!authenticated) {
    return (
      <div className="fade-in p-4">
        <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-6">Admin Authentication</h2>
        
        <div className="bg-card/30 border border-border rounded-md p-6 max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
              Admin Password
            </label>
            <Input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border-border text-white"
              placeholder="Enter admin password"
            />
          </div>
          
          <Button 
            onClick={handleAuthenticate}
            className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
          >
            Authenticate
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-3">Admin Panel</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Template Management */}
        <div className="bg-card/30 border border-border rounded-md p-4">
          <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
            {editMode ? 'Edit Template' : 'Add New Template'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                Template Name
              </label>
              <Input 
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                className="bg-black/50 border-border text-white"
                placeholder="Enter template name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                Template Type
              </label>
              <Select 
                value={newTemplate.type}
                onValueChange={(value) => setNewTemplate({...newTemplate, type: value})}
              >
                <SelectTrigger className="bg-black/50 border-border text-white">
                  <SelectValue placeholder="Select template type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arrest Report">Arrest Report</SelectItem>
                  <SelectItem value="Warrant">Warrant</SelectItem>
                  <SelectItem value="Serial# KALOF">Serial# KALOF</SelectItem>
                  <SelectItem value="Field Contact Report">Field Contact Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                Section 1 Content
              </label>
              <Textarea 
                value={newTemplate.section1}
                onChange={(e) => setNewTemplate({...newTemplate, section1: e.target.value})}
                className="h-32 bg-black/50 border-border text-white"
                placeholder="Enter template section 1 content"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                Section 2 Content
              </label>
              <Textarea 
                value={newTemplate.section2}
                onChange={(e) => setNewTemplate({...newTemplate, section2: e.target.value})}
                className="h-32 bg-black/50 border-border text-white"
                placeholder="Enter template section 2 content"
              />
            </div>
            
            <div>
              {editMode ? (
                <div className="flex gap-2">
                  <Button 
                    onClick={handleUpdateTemplate}
                    className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
                  >
                    Update Template
                  </Button>
                  <Button 
                    onClick={() => {
                      setEditMode(false);
                      setSelectedTemplate(null);
                      setNewTemplate({
                        name: '',
                        type: 'Warrant',
                        section1: '',
                        section2: ''
                      });
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleAddTemplate}
                  className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
                >
                  Add Template
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Issue Fines */}
        <div className="bg-card/30 border border-border rounded-md p-4">
          <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
            Issue Fine
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                Citizen ID
              </label>
              <Input 
                value={citizenId}
                onChange={(e) => setCitizenId(e.target.value)}
                className="bg-black/50 border-border text-white"
                placeholder="Enter citizen ID"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                Fine Amount
              </label>
              <Input 
                type="number"
                value={fineAmount}
                onChange={(e) => setFineAmount(e.target.value)}
                className="bg-black/50 border-border text-white"
                placeholder="Enter fine amount"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                Reason
              </label>
              <Textarea 
                value={fineReason}
                onChange={(e) => setFineReason(e.target.value)}
                className="h-24 bg-black/50 border-border text-white"
                placeholder="Enter fine reason"
              />
            </div>
            
            <Button 
              onClick={handleIssueFine}
              className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
            >
              Issue Fine
            </Button>
          </div>
        </div>
      </div>
      
      {/* Template List */}
      <div className="mt-6 bg-card/30 border border-border rounded-md p-4">
        <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
          Template List
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="text-police-blue py-2 px-2">Name</th>
                <th className="text-police-blue py-2 px-2">Type</th>
                <th className="text-police-blue py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr key={template.id} className="border-b border-border/30">
                  <td className="py-2 px-2 text-police-blue">{template.name}</td>
                  <td className="py-2 px-2 text-police-blue">{template.type}</td>
                  <td className="py-2 px-2">
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleEditTemplate(template)}
                        variant="outline" 
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button 
                        onClick={() => handleDeleteTemplate(template.id)}
                        variant="destructive" 
                        size="sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
