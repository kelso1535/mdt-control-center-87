
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0a1422] text-white p-4">
      <Shield className="w-16 h-16 text-[#007bff] mb-6" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-400 mb-8 text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button
        onClick={() => window.location.href = '/'}
        className="bg-[#007bff] hover:bg-[#0069d9] px-6 py-3 rounded-md"
      >
        Return to MDT
      </Button>
    </div>
  );
};

export default NotFound;
