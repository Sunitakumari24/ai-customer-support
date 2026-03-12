import React from 'react';
import { ExternalLink } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  const isFallback = message.type === 'fallback';
  
  return (
    <div className={`message-wrapper ${isUser ? 'user' : 'bot'}`}>
      <div className="message-content">
        {/* Message Bubble */}
        <div className={`message-bubble ${isUser ? 'user' : isFallback ? 'fallback' : 'bot'}`}>
          {/* Image if present */}
          {message.image && (
            <div className="message-image">
              <img src={message.image} alt="Uploaded" />
            </div>
          )}
          
          {message.text}
          
          {/* Fallback Button for Human Support */}
          {isFallback && (
            <button className="fallback-btn">
              <ExternalLink size={14} /> Talk to Human Agent
            </button>
          )}
        </div>
        
        {/* Timestamp */}
        <div className="message-timestamp">
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
