
import React, { useEffect, useState } from 'react';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Match } from '../types/supabase';

const UpcomingMatches = () => {
  const [upcoming, setUpcoming] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpcomingMatches() {
      try {
        const { data, error } = await supabase
          .from('matches')
          .select('*')
          .eq('type', 'upcoming')
          .order('date', { ascending: true });
        
        if (error) {
          console.error('Error fetching upcoming matches:', error);
          return;
        }
        
        setUpcoming(data || []);
      } catch (err) {
        console.error('Failed to fetch upcoming matches:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUpcomingMatches();
  }, []);

  return (
    <section className="py-10 bg-sports-dark">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Upcoming Matches</h2>
          <Link to="/schedule" className="text-sports-red hover:text-red-400 transition">Full Schedule</Link>
        </div>
        
        {loading ? (
          <div className="bg-gray-900 rounded-lg p-8 text-center text-gray-400">
            Loading upcoming matches...
          </div>
        ) : upcoming.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-8 text-center text-gray-400 text-md">
            No upcoming matches scheduled.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcoming.map((event) => (
              <Link 
                key={event.id}
                to={`/stream/${event.slug}`}
                className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition"
              >
                <div className="text-sm text-gray-400 mb-2">{event.competition}</div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-lg font-semibold text-white">{event.homeTeam}</div>
                    {event.awayTeam && (
                      <div className="text-lg font-semibold text-white">vs {event.awayTeam}</div>
                    )}
                  </div>
                  <div className="text-sports-blue">
                    <ExternalLink size={18} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{event.time}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingMatches;
