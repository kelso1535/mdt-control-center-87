
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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

  // Fields for person management
  const [personId, setPersonId] = useState('');
  const [personName, setPersonName] = useState('');
  const [personFlags, setPersonFlags] = useState({
    wanted: false,
    bail: false,
    possessWeapon: false,
    violencePolice: false,
    violence: false
  });

  // Fields for vehicle management
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleOwner, setVehicleOwner] = useState('');
  const [vehicleFlags, setVehicleFlags] = useState({
    stolen: false,
    wanted: false
  });

  // Fields for serial management
  const [serialNumber, setSerialNumber] = useState('');
  const [serialType, setSerialType] = useState('');
  const [serialOwner, setSerialOwner] = useState('');
  const [serialFlags, setSerialFlags] = useState({
    stolen: false,
    wanted: false
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

  const handleUpdatePerson = () => {
    if (!personId || !personName) {
      toast.error('Please enter person ID and name');
      return;
    }
    toast.success(`Person record for ${personName} updated successfully`);
    setPersonId('');
    setPersonName('');
    setPersonFlags({
      wanted: false,
      bail: false,
      possessWeapon: false,
      violencePolice: false,
      violence: false
    });
  };

  const handleUpdateVehicle = () => {
    if (!vehiclePlate || !vehicleModel || !vehicleOwner) {
      toast.error('Please fill all vehicle fields');
      return;
    }
    toast.success(`Vehicle record for ${vehiclePlate} updated successfully`);
    setVehiclePlate('');
    setVehicleModel('');
    setVehicleOwner('');
    setVehicleFlags({
      stolen: false,
      wanted: false
    });
  };

  const handleUpdateSerial = () => {
    if (!serialNumber || !serialType || !serialOwner) {
      toast.error('Please fill all serial fields');
      return;
    }
    toast.success(`Serial record ${serialNumber} updated successfully`);
    setSerialNumber('');
    setSerialType('');
    setSerialOwner('');
    setSerialFlags({
      stolen: false,
      wanted: false
    });
  };

  const handleClearHistory = () => {
    toast.success('Search history cleared successfully');
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
      
      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="serials">Serials</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
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
        </TabsContent>
        
        <TabsContent value="people">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
              Manage Person Records
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Person ID
                </label>
                <Input 
                  value={personId}
                  onChange={(e) => setPersonId(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter person ID"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Full Name
                </label>
                <Input 
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter person name"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-[hsl(var(--police-blue))] font-medium mb-2">Person Flags</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="flag-wanted"
                    checked={personFlags.wanted}
                    onCheckedChange={(checked) => setPersonFlags({...personFlags, wanted: checked})}
                  />
                  <Label htmlFor="flag-wanted">Wanted</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="flag-bail"
                    checked={personFlags.bail}
                    onCheckedChange={(checked) => setPersonFlags({...personFlags, bail: checked})}
                  />
                  <Label htmlFor="flag-bail">Bail</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="flag-possessWeapon"
                    checked={personFlags.possessWeapon}
                    onCheckedChange={(checked) => setPersonFlags({...personFlags, possessWeapon: checked})}
                  />
                  <Label htmlFor="flag-possessWeapon">Possess Weapon</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="flag-violencePolice"
                    checked={personFlags.violencePolice}
                    onCheckedChange={(checked) => setPersonFlags({...personFlags, violencePolice: checked})}
                  />
                  <Label htmlFor="flag-violencePolice">Violence Against Police</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="flag-violence"
                    checked={personFlags.violence}
                    onCheckedChange={(checked) => setPersonFlags({...personFlags, violence: checked})}
                  />
                  <Label htmlFor="flag-violence">Violence</Label>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleUpdatePerson}
              className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
            >
              Update Person Record
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="vehicles">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
              Manage Vehicle Records
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  License Plate
                </label>
                <Input 
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter license plate"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Vehicle Model
                </label>
                <Input 
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter vehicle model"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Owner Name
                </label>
                <Input 
                  value={vehicleOwner}
                  onChange={(e) => setVehicleOwner(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter owner name"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-[hsl(var(--police-blue))] font-medium mb-2">Vehicle Flags</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="vehicle-flag-stolen"
                    checked={vehicleFlags.stolen}
                    onCheckedChange={(checked) => setVehicleFlags({...vehicleFlags, stolen: checked})}
                  />
                  <Label htmlFor="vehicle-flag-stolen">Stolen</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="vehicle-flag-wanted"
                    checked={vehicleFlags.wanted}
                    onCheckedChange={(checked) => setVehicleFlags({...vehicleFlags, wanted: checked})}
                  />
                  <Label htmlFor="vehicle-flag-wanted">Wanted</Label>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleUpdateVehicle}
              className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
            >
              Update Vehicle Record
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="serials">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
              Manage Serial Records
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Serial Number
                </label>
                <Input 
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter serial number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Serial Type
                </label>
                <Select 
                  value={serialType}
                  onValueChange={(value) => setSerialType(value)}
                >
                  <SelectTrigger className="bg-black/50 border-border text-white">
                    <SelectValue placeholder="Select serial type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Firearm">Firearm</SelectItem>
                    <SelectItem value="Vehicle">Vehicle</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Owner Name
                </label>
                <Input 
                  value={serialOwner}
                  onChange={(e) => setSerialOwner(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter owner name"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-[hsl(var(--police-blue))] font-medium mb-2">Serial Flags</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="serial-flag-stolen"
                    checked={serialFlags.stolen}
                    onCheckedChange={(checked) => setSerialFlags({...serialFlags, stolen: checked})}
                  />
                  <Label htmlFor="serial-flag-stolen">Stolen</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="serial-flag-wanted"
                    checked={serialFlags.wanted}
                    onCheckedChange={(checked) => setSerialFlags({...serialFlags, wanted: checked})}
                  />
                  <Label htmlFor="serial-flag-wanted">Wanted</Label>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleUpdateSerial}
              className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
            >
              Update Serial Record
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="system">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
              System Maintenance
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[hsl(var(--police-blue))] font-medium mb-3">Clear Search History</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  This will clear all search history records from the database.
                </p>
                <Button 
                  onClick={handleClearHistory}
                  variant="destructive"
                >
                  Clear All Search History
                </Button>
              </div>
              
              <div>
                <h4 className="text-[hsl(var(--police-blue))] font-medium mb-3">Database Backup</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a backup of the entire MDT database.
                </p>
                <Button 
                  onClick={() => toast.success('Database backup created successfully')}
                  className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
                >
                  Create Database Backup
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
