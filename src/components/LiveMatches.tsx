
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Match } from '../types/supabase';

const LiveMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchLiveMatches() {
      try {
        console.log('Fetching live matches from Supabase...');
        const { data, error } = await supabase
          .from('matches')
          .select('*')
          .eq('type', 'live');
        
        if (error) {
          console.error('Error fetching live matches:', error);
          setError(error.message);
          return;
        }
        
        console.log('Live matches data:', data);
        setMatches(data || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch live matches:', err);
        setError('Failed to load live matches. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchLiveMatches();
  }, []);

  if (loading) {
    return (
      <section className="py-10 bg-sports-dark-blue">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Live Matches</h2>
            <Link to="/live" className="text-sports-red hover:text-red-400 transition">View All</Link>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <p className="text-gray-400">Loading live matches...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 bg-sports-dark-blue">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Live Matches</h2>
            <Link to="/live" className="text-sports-red hover:text-red-400 transition">View All</Link>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-8 text-center text-red-400">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (matches.length === 0) {
    return (
      <section className="py-10 bg-sports-dark-blue">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Live Matches</h2>
            <Link to="/live" className="text-sports-red hover:text-red-400 transition">View All</Link>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <p className="text-gray-400 text-lg">No live matches available at the moment.</p>
            <p className="text-gray-500 mt-2">Please check back later or visit the admin dashboard to add matches.</p>
          </div>
        </div>
      </section>
    );
  }

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
                  <div className="text-lg font-semibold text-white">{match.home_team}</div>
                  <div className="text-lg font-semibold text-white">{match.away_team}</div>
                </div>
                
                <Link
                  to={`/stream/${match.slug}`}
                  className="bg-sports-blue hover:bg-blue-700 text-white text-sm px-4 py-2 rounded flex items-center gap-2"
                >
                  <span>Watch Stream</span>
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
