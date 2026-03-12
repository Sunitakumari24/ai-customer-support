
import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
// import Navbar from './component/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Chatbot from './component/Chatbot'
import GoogleAuthSuccess from './pages/GoogleAuthSuccess'
import { useAuth } from './hooks/useAuth'

function App() {
  const { isAuthenticated, handleStartChat, handleLogout, handleLogin } = useAuth();
  const navigate = useNavigate();

  // Check if user is registered on app load
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user && window.location.pathname === '/chat') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Home onStartChat={handleStartChat} onLogout={handleLogout} />} />
        <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/chat" element={<Chatbot onBack={() => navigate('/')} />} />
        <Route path="/auth/google/success" element={<GoogleAuthSuccess />} />
      </Routes>
    </div>
  )
}

export default App
