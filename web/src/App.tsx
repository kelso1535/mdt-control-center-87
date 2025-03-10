
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import MDTApp from "./components/MDTApp";
import './index.css';

// FiveM specific NUI message handling
const App = () => {
  // Set up NUI event listener on mount
  window.addEventListener('message', handleMessage);

  function handleMessage(event: MessageEvent) {
    if (event.data.type === 'open') {
      // Handle MDT open event
      const callsign = event.data.callsign || '';
      // Could set callsign in state here
    } else if (event.data.type === 'close') {
      // Handle MDT close event
    }
  }

  // Function to send NUI messages back to the client script
  const sendNUIMessage = (data: any) => {
    // @ts-ignore - FiveM specific fetch API
    fetch(`https://qb-mdt/nuiMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };

  // Function to emit NUI callbacks
  const nuiCallback = (event: string, data: any) => {
    // @ts-ignore - FiveM specific fetch API
    fetch(`https://qb-mdt/${event}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MDTApp 
        sendNUIMessage={sendNUIMessage}
        nuiCallback={nuiCallback}
      />
    </TooltipProvider>
  );
};

export default App;
