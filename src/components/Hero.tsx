
import React from 'react';
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
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Watch Football Matches For Free</h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Stream live football matches, basketball games, tennis tournaments and more - all for free, anytime and anywhere.
          </p>
          
          <Link 
            to="/live" 
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
