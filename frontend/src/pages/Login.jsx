import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, saveToken, saveUser } from '../services/authAPI';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // API call to backend
      const response = await loginUser({ email, password });
      
      // Save token and user data
      saveToken(response.token);
      saveUser(response.user);
      
      // Call parent onLogin function
      if (onLogin) {
        onLogin();
      }
      
      // Navigate to home
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <nav className="login-navbar">
        <div className="nav-content">
          <h1>🤖 AI Customer Support</h1>
        </div>
      </nav>
      
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>Welcome Back! 🎉</h1>
            <p>Please login to continue to your AI support dashboard</p>
          </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ 
              padding: '10px', 
              backgroundColor: '#fee', 
              border: '1px solid #fcc', 
              borderRadius: '5px',
              marginBottom: '15px',
              color: '#c33'
            }}>
              {error}
            </div>
          )}
          
          
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label>🔒 Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
        
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <a href="/signup">Create one here</a></p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
