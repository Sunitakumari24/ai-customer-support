import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import './Chatbot.css';

const Chatbot = ({ onBack }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'model',
      text: 'Hello! I am your AI. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Get user info from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load chat history from localStorage
    loadChatHistory();
    
    // Create or load current chat
    const savedCurrentChatId = localStorage.getItem('currentChatId');
    if (savedCurrentChatId) {
      loadChat(savedCurrentChatId);
    } else {
      createNewChat();
    }
  }, []);

  const loadChatHistory = () => {
    const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    setChatHistory(history);
  };

  const createNewChat = () => {
    const newChatId = `chat_${Date.now()}`;
    setCurrentChatId(newChatId);
    localStorage.setItem('currentChatId', newChatId);
    
    const initialMessage = {
      id: 1,
      role: 'model',
      text: 'Hello! I am your AI assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([initialMessage]);
    // Don't save to history until user sends first message
  };

  const saveChat = (chatId, msgs) => {
    // Only save if there's at least one user message
    const hasUserMessage = msgs.some(m => m.role === 'user');
    if (!hasUserMessage) return;

    const chatData = {
      id: chatId,
      messages: msgs,
      title: msgs.find(m => m.role === 'user')?.text?.substring(0, 30) || 'New Chat',
      date: new Date().toISOString(),
      timestamp: Date.now()
    };

    // Save individual chat
    localStorage.setItem(chatId, JSON.stringify(chatData));

    // Update history list
    const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    const existingIndex = history.findIndex(h => h.id === chatId);
    
    if (existingIndex >= 0) {
      history[existingIndex] = {
        id: chatData.id,
        title: chatData.title,
        date: formatDate(chatData.date),
        timestamp: chatData.timestamp
      };
    } else {
      history.unshift({
        id: chatData.id,
        title: chatData.title,
        date: formatDate(chatData.date),
        timestamp: chatData.timestamp
      });
    }

    localStorage.setItem('chatHistory', JSON.stringify(history));
    setChatHistory(history);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const loadChat = (chatId) => {
    const savedChat = localStorage.getItem(chatId);
    if (savedChat) {
      const chatData = JSON.parse(savedChat);
      setMessages(chatData.messages);
      setCurrentChatId(chatId);
      localStorage.setItem('currentChatId', chatId);
    }
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const deleteChat = (chatId) => {
    // Remove from localStorage
    localStorage.removeItem(chatId);
    
    // Update history - force fresh load
    const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    const updatedHistory = history.filter(h => h.id !== chatId);
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    
    // Update state to trigger re-render
    setChatHistory([...updatedHistory]);

    // If current chat is deleted, create new chat
    if (chatId === currentChatId) {
      createNewChat();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleNewChat = () => {
    createNewChat();
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const callGeminiAPI = async (userQuery, imageFile = null) => {
    try {
      if (imageFile) {
        // Convert image to base64
        const reader = new FileReader();
        const imageBase64 = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.readAsDataURL(imageFile);
        });

        const response = await axios.post(
          "http://localhost:5000/api/chat",
          { 
            message: userQuery,
            image: imageBase64
          }
        );
        return response.data.reply;
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/chat",
          { message: userQuery }
        );
        return response.data.reply;
      }
    } catch (error) {
      console.error('Backend API call failed:', error);
      throw error;
    }
  };

  const handleSendMessage = async (inputValue, imageFile = null) => {
    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: inputValue || '📷 Image',
      image: imageFile ? URL.createObjectURL(imageFile) : null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    try {
      const aiResponse = await callGeminiAPI(userMessage.text, imageFile);
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'model',
        text: aiResponse || "Sorry, technical issue hai. Please contact customer support.",
        type: aiResponse?.toLowerCase().includes('support') ? 'fallback' : 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      
      // Save chat to localStorage
      saveChat(currentChatId, finalMessages);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'model',
        text: "Sorry, backend se connect nahi ho pa raha. Please check if backend server running hai.",
        type: 'fallback',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      saveChat(currentChatId, finalMessages);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
        chatHistory={chatHistory}
        onLoadChat={loadChat}
        onDeleteChat={deleteChat}
      />

      {/* Main Chat Area */}
      <div className="chat-main">
        {/* Header Component */}
        <ChatHeader 
          onMenuClick={() => setIsSidebarOpen(true)}
          onBack={onBack}
        />

        {/* Messages Area */}
        <main className="messages-area">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </main>

        {/* Input Component */}
        <ChatInput
          inputText={inputText}
          onInputChange={setInputText}
          onSubmit={handleSendMessage}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};

export default Chatbot;
