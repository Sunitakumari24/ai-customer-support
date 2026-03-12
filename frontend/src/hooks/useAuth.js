import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleStartChat = () => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/chat');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/chat');
  };

  return {
    isAuthenticated,
    handleStartChat,
    handleLogout,
    handleLogin
  };
};
