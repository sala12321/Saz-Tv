
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface Match {
  id: number;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  score: string;
  links: number;
  slug: string;
}

const defaultMatches = [
  {
    id: 1,
    competition: 'UEFA Champions League',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Real Madrid',
    time: 'Live - 32\'',
    score: '1-0',
    links: 4,
    slug: 'bayern-vs-real-madrid'
  },
  {
    id: 2,
    competition: 'Premier League',
    homeTeam: 'Liverpool',
    awayTeam: 'Manchester City',
    time: 'Live - 55\'',
    score: '2-2',
    links: 3,
    slug: 'liverpool-vs-manchester-city'
  },
  {
    id: 3,
    competition: 'NBA',
    homeTeam: 'LA Lakers',
    awayTeam: 'Boston Celtics',
    time: 'Live - Q3',
    score: '62-58',
    links: 2,
    slug: 'lakers-vs-celtics'
  },
  {
    id: 4,
    competition: 'Serie A',
    homeTeam: 'AC Milan',
    awayTeam: 'Inter Milan',
    time: 'Live - 70\'',
    score: '0-1',
    links: 3,
    slug: 'milan-vs-inter'
  },
  {
    id: 5,
    competition: 'La Liga',
    homeTeam: 'Barcelona',
    awayTeam: 'Atletico Madrid',
    time: 'Live - 25\'',
    score: '0-0',
    links: 2,
    slug: 'barcelona-vs-atletico'
  },
];

const LiveMatches = () => {
  const [matches, setMatches] = useState<Match[]>(defaultMatches);

  useEffect(() => {
    // Load matches from localStorage if available
    const savedMatches = localStorage.getItem('liveMatches');
    if (savedMatches) {
      const parsedMatches = JSON.parse(savedMatches);
      
      // Add default match properties if missing
      const processedMatches = parsedMatches.map((match: any) => ({
        ...match,
        time: match.time || `Live - ${Math.floor(Math.random() * 90)}'`,
        score: match.score || '0-0',
        links: match.links || 1
      }));
      
      if (processedMatches.length > 0) {
        setMatches(processedMatches);
      }
    } else {
      // If no saved matches, store the defaults
      localStorage.setItem('liveMatches', JSON.stringify(defaultMatches));
    }
  }, []);

  return (
    <section className="py-10 bg-sports-dark-blue">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Live Matches</h2>
          <Link to="/live" className="text-sports-red hover:text-red-400 transition">View All</Link>
        </div>
        
        <div className="grid gap-4">
          {matches.map((match) => (
            <div 
              key={match.id} 
              className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400 mb-1">{match.competition}</div>
                  <div className="flex items-center gap-3">
                    <span className="live-badge">LIVE</span>
                    <span className="text-gray-400 text-sm">{match.time}</span>
                  </div>
                </div>
                <div className="text-xl font-bold text-white">{match.score}</div>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold text-white">{match.homeTeam}</div>
                  <div className="text-lg font-semibold text-white">{match.awayTeam}</div>
                </div>
                
                <Link
                  to={`/stream/${match.slug}`}
                  className="bg-sports-blue hover:bg-blue-700 text-white text-sm px-4 py-2 rounded flex items-center gap-2"
                >
                  <span>{match.links} Stream Links</span>
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveMatches;
