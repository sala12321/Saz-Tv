
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
            <Link to="/about" className="text-white hover:text-sports-red transition">About Us</Link>
            <Link to="/channels" className="text-white hover:text-sports-red transition">24/7 Channels</Link>
            <Link to="/donate" className="text-white hover:text-sports-red transition">Donate</Link>
            <Link to="/contact" className="text-white hover:text-sports-red transition">Contact Us</Link>
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
            <li><Link to="/about" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>About Us</Link></li>
            <li><Link to="/channels" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>24/7 Channels</Link></li>
            <li><Link to="/donate" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>Donate</Link></li>
            <li><Link to="/contact" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>Contact Us</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
