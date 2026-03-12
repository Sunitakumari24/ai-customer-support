import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="typing-wrapper">
      <div className="typing-bubble">
        {/* Animated Dots */}
        <div className="typing-dots">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
        
        {/* Typing Text */}
        <span className="typing-text">AI is thinking...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
