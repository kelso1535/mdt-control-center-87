
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CourtCase } from '@/types';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gavel, Calendar, User, FileText } from 'lucide-react';

interface CourtCasesProps {
  userRole: 'officer' | 'magistrate';
  callsign: string;
}

const CourtCases: React.FC<CourtCasesProps> = ({ userRole, callsign }) => {
  const [cases, setCases] = useState<CourtCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCase, setNewCase] = useState<Partial<CourtCase>>({
    title: '',
    description: '',
    date: null,
    time: null,
    status: 'pending',
    prosecutor: callsign,
    defendant: '',
    charges: [],
    witnesses: [],
    evidence: [],
    notes: '',
  });
  const [availableDates, setAvailableDates] = useState<{date: string, magistrate: string}[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [newCharge, setNewCharge] = useState('');
  const [newWitness, setNewWitness] = useState('');
  const [newEvidence, setNewEvidence] = useState('');
  const [verdict, setVerdict] = useState('');
  const [sentence, setSentence] = useState('');

  // Simulated fetch for now
  useEffect(() => {
    // This would be replaced with an actual fetch from the server
    setTimeout(() => {
      const mockCases: CourtCase[] = [
        {
          id: '1',
          title: 'State vs. John Doe',
          description: 'Charges related to vehicle theft and evading police',
          date: '2023-12-15',
          time: '14:00',
          status: 'scheduled',
          createdBy: 'Officer Smith',
          prosecutor: 'Officer Johnson',
          defendant: 'John Doe',
          charges: ['Grand Theft Auto', 'Evading Police'],
          witnesses: ['Officer Wilson', 'Civilian Jane Smith'],
          evidence: ['Dashcam footage', 'CCTV recording'],
          notes: 'Suspect was apprehended after a brief chase',
        },
        {
          id: '2',
          title: 'State vs. Jane Smith',
          description: 'Illegal weapon possession',
          date: null,
          time: null,
          status: 'pending',
          createdBy: 'Officer Davis',
          prosecutor: 'Officer Williams',
          defendant: 'Jane Smith',
          charges: ['Possession of Illegal Firearm'],
          witnesses: ['Officer Davis'],
          evidence: ['Weapon', 'Body cam footage'],
          notes: 'Weapon was found during a routine traffic stop',
        }
      ];
      
      const mockAvailableDates = [
        { date: '2023-12-20 14:00-16:00', magistrate: 'Judge Anderson' },
        { date: '2023-12-22 10:00-12:00', magistrate: 'Judge Wilson' },
        { date: '2023-12-27 13:00-15:00', magistrate: 'Judge Thompson' },
      ];
      
      setCases(mockCases);
      setAvailableDates(mockAvailableDates);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateCase = () => {
    // This would send data to the server
    if (!newCase.title || !newCase.defendant || !newCase.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const caseId = `case-${Date.now()}`;
    const createdCase: CourtCase = {
      id: caseId,
      title: newCase.title || '',
      description: newCase.description || '',
      date: newCase.date,
      time: newCase.time,
      status: 'pending',
      createdBy: callsign,
      prosecutor: newCase.prosecutor || callsign,
      defendant: newCase.defendant || '',
      charges: newCase.charges || [],
      witnesses: newCase.witnesses || [],
      evidence: newCase.evidence || [],
      notes: newCase.notes || '',
    };
    
    setCases([...cases, createdCase]);
    toast.success('Court case created successfully');
    
    // Reset form
    setNewCase({
      title: '',
      description: '',
      date: null,
      time: null,
      status: 'pending',
      prosecutor: callsign,
      defendant: '',
      charges: [],
      witnesses: [],
      evidence: [],
      notes: '',
    });
  };

  const handleScheduleCase = (caseId: string, dateInfo: string) => {
    // Parse date info and update case
    const [date, time] = dateInfo.split(' ')[0];
    const updatedCases = cases.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          date,
          time: time.split('-')[0],
          status: 'scheduled'
        };
      }
      return c;
    });
    
    setCases(updatedCases);
    toast.success('Case scheduled successfully');
  };

  const handleAddCharge = () => {
    if (!newCharge.trim()) return;
    setNewCase({
      ...newCase,
      charges: [...(newCase.charges || []), newCharge.trim()]
    });
    setNewCharge('');
  };

  const handleAddWitness = () => {
    if (!newWitness.trim()) return;
    setNewCase({
      ...newCase,
      witnesses: [...(newCase.witnesses || []), newWitness.trim()]
    });
    setNewWitness('');
  };

  const handleAddEvidence = () => {
    if (!newEvidence.trim()) return;
    setNewCase({
      ...newCase,
      evidence: [...(newCase.evidence || []), newEvidence.trim()]
    });
    setNewEvidence('');
  };

  const handleCaseVerdict = (caseId: string) => {
    if (!verdict.trim()) {
      toast.error('Please enter a verdict');
      return;
    }
    
    const updatedCases = cases.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          verdict,
          sentence,
          status: 'completed'
        };
      }
      return c;
    });
    
    setCases(updatedCases);
    toast.success('Verdict recorded successfully');
    setVerdict('');
    setSentence('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold flex items-center">
          <Gavel className="mr-2 h-5 w-5" />
          COURT CASES
        </h2>
        
        {userRole === 'officer' && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80">
                Create New Case
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card/95 backdrop-blur-sm border-[hsl(var(--police-blue))]/20 text-card-foreground max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-[hsl(var(--police-blue))]">Create New Court Case</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new court case.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[hsl(var(--police-blue))]">Case Title</label>
                    <Input 
                      value={newCase.title} 
                      onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                      placeholder="State vs. Name"
                      className="bg-card/50 border-[hsl(var(--police-blue))]/30"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-[hsl(var(--police-blue))]">Defendant</label>
                    <Input 
                      value={newCase.defendant} 
                      onChange={(e) => setNewCase({...newCase, defendant: e.target.value})}
                      placeholder="Defendant name"
                      className="bg-card/50 border-[hsl(var(--police-blue))]/30"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-[hsl(var(--police-blue))]">Prosecutor</label>
                    <Input 
                      value={newCase.prosecutor} 
                      onChange={(e) => setNewCase({...newCase, prosecutor: e.target.value})}
                      placeholder="Prosecutor name"
                      className="bg-card/50 border-[hsl(var(--police-blue))]/30"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-[hsl(var(--police-blue))]">Description</label>
                    <Textarea 
                      value={newCase.description} 
                      onChange={(e) => setNewCase({...newCase, description: e.target.value})}
                      placeholder="Brief description of the case"
                      className="bg-card/50 border-[hsl(var(--police-blue))]/30 h-20"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[hsl(var(--police-blue))]">Charges</label>
                    <div className="flex space-x-2">
                      <Input 
                        value={newCharge} 
                        onChange={(e) => setNewCharge(e.target.value)}
                        placeholder="Add charge"
                        className="bg-card/50 border-[hsl(var(--police-blue))]/30 flex-1"
                      />
                      <Button 
                        onClick={handleAddCharge}
                        className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="mt-2 space-y-1 max-h-20 overflow-y-auto">
                      {newCase.charges && newCase.charges.map((charge, index) => (
                        <div key={index} className="text-sm px-2 py-1 bg-[hsl(var(--police-blue))]/10 rounded">
                          {charge}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-[hsl(var(--police-blue))]">Witnesses</label>
                    <div className="flex space-x-2">
                      <Input 
                        value={newWitness} 
                        onChange={(e) => setNewWitness(e.target.value)}
                        placeholder="Add witness"
                        className="bg-card/50 border-[hsl(var(--police-blue))]/30 flex-1"
                      />
                      <Button 
                        onClick={handleAddWitness}
                        className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="mt-2 space-y-1 max-h-20 overflow-y-auto">
                      {newCase.witnesses && newCase.witnesses.map((witness, index) => (
                        <div key={index} className="text-sm px-2 py-1 bg-[hsl(var(--police-blue))]/10 rounded">
                          {witness}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-[hsl(var(--police-blue))]">Evidence</label>
                    <div className="flex space-x-2">
                      <Input 
                        value={newEvidence} 
                        onChange={(e) => setNewEvidence(e.target.value)}
                        placeholder="Add evidence"
                        className="bg-card/50 border-[hsl(var(--police-blue))]/30 flex-1"
                      />
                      <Button 
                        onClick={handleAddEvidence}
                        className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="mt-2 space-y-1 max-h-20 overflow-y-auto">
                      {newCase.evidence && newCase.evidence.map((item, index) => (
                        <div key={index} className="text-sm px-2 py-1 bg-[hsl(var(--police-blue))]/10 rounded">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="text-sm font-medium text-[hsl(var(--police-blue))]">Notes</label>
                <Textarea 
                  value={newCase.notes} 
                  onChange={(e) => setNewCase({...newCase, notes: e.target.value})}
                  placeholder="Additional notes"
                  className="bg-card/50 border-[hsl(var(--police-blue))]/30 h-20"
                />
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleCreateCase}
                  className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80"
                >
                  Create Case
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {cases.map(courtCase => (
          <div 
            key={courtCase.id} 
            className="border border-[hsl(var(--police-blue))]/20 bg-card/20 rounded-md p-4 hover:bg-card/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-[hsl(var(--police-blue))]">{courtCase.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                courtCase.status === 'scheduled' ? 'bg-amber-500/20 text-amber-400' :
                courtCase.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                courtCase.status === 'dismissed' ? 'bg-red-500/20 text-red-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {courtCase.status.toUpperCase()}
              </span>
            </div>
            
            <div className="text-sm mb-3 text-muted-foreground">{courtCase.description}</div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="flex items-center text-xs">
                <User className="h-3 w-3 mr-1 text-[hsl(var(--police-blue))]" />
                <span>Defendant: {courtCase.defendant}</span>
              </div>
              
              <div className="flex items-center text-xs">
                <User className="h-3 w-3 mr-1 text-[hsl(var(--police-blue))]" />
                <span>Prosecutor: {courtCase.prosecutor}</span>
              </div>
              
              {courtCase.date && (
                <div className="flex items-center text-xs">
                  <Calendar className="h-3 w-3 mr-1 text-[hsl(var(--police-blue))]" />
                  <span>Date: {courtCase.date} {courtCase.time}</span>
                </div>
              )}
              
              <div className="flex items-center text-xs">
                <FileText className="h-3 w-3 mr-1 text-[hsl(var(--police-blue))]" />
                <span>Charges: {courtCase.charges.length}</span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card/95 backdrop-blur-sm border-[hsl(var(--police-blue))]/20 text-card-foreground max-w-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-[hsl(var(--police-blue))]">{courtCase.title}</DialogTitle>
                    <DialogDescription>
                      {courtCase.status.toUpperCase()} - Created by {courtCase.createdBy}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-[hsl(var(--police-blue))] mb-2">Case Details</h4>
                      <div className="space-y-2">
                        <div className="text-sm"><span className="font-medium">Defendant:</span> {courtCase.defendant}</div>
                        <div className="text-sm"><span className="font-medium">Prosecutor:</span> {courtCase.prosecutor}</div>
                        <div className="text-sm"><span className="font-medium">Status:</span> {courtCase.status}</div>
                        {courtCase.date && (
                          <div className="text-sm"><span className="font-medium">Scheduled:</span> {courtCase.date} at {courtCase.time}</div>
                        )}
                        <div className="text-sm"><span className="font-medium">Description:</span> {courtCase.description}</div>
                      </div>
                      
                      {courtCase.verdict && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-[hsl(var(--police-blue))] mb-2">Verdict</h4>
                          <div className="text-sm">{courtCase.verdict}</div>
                          <h4 className="text-sm font-medium text-[hsl(var(--police-blue))] mt-2 mb-2">Sentence</h4>
                          <div className="text-sm">{courtCase.sentence}</div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-[hsl(var(--police-blue))] mb-2">Charges</h4>
                      <div className="space-y-1 mb-4">
                        {courtCase.charges.map((charge, index) => (
                          <div key={index} className="text-sm px-2 py-1 bg-[hsl(var(--police-blue))]/10 rounded">
                            {charge}
                          </div>
                        ))}
                      </div>
                      
                      <h4 className="text-sm font-medium text-[hsl(var(--police-blue))] mb-2">Witnesses</h4>
                      <div className="space-y-1 mb-4">
                        {courtCase.witnesses.map((witness, index) => (
                          <div key={index} className="text-sm px-2 py-1 bg-[hsl(var(--police-blue))]/10 rounded">
                            {witness}
                          </div>
                        ))}
                      </div>
                      
                      <h4 className="text-sm font-medium text-[hsl(var(--police-blue))] mb-2">Evidence</h4>
                      <div className="space-y-1">
                        {courtCase.evidence.map((item, index) => (
                          <div key={index} className="text-sm px-2 py-1 bg-[hsl(var(--police-blue))]/10 rounded">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-[hsl(var(--police-blue))] mb-2">Notes</h4>
                    <div className="text-sm bg-[hsl(var(--police-blue))]/5 p-2 rounded">
                      {courtCase.notes}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {userRole === 'officer' && courtCase.status === 'pending' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="text-xs h-8 bg-amber-500 hover:bg-amber-600">
                      Request Court Date
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card/95 backdrop-blur-sm border-[hsl(var(--police-blue))]/20 text-card-foreground">
                    <DialogHeader>
                      <DialogTitle className="text-[hsl(var(--police-blue))]">Request Court Date</DialogTitle>
                      <DialogDescription>
                        Select from available magistrate slots
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 mt-2">
                      <p className="text-sm">Available dates:</p>
                      <div className="space-y-2">
                        {availableDates.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-[hsl(var(--police-blue))]/10 rounded">
                            <div>
                              <div className="font-medium">{item.date}</div>
                              <div className="text-xs text-muted-foreground">{item.magistrate}</div>
                            </div>
                            <Button 
                              size="sm"
                              onClick={() => handleScheduleCase(courtCase.id, item.date)}
                              className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80"
                            >
                              Select
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              
              {userRole === 'magistrate' && courtCase.status === 'scheduled' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="text-xs h-8 bg-green-500 hover:bg-green-600">
                      Record Verdict
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card/95 backdrop-blur-sm border-[hsl(var(--police-blue))]/20 text-card-foreground">
                    <DialogHeader>
                      <DialogTitle className="text-[hsl(var(--police-blue))]">Record Verdict</DialogTitle>
                      <DialogDescription>
                        Enter the verdict and sentencing details
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 mt-2">
                      <div>
                        <label className="text-sm font-medium text-[hsl(var(--police-blue))]">Verdict</label>
                        <Input 
                          value={verdict} 
                          onChange={(e) => setVerdict(e.target.value)}
                          placeholder="e.g., Guilty, Not Guilty, etc."
                          className="bg-card/50 border-[hsl(var(--police-blue))]/30"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-[hsl(var(--police-blue))]">Sentence (if applicable)</label>
                        <Textarea 
                          value={sentence} 
                          onChange={(e) => setSentence(e.target.value)}
                          placeholder="Enter sentencing details"
                          className="bg-card/50 border-[hsl(var(--police-blue))]/30 h-32"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button 
                          onClick={() => handleCaseVerdict(courtCase.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Submit Verdict
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {cases.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No court cases found</p>
        </div>
      )}
    </div>
  );
};

export default CourtCases;
