
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-sports-dark h-[400px] md:h-[500px] flex items-center">
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 z-10"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2156&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl">
          <div className="flex gap-2 items-center mb-3">
            <span className="live-badge">LIVE NOW</span>
            <span className="text-sports-red font-bold">UEFA Champions League</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Bayern Munich vs Real Madrid</h1>
          
          <div className="flex flex-wrap gap-4 items-center mb-6 text-gray-300">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>April 15, 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>20:00 GMT</span>
            </div>
            <div className="px-3 py-1 bg-sports-dark-blue/80 rounded">
              <span>Semi-Final - Leg 1</span>
            </div>
          </div>
          
          <Link 
            to="/stream/champions-league/bayern-vs-real-madrid" 
            className="bg-sports-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded inline-flex items-center transition"
          >
            Watch Stream
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
