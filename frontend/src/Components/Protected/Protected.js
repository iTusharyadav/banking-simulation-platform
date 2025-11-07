import React, { useEffect } from 'react';
import { useBankingSystem } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Protected = ({ Component }) => {
  const { userDetails } = useBankingSystem();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) {
      navigateTo("/");
    }
    if (!userDetails?.accounts || userDetails?.accounts.length === 0) {
      navigateTo("/dashboard");
    }
  }, [userDetails, navigateTo]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Component />
    </div>
  );
}

export default Protected;
