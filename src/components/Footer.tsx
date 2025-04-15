
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-sports-dark-blue border-t border-gray-800 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">Total<span className="text-sports-red">Sportek</span></span>
            </Link>
            <p className="text-gray-400">Your one-stop destination for live sports streaming links and schedules.</p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Sports</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/football" className="hover:text-white transition">Football</Link></li>
              <li><Link to="/basketball" className="hover:text-white transition">Basketball</Link></li>
              <li><Link to="/tennis" className="hover:text-white transition">Tennis</Link></li>
              <li><Link to="/rugby" className="hover:text-white transition">Rugby</Link></li>
              <li><Link to="/boxing" className="hover:text-white transition">Boxing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/live" className="hover:text-white transition">Live Now</Link></li>
              <li><Link to="/schedule" className="hover:text-white transition">Schedule</Link></li>
              <li><Link to="/news" className="hover:text-white transition">News</Link></li>
              <li><Link to="/highlights" className="hover:text-white transition">Highlights</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white transition">Disclaimer</Link></li>
              <li><Link to="/dmca" className="hover:text-white transition">DMCA</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-gray-400 text-center">
          <p>&copy; 2025 TotalSportek Clone. This is a demo website for educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
