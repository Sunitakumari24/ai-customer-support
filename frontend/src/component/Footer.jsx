import React from 'react';
import { Bot, Mail, Phone, MapPin, Twitter, Linkedin, Github, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Company Info Section */}
        <div className="footer-section">
          <div className="footer-logo">
            <Bot size={32} />
            <h3>AI Customer Support</h3>
          </div>
          <p className="footer-description">
            Next-generation customer service powered by AI. 
            Available 24/7 to assist you in multiple languages.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Github">
              <Github size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Chat">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li><a href="#help">Help Center</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#status">System Status</a></li>
            <li><a href="#docs">Documentation</a></li>
            <li><a href="#api">API Reference</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={18} />
              <span>support@aicustomer.com</span>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <MapPin size={18} />
              <span>San Francisco, CA</span>
            </div>
          </div>
          <div className="footer-badge">
            <span className="badge">🤖 Powered by Gemini AI</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © 2026 AI Customer Support. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span className="divider">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="divider">•</span>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
