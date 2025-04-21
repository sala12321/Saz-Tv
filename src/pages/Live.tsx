
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import type { Match } from '../types/supabase';

const Live = () => {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchLiveMatches() {
      try {
        const { data, error } = await supabase
          .from('matches')
          .select('*')
          .eq('type', 'live');
        
        if (error) {
          console.error('Error fetching live matches:', error);
          setError(error.message);
          return;
        }
        
        setLiveMatches(data || []);
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

  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link to="/" className="text-sports-blue hover:text-blue-400 transition flex items-center gap-1 mb-6">
          <ArrowLeft size={16} />
          <span>Back to home</span>
        </Link>
        
        <h1 className="text-2xl font-bold text-white mb-6">Live Streams</h1>
        
        {loading ? (
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <p className="text-gray-400">Loading live matches...</p>
          </div>
        ) : error ? (
          <div className="bg-gray-900 rounded-lg p-6 text-center text-red-400">
            {error}
          </div>
        ) : liveMatches.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <p className="text-gray-400">No live matches available at the moment.</p>
            <p className="text-gray-500 mt-2">Please check back later or visit the admin dashboard to add matches.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {liveMatches.map((match) => (
              <Link 
                key={match.id} 
                to={`/stream/${match.slug}`}
                className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition"
              >
                <div className="text-sm text-gray-400 mb-2">{match.competition}</div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-semibold text-white">{match.homeTeam}</div>
                    {match.awayTeam && (
                      <div className="text-lg font-semibold text-white">{match.awayTeam}</div>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    {match.score ? (
                      <div className="flex items-center mr-4">
                        <span className="live-badge">LIVE</span>
                        <span className="text-white font-bold ml-2">{match.score}</span>
                      </div>
                    ) : (
                      <div className="text-gray-300 mr-4">{match.time}</div>
                    )}
                    
                    <span className="bg-sports-blue hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">
                      Watch Stream
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Live;
