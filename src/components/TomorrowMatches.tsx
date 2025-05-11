
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { supabase } from '../lib/supabase';
import type { Match } from '../types/supabase';

const TomorrowMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTomorrowMatches() {
      const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
      
      try {
        console.log('Fetching tomorrow matches from Supabase for date:', tomorrow);
        const { data, error } = await supabase
          .from('matches')
          .select('*')
          .eq('type', 'upcoming')
          .eq('date', tomorrow);
        
        if (error) {
          console.error('Error fetching tomorrow matches:', error);
          setError(error.message);
          return;
        }
        
        console.log('Tomorrow matches data:', data);
        setMatches(data || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch tomorrow matches:', err);
        setError('Failed to load tomorrow\'s matches. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchTomorrowMatches();
  }, []);

  if (loading) return (
    <section className="py-10 bg-sports-dark-blue">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Tomorrow's Matches</h2>
        <div className="bg-gray-900 rounded-lg p-8 text-center text-gray-400">
          Loading tomorrow's matches...
        </div>
      </div>
    </section>
  );
  
  if (error) return (
    <section className="py-10 bg-sports-dark-blue">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Tomorrow's Matches</h2>
        <div className="bg-gray-900 rounded-lg p-8 text-center text-red-400">
          {error}
        </div>
      </div>
    </section>
  );
  
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
                  <div className="text-lg font-semibold text-white">{match.home_team}</div>
                  <div className="text-lg font-semibold text-white">{match.away_team}</div>
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
