import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/tournament-list'); // Redirect to the homepage (or any other page)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Oops! The page you're looking for doesn't exist.</p>
      <button
        onClick={handleGoHome}
        className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
