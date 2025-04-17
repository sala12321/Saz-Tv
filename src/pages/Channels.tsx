
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Play, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';

const channels = [
  { id: 1, name: 'TNT Sports', logo: '🔴', slug: 'tnt-sports' },
  { id: 2, name: 'SuperSport', logo: '⚪', slug: 'super-sport' },
  { id: 3, name: 'beIN Sports', logo: '🟢', slug: 'bein-sports' },
  { id: 4, name: 'ESPN', logo: '🔵', slug: 'espn' },
  { id: 5, name: 'Sky Sports', logo: '🟠', slug: 'sky-sports' },
  { id: 6, name: 'BT Sport', logo: '🟣', slug: 'bt-sport' },
  { id: 7, name: 'DAZN', logo: '⚫', slug: 'dazn' },
  { id: 8, name: 'Eurosport', logo: '🔴', slug: 'eurosport' },
  { id: 9, name: 'Fox Sports', logo: '⚪', slug: 'fox-sports' },
  { id: 10, name: 'Arena Sport', logo: '🟢', slug: 'arena-sport' },
  { id: 11, name: 'Premier Sports', logo: '🔵', slug: 'premier-sports' },
  { id: 12, name: 'Sport TV', logo: '🟠', slug: 'sport-tv' },
];

const Channels = () => {
  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Tv className="text-sports-blue" size={28} />
            <h1 className="text-3xl md:text-4xl font-bold text-white">24/7 Sports Channels</h1>
          </div>
          
          <div className="mb-8">
            <p className="text-gray-300 max-w-3xl">
              Watch popular sports channels from around the world, streaming 24/7. 
              Click on any channel to view available streaming options.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {channels.map((channel) => (
              <Link
                to={`/channel/${channel.slug}`}
                key={channel.id}
                className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-3xl mb-3">
                  {channel.logo}
                </div>
                <h3 className="font-medium text-white mb-2">{channel.name}</h3>
                <div className="mt-auto flex items-center gap-1 text-sports-red hover:text-red-400 text-sm">
                  <Play size={14} />
                  <span>Watch Live</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Channels;
