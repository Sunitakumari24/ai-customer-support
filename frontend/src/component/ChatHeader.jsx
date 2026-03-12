import React from 'react';
import { Bot, Menu, Search, MoreVertical, Globe, ArrowLeft } from 'lucide-react';

const ChatHeader = ({ onMenuClick, onBack }) => {
  return (
    <header className="chat-header">
      <div className="header-left">
        {/* Back Button */}
        <button onClick={onBack} className="back-btn" title="Back to Home">
          <ArrowLeft size={24} />
        </button>
        
        {/* Mobile Menu Button */}
        <button onClick={onMenuClick} className="menu-btn">
          <Menu size={24} />
        </button>
        
        {/* Bot Avatar (hidden on mobile) */}
        <div className="bot-avatar-wrapper">
          <div className="bot-avatar">
            <Bot size={24} />
          </div>
          <div className="online-indicator"></div>
        </div>
        
        {/* Title */}
        <div className="header-title-wrapper">
          <h1>Support Chat</h1>
          <div className="header-subtitle">
            <Globe size={10} style={{color: '#94a3b8'}} />
            <span>EN • HI • HINGLISH</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="header-actions">
        <button className="header-action-btn">
          <Search size={20} />
        </button>
        <button className="header-action-btn">
          <MoreVertical size={20} />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
