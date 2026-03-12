import React, { useState, useEffect } from 'react';
import { Bot, X, Plus, MessageSquare, Trash2, User, MoreVertical } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, onNewChat, chatHistory, onLoadChat, onDeleteChat }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const handleDeleteChat = (e, chatId) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this chat?')) {
      onDeleteChat(chatId);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          
          {/* Header */}
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="logo-icon">
                <Bot size={20} />
              </div>
              <span className="logo-text">AI Dashboard</span>
            </div>
            <button onClick={onClose} className="close-btn">
              <X size={20} />
            </button>
          </div>

          {/* New Chat Button */}
          <button onClick={onNewChat} className="new-chat-btn">
            <Plus size={20} />
            New Chat
          </button>

          {/* Chat History */}
          <div className="chat-history">
            <p className="history-title">History</p>
            {chatHistory.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem', marginTop: '1rem' }}>
                No chat history yet
              </p>
            ) : (
              chatHistory.map(chat => (
                <div 
                  key={chat.id} 
                  className="history-item"
                  onClick={() => onLoadChat(chat.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="history-item-content">
                    <MessageSquare size={16} style={{color: '#64748b'}} />
                    <div>
                      <span className="history-item-text">{chat.title}</span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '0.5rem' }}>
                        {chat.date}
                      </span>
                    </div>
                  </div>
                  <Trash2 
                    size={14} 
                    className="delete-icon"
                    onClick={(e) => handleDeleteChat(e, chat.id)}
                  />
                </div>
              ))
            )}
          </div>

          {/* User Profile */}
          <div className="user-profile-section">
            <div className="user-profile">
              <div className="user-avatar">{getUserInitials()}</div>
              <div className="user-info">
                <p className="user-name">{user?.name || 'Customer User'}</p>
                <p className="user-email">{user?.email || 'user@example.com'}</p>
              </div>
              <button className="user-menu-btn">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
