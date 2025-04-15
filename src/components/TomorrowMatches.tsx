
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface Match {
  id: number;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  date?: string;
  slug: string;
}

const TomorrowMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const savedMatches = localStorage.getItem('upcomingMatches');
    if (savedMatches) {
      const parsedMatches = JSON.parse(savedMatches);
      const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
      
      // Filter matches for tomorrow only
      const tomorrowMatches = parsedMatches.filter((match: Match) => 
        match.date === tomorrow
      );
      
      setMatches(tomorrowMatches);
    }
  }, []);

  if (matches.length === 0) return null;

  return (
    <section className="py-10 bg-sports-dark-blue">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Tomorrow's Matches</h2>
        
        <div className="grid gap-4">
          {matches.map((match) => (
            <div 
              key={match.id} 
              className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition"
            >
              <div className="text-sm text-gray-400 mb-2">{match.competition}</div>
              <div className="text-sm text-gray-400 mb-3">{match.time}</div>
              
              <div className="mt-3 flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold text-white">{match.homeTeam}</div>
                  <div className="text-lg font-semibold text-white">{match.awayTeam}</div>
                </div>
                
                <Link
                  to={`/stream/${match.slug}`}
                  className="bg-sports-blue hover:bg-blue-700 text-white text-sm px-4 py-2 rounded flex items-center gap-2"
                >
                  <span>View Match</span>
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

export default TomorrowMatches;
