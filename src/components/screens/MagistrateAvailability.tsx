
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MagistrateAvailability as Availability } from '@/types';
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
import { Calendar, Clock, Trash2 } from 'lucide-react';

interface MagistrateAvailabilityProps {
  callsign: string;
}

const MagistrateAvailability: React.FC<MagistrateAvailabilityProps> = ({ callsign }) => {
  const [availability, setAvailability] = useState<Availability[]>([
    {
      id: '1',
      magistrateName: callsign,
      date: '2023-12-20',
      startTime: '14:00',
      endTime: '16:00',
      notes: 'Available for all case types'
    },
    {
      id: '2',
      magistrateName: callsign,
      date: '2023-12-27',
      startTime: '10:00',
      endTime: '12:00',
      notes: 'Priority for urgent cases'
    }
  ]);
  
  const [newAvailability, setNewAvailability] = useState<Partial<Availability>>({
    magistrateName: callsign,
    date: '',
    startTime: '',
    endTime: '',
    notes: ''
  });

  const handleAddAvailability = () => {
    if (!newAvailability.date || !newAvailability.startTime || !newAvailability.endTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const availabilityId = `avail-${Date.now()}`;
    const newEntry: Availability = {
      id: availabilityId,
      magistrateName: callsign,
      date: newAvailability.date || '',
      startTime: newAvailability.startTime || '',
      endTime: newAvailability.endTime || '',
      notes: newAvailability.notes || ''
    };
    
    setAvailability([...availability, newEntry]);
    toast.success('Availability added successfully');
    
    // Reset form
    setNewAvailability({
      magistrateName: callsign,
      date: '',
      startTime: '',
      endTime: '',
      notes: ''
    });
  };

  const handleDeleteAvailability = (id: string) => {
    setAvailability(availability.filter(item => item.id !== id));
    toast.success('Availability removed');
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          MAGISTRATE AVAILABILITY
        </h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80">
              Add Availability
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card/95 backdrop-blur-sm border-[hsl(var(--police-blue))]/20 text-card-foreground">
            <DialogHeader>
              <DialogTitle className="text-[hsl(var(--police-blue))]">Add Court Availability</DialogTitle>
              <DialogDescription>
                Set your availability for court cases
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-2">
              <div>
                <label className="text-sm font-medium text-[hsl(var(--police-blue))]">Date</label>
                <Input 
                  type="date"
                  value={newAvailability.date} 
                  onChange={(e) => setNewAvailability({...newAvailability, date: e.target.value})}
                  className="bg-card/50 border-[hsl(var(--police-blue))]/30"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[hsl(var(--police-blue))]">Start Time</label>
                  <Input 
                    type="time"
                    value={newAvailability.startTime} 
                    onChange={(e) => setNewAvailability({...newAvailability, startTime: e.target.value})}
                    className="bg-card/50 border-[hsl(var(--police-blue))]/30"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-[hsl(var(--police-blue))]">End Time</label>
                  <Input 
                    type="time"
                    value={newAvailability.endTime} 
                    onChange={(e) => setNewAvailability({...newAvailability, endTime: e.target.value})}
                    className="bg-card/50 border-[hsl(var(--police-blue))]/30"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[hsl(var(--police-blue))]">Notes (Optional)</label>
                <Textarea 
                  value={newAvailability.notes} 
                  onChange={(e) => setNewAvailability({...newAvailability, notes: e.target.value})}
                  placeholder="Any additional information about your availability"
                  className="bg-card/50 border-[hsl(var(--police-blue))]/30 h-20"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleAddAvailability}
                  className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80"
                >
                  Add Availability
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {availability.map(item => (
          <div 
            key={item.id} 
            className="border border-[hsl(var(--police-blue))]/20 bg-card/20 rounded-md p-4 hover:bg-card/30 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center text-[hsl(var(--police-blue))] font-medium">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(item.date)}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                onClick={() => handleDeleteAvailability(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3 mr-2" />
              {item.startTime} - {item.endTime}
            </div>
            
            {item.notes && (
              <div className="mt-4 text-sm bg-[hsl(var(--police-blue))]/5 p-2 rounded text-foreground/80">
                {item.notes}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {availability.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No availability set. Add your court availability to allow officers to schedule cases.</p>
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="text-lg text-[hsl(var(--police-blue))] font-medium mb-4">Upcoming Court Cases</h3>
        
        <div className="border border-[hsl(var(--police-blue))]/20 bg-card/20 rounded-md p-4">
          <p className="text-center text-muted-foreground py-4">No upcoming court cases scheduled for your availability.</p>
        </div>
      </div>
    </div>
  );
};

export default MagistrateAvailability;
