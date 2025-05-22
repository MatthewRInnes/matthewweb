import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Index = () => {
  const navigate = useNavigate();

  // Redirect to the HomePage
  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
};
