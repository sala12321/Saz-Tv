
import React from 'react';
import { Calendar, Clock, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const upcoming = [
  {
    id: 1,
    competition: 'UEFA Champions League',
    homeTeam: 'Paris Saint-Germain',
    awayTeam: 'Manchester United',
    date: 'April 16, 2025',
    time: '19:45 GMT',
    slug: 'psg-vs-man-utd'
  },
  {
    id: 2,
    competition: 'Premier League',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    date: 'April 17, 2025',
    time: '15:00 GMT',
    slug: 'arsenal-vs-chelsea'
  },
  {
    id: 3,
    competition: 'Formula 1',
    homeTeam: 'Monaco Grand Prix',
    awayTeam: '',
    date: 'April 18, 2025',
    time: '13:00 GMT',
    slug: 'monaco-grand-prix'
  },
  {
    id: 4,
    competition: 'Boxing',
    homeTeam: 'Tyson Fury',
    awayTeam: 'Anthony Joshua',
    date: 'April 20, 2025',
    time: '22:00 GMT',
    slug: 'fury-vs-joshua'
  },
];

const UpcomingMatches = () => {
  return (
    <section className="py-10 bg-sports-dark">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Upcoming Matches</h2>
          <Link to="/schedule" className="text-sports-red hover:text-red-400 transition">Full Schedule</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcoming.map((event) => (
            <div 
              key={event.id} 
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
                
                <button className="text-sports-blue hover:text-blue-400 transition">
                  <Bell size={18} />
                </button>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatches;
