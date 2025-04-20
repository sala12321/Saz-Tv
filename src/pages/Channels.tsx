
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Play, Tv, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Channel {
  id: number;
  name: string;
  logo: string;
  slug: string;
  logoUrl?: string;
}

const Channels = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load channels from localStorage
    const savedChannels = localStorage.getItem('channels');
    if (savedChannels) {
      setChannels(JSON.parse(savedChannels));
    }
    setLoading(false);
  }, []);

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
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-300">Loading channels...</p>
            </div>
          ) : channels.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {channels.map((channel) => (
                <Link
                  to={`/channel/${channel.slug}`}
                  key={channel.id}
                  className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition flex flex-col items-center text-center"
                >
                  {channel.logoUrl ? (
                    <img 
                      src={channel.logoUrl} 
                      alt={`${channel.name} logo`} 
                      className="w-16 h-16 rounded-full object-cover mb-3" 
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-3xl mb-3">
                      {channel.logo}
                    </div>
                  )}
                  <h3 className="font-medium text-white mb-2">{channel.name}</h3>
                  <div className="mt-auto flex items-center gap-1 text-sports-red hover:text-red-400 text-sm">
                    <Play size={14} />
                    <span>Watch Live</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-900 rounded-lg">
              <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No Channels Available</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                There are no channels available at the moment. 
                Channels can be added from the Admin Dashboard.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Channels;
