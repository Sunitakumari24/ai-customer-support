import React from 'react';
import { LogOut } from 'lucide-react';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  // Get user initials from email
  const getInitials = (email) => {
    if (!email) return 'U';
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };
  
  // Generate Gravatar URL from email
  const getGravatarUrl = (email) => {
    if (!email) return null;
    const name = email.split('@')[0];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=200&bold=true&rounded=true`;
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-left">
        </div>
        <div className="nav-center">
          <h1>🤖 AI Customer Support</h1>
        </div>
        <div className="nav-right">
          <button onClick={onLogout} className="logout-btn">
            <LogOut size={18} />
          </button>
          <div className="user-profile">
            <div className="profile-avatar-wrapper">
              {user?.email ? (
                <img 
                  src={getGravatarUrl(user.email)} 
                  alt="Profile" 
                  className="profile-avatar"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="profile-initials" style={{display: user?.email ? 'none' : 'flex'}}>
                {getInitials(user?.email)}
              </div>
              <div className="online-status"></div>
            </div>
            <div className="profile-info">
              <span className="user-name">{user?.name || 'User'}</span>
              <span className="user-email">{user?.email || 'user@example.com'}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
