import React, { useRef, useState } from 'react';
import { Send, Paperclip, X } from 'lucide-react';

const ChatInput = ({ inputText, onInputChange, onSubmit, isTyping, onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((inputText.trim() || selectedImage) && !isTyping) {
      onSubmit(inputText, selectedImage);
      // Clear image after sending
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <footer className="chat-footer">
      {/* Image Preview */}
      {imagePreview && (
        <div className="image-preview-container">
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
            <button 
              type="button" 
              onClick={removeImage} 
              className="remove-image-btn"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="input-wrapper">
        {/* Image Upload Button */}
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="attach-btn"
          title="Upload image"
        >
          <Paperclip size={20} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: 'none' }}
        />
        
        {/* Text Input */}
        <input 
          type="text"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Message likhein..."
          className="message-input"
        />
        
        {/* Send Button */}
        <button 
          type="submit"
          disabled={(!inputText.trim() && !selectedImage) || isTyping}
          className="send-btn"
        >
          <Send size={18} />
        </button>
      </form>
      
      {/* Footer Info */}
      <p className="footer-info">
        AI powered by Gemini 2.0 Flash • English, Hindi, Hinglish
      </p>
    </footer>
  );
};

export default ChatInput;
