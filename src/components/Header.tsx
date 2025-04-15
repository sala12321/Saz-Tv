
import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
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
            <span className="text-2xl font-bold text-white">Total<span className="text-sports-red">Sportek</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-white hover:text-sports-red transition">Home</Link>
            <Link to="/football" className="text-white hover:text-sports-red transition">Football</Link>
            <Link to="/basketball" className="text-white hover:text-sports-red transition">Basketball</Link>
            <Link to="/tennis" className="text-white hover:text-sports-red transition">Tennis</Link>
            <Link to="/rugby" className="text-white hover:text-sports-red transition">Rugby</Link>
            <Link to="/boxing" className="text-white hover:text-sports-red transition">Boxing</Link>
            <Link to="/motorsports" className="text-white hover:text-sports-red transition">Motorsports</Link>
          </nav>
          
          {/* Search and Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-sports-red transition">
              <Search size={20} />
            </button>
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
            <li><Link to="/football" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>Football</Link></li>
            <li><Link to="/basketball" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>Basketball</Link></li>
            <li><Link to="/tennis" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>Tennis</Link></li>
            <li><Link to="/rugby" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>Rugby</Link></li>
            <li><Link to="/boxing" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>Boxing</Link></li>
            <li><Link to="/motorsports" className="block text-white hover:text-sports-red transition" onClick={toggleMenu}>Motorsports</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
