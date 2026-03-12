import { useState } from 'react';
import { Sparkles, MessageCircle, Zap, Globe, Shield, Clock, TrendingUp } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import './Home.css';

function Home({ onStartChat, onLogout }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="home-container">
      <Navbar user={user} onLogout={onLogout} />

      <div className="home-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>AI-Powered Support</span>
          </div>
          <h1 className="hero-title">Welcome to AI Customer Support! 🎉</h1>
          <p className="hero-subtitle">Experience next-generation customer service powered by AI. Get instant answers to your questions, available 24/7 in multiple languages.</p>
          <button onClick={onStartChat} className="start-chat-btn">
            <MessageCircle size={20} />
            <span>Start Chatting Now</span>
          </button>
          <div className="hero-features">
            <div className="feature-tag">
              <Globe size={16} />
              <span>Multi-language</span>
            </div>
            <div className="feature-tag">
              <Zap size={16} />
              <span>Instant Response</span>
            </div>
            <div className="feature-tag">
              <Shield size={16} />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-number">10K+</div>
            <div className="stat-label">Conversations</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-number">&lt;2s</div>
            <div className="stat-label">Response Time</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌍</div>
            <div className="stat-number">50+</div>
            <div className="stat-label">Languages</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2 className="section-title">Why Choose Our AI Support?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={32} />
              </div>
              <h3>24/7 Availability</h3>
              <p>Get help anytime, anywhere. Our AI assistant never sleeps and is always ready to assist you.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={32} />
              </div>
              <h3>Lightning Fast</h3>
              <p>Receive instant responses to your queries. No more waiting in long queues for support.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Globe size={32} />
              </div>
              <h3>Multilingual Support</h3>
              <p>Communicate in your preferred language. We support over 50 languages worldwide.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>Secure & Private</h3>
              <p>Your data is encrypted and secure. We prioritize your privacy and confidentiality.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp size={32} />
              </div>
              <h3>Smart Learning</h3>
              <p>Our AI continuously learns and improves to provide better assistance over time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <MessageCircle size={32} />
              </div>
              <h3>Natural Conversations</h3>
              <p>Chat naturally with our AI. It understands context and provides human-like responses.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to Experience the Future of Customer Support?</h2>
          <p className="cta-subtitle">Join thousands of satisfied users and get instant help today!</p>
          <button onClick={onStartChat} className="cta-btn">
            <MessageCircle size={20} />
            <span>Get Started Now</span>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;

