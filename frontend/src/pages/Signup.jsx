import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser, saveToken, saveUser } from '../services/authAPI';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignup = () => {
    // Open Google OAuth URL
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }
    
    setLoading(true);

    try {
      // API call to backend
      const response = await signupUser({ name, email, password });
      
      // Save token and user data
      saveToken(response.token);
      saveUser(response.user);
      
      alert('Account created successfully! 🎉');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <nav className="signup-navbar">
        <div className="nav-content">
          <h1>🤖 AI Customer Support</h1>
        </div>
      </nav>
      
      <div className="signup-container">
        <div className="signup-box">
          <div className="signup-header">
            <h1>Create Account! 🚀</h1>
            <p>Join us and experience next-generation AI customer support</p>
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
              <label>👤 Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
            </div>
            
            <div className="input-group">
              <label>📧 Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
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
                placeholder="Create a strong password (min 6 characters)"
                required
                minLength={6}
                disabled={loading}
              />
            </div>
            
            <div className="input-group">
              <label>🔐 Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                disabled={loading}
              />
            </div>
            
            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button onClick={handleGoogleSignup} className="google-btn" type="button">
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
              <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9.003 18z" fill="#34A853"/>
              <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.002 0 5.48 0 2.438 2.017.957 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>
          
          <div className="signup-footer">
            <p>Already have an account? <a href="/login">Login here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
