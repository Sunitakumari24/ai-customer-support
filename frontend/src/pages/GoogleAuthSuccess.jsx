import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { saveToken, saveUser } from '../services/authAPI';

function GoogleAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        
        // Save token and user data
        saveToken(token);
        saveUser(user);
        
        // Redirect to chat
        navigate('/chat');
      } catch (error) {
        console.error('Error processing Google auth:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '1.5rem'
    }}>
      🔐 Authenticating with Google...
    </div>
  );
}

export default GoogleAuthSuccess;
