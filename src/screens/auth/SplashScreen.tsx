import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Check if user is already authenticated
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/home');
      } else {
        navigate('/onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return (
    <div className="h-screen bg-primary-600 flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="text-7xl mb-8">🥕</div>
        <h1 className="text-6xl font-bold text-white mb-2 tracking-wide">nectar</h1>
        <p className="text-sm text-primary-100 tracking-widest">online groceries</p>
      </div>
    </div>
  );
};
