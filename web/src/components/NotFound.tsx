
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a1422] text-white p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded text-white">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
