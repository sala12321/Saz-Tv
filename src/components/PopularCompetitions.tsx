
import React from 'react';
import { Link } from 'react-router-dom';

const competitions = [
  { name: 'Champions League', logo: '🏆', slug: 'champions-league' },
  { name: 'Premier League', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', slug: 'premier-league' },
  { name: 'La Liga', logo: '🇪🇸', slug: 'la-liga' },
  { name: 'Serie A', logo: '🇮🇹', slug: 'serie-a' },
  { name: 'Bundesliga', logo: '🇩🇪', slug: 'bundesliga' },
  { name: 'NBA', logo: '🏀', slug: 'nba' },
  { name: 'Formula 1', logo: '🏎️', slug: 'formula-1' },
  { name: 'UFC', logo: '🥊', slug: 'ufc' },
];

const PopularCompetitions = () => {
  return (
    <section className="py-10 bg-sports-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Popular Competitions</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {competitions.map((competition, index) => (
            <Link
              to={`/competition/${competition.slug}`}
              key={index}
              className="bg-gray-900 rounded-lg p-4 flex items-center hover:bg-gray-800 transition"
            >
              <span className="text-2xl mr-3">{competition.logo}</span>
              <span className="text-white font-medium">{competition.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompetitions;
