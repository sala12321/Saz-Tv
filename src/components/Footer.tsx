
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-sports-dark-blue border-t border-gray-800 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">Saz<span className="text-sports-red">Tv</span></span>
            </Link>
            <p className="text-gray-400">Your one-stop destination for live sports streaming links and schedules.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/channels" className="hover:text-white transition">24/7 Channels</Link></li>
              <li><Link to="/donate" className="hover:text-white transition">Donate</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
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
          <p>&copy; 2025 SazTv. Made with ♥ by Salahadin .</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
