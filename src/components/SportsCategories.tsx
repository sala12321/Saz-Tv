
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Football', icon: '⚽', color: 'bg-sports-blue', link: '/football' },
  { name: 'Basketball', icon: '🏀', color: 'bg-sports-red', link: '/basketball' },
  { name: 'Tennis', icon: '🎾', color: 'bg-sports-green', link: '/tennis' },
  { name: 'Rugby', icon: '🏉', color: 'bg-gradient-to-r from-sports-blue to-sports-red', link: '/rugby' },
  { name: 'Boxing', icon: '🥊', color: 'bg-sports-red', link: '/boxing' },
  { name: 'Motorsports', icon: '🏎️', color: 'bg-sports-blue', link: '/motorsports' },
  { name: 'Golf', icon: '⛳', color: 'bg-sports-green', link: '/golf' },
  { name: 'Cricket', icon: '🏏', color: 'bg-gradient-to-r from-sports-green to-sports-blue', link: '/cricket' },
];

const SportsCategories = () => {
  return (
    <section className="py-10 bg-sports-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Browse By Sport</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link
              to={category.link}
              key={index}
              className={`${category.color} rounded-lg p-4 flex flex-col items-center justify-center text-center text-white hover:opacity-90 transition-opacity h-32`}
            >
              <span className="text-3xl mb-2">{category.icon}</span>
              <h3 className="font-bold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsCategories;
