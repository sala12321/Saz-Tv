
import React, { useState } from 'react';
import { Menu, X, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="bg-sports-dark-blue sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">Saz<span className="text-sports-red">Tv</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white hover:text-sports-red transition">Home</Link>
            <Link to="/schedule" className="text-white hover:text-sports-red transition">Schedule</Link>
            <Link to="/channels" className="text-white hover:text-sports-red transition">24/7 Channels</Link>
            <Link to="/about" className="text-white hover:text-sports-red transition">About Us</Link>
            <Link to="/donate" className="text-white hover:text-sports-red transition">Donate</Link>
            <Link to="/contact" className="text-white hover:text-sports-red transition">Contact Us</Link>
            
            <div className="flex items-center gap-3 ml-4 border-l pl-4 border-gray-700">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sports-red transition">
                <Facebook size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sports-red transition">
                <Youtube size={20} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sports-red transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                  <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                  <path d="M15 8v8a4 4 0 0 1-4 4"></path>
                  <line x1="15" y1="4" x2="15" y2="12"></line>
                </svg>
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sports-red transition">
                <MessageCircle size={20} />
              </a>
            </div>
          </nav>
          
          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-sports-dark-blue py-4 px-4 border-t border-gray-800">
          <ul className="flex flex-col gap-4">
            <li><Link to="/" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/schedule" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>Schedule</Link></li>
            <li><Link to="/channels" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>24/7 Channels</Link></li>
            <li><Link to="/about" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>About Us</Link></li>
            <li><Link to="/donate" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>Donate</Link></li>
            <li><Link to="/contact" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>Contact Us</Link></li>
            <li className="pt-4 border-t border-gray-700 mt-4">
              <div className="flex items-center gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sports-red transition">
                  <Facebook size={20} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sports-red transition">
                  <Youtube size={20} />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sports-red transition">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                    <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                    <path d="M15 8v8a4 4 0 0 1-4 4"></path>
                    <line x1="15" y1="4" x2="15" y2="12"></line>
                  </svg>
                </a>
                <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sports-red transition">
                  <MessageCircle size={20} />
                </a>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
