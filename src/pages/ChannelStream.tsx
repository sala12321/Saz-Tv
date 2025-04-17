
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ExternalLink, Globe, Info } from 'lucide-react';

interface StreamSource {
  id: number;
  name: string;
  language: string;
  quality: string;
  url: string;
}

const defaultStreams: StreamSource[] = [
  { id: 1, name: "Stream HD", language: "English", quality: "HD", url: "#" },
  { id: 2, name: "Stream 4K", language: "English", quality: "4K", url: "#" },
  { id: 3, name: "Stream SD", language: "English", quality: "SD", url: "#" },
  { id: 4, name: "Stream International", language: "Spanish", quality: "HD", url: "#" },
  { id: 5, name: "Stream Premium", language: "English", quality: "FHD", url: "#" },
];

const ChannelStream = () => {
  const { slug } = useParams<{ slug: string }>();
  const [channelName, setChannelName] = useState("");
  const [streamSources, setStreamSources] = useState<StreamSource[]>(defaultStreams);
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  
  useEffect(() => {
    // Format the channel name from slug
    if (slug) {
      const formattedName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      setChannelName(formattedName);
    }
    
    // In a real app, you would fetch stream sources for this channel
    // For now, we'll use the default streams
    
    // Check localStorage for any custom stream sources
    const savedStreams = localStorage.getItem(`channel_${slug}_streams`);
    if (savedStreams) {
      setStreamSources(JSON.parse(savedStreams));
    }
  }, [slug]);
  
  const handleStreamSelect = (url: string) => {
    setSelectedStream(url);
  };
  
  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">{channelName} Live Stream</h1>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="live-badge">LIVE</span>
              <span className="text-gray-400">Broadcasting 24/7</span>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-8 mb-8">
              <div className="aspect-w-16 aspect-h-9 bg-black rounded mb-4">
                {selectedStream ? (
                  <iframe 
                    src={selectedStream} 
                    allowFullScreen
                    className="w-full h-full"
                    style={{ aspectRatio: '16/9' }}
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-400">Stream preview available after selecting a source</p>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Info size={16} className="text-sports-blue" />
                  <p className="text-gray-300 text-sm">
                    Select a stream source below to start watching
                  </p>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-white mb-4">Stream Sources</h2>
            
            <div className="bg-gray-900 rounded-lg overflow-hidden mb-8">
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-4 bg-gray-800 text-gray-400 text-sm font-medium">
                <div>Source Name</div>
                <div>Language</div>
                <div>Quality</div>
                <div></div>
              </div>
              
              {streamSources.map((source) => (
                <div 
                  key={source.id}
                  className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-4 border-t border-gray-800 items-center"
                >
                  <div className="font-medium text-white">{source.name}</div>
                  <div className="flex items-center gap-1 text-gray-300">
                    <Globe size={14} />
                    <span>{source.language}</span>
                  </div>
                  <div className="text-sports-blue font-medium">{source.quality}</div>
                  <button 
                    onClick={() => handleStreamSelect(source.url)}
                    className="bg-sports-red hover:bg-red-700 text-white text-sm px-3 py-1 rounded flex items-center gap-1"
                  >
                    <span>Watch</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-3">About {channelName}</h3>
              <p className="text-gray-300">
                {channelName} is a popular sports channel broadcasting various sporting events 
                including football matches, basketball games, and more. The channel is known for 
                its high-quality coverage and expert commentary.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChannelStream;
