import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface StreamSource {
  id: number;
  matchId: number;
  name: string;
  embedCode: string;
  slug: string;
}

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  date: string;
  status: string;
  logo?: string;
}

const LocalStreamPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [streamSource, setStreamSource] = useState<StreamSource | null>(null);
  const [match, setMatch] = useState<Match | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sources = JSON.parse(localStorage.getItem('streamSources') || '[]') as StreamSource[];
    const source = sources.find(s => s.slug === slug);
    
    if (source) {
      setStreamSource(source);
      
      const liveMatches = JSON.parse(localStorage.getItem('liveMatches') || '[]') as Match[];
      const upcomingMatches = JSON.parse(localStorage.getItem('upcomingMatches') || '[]') as Match[];
      const allMatches = JSON.parse(localStorage.getItem('matches') || '[]') as Match[];
      
      const combinedMatches = allMatches.length > 0 ? allMatches : [...liveMatches, ...upcomingMatches];
      const matchData = combinedMatches.find(m => m.id === source.matchId);
      
      if (matchData) {
        setMatch(matchData);
      }
    }
    
    setIsLoading(false);
  }, [slug]);

  const renderStream = () => {
    if (!streamSource) return null;
    
    return (
      <AspectRatio ratio={16 / 9} className="overflow-hidden bg-black">
        <div className="w-full h-full">
          <div 
            className="relative w-full h-full"
            dangerouslySetInnerHTML={{ __html: streamSource.embedCode }} 
          />
        </div>
      </AspectRatio>
    );
  };

  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Button 
          variant="outline"
          className="mb-6 text-white border-gray-700 hover:bg-gray-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-300">Loading stream...</p>
          </div>
        ) : streamSource && match ? (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {match.homeTeam} vs {match.awayTeam}
              </h1>
              <p className="text-gray-400">
                {match.competition} • {new Date(match.date).toLocaleDateString()} • {streamSource.name}
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
              {renderStream()}
            </div>
            
            <div className="bg-amber-900/30 border border-amber-700/50 text-amber-200 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Disclaimer</h3>
                  <p className="text-sm mt-1">
                    This stream is hosted by a third-party website. We do not host or upload any video, 
                    films, or media files. We are not responsible for the accuracy, compliance, copyright, 
                    legality, decency, or any other aspect of the content of the linked sites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
            <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Stream Not Found</h2>
            <p className="text-gray-400 mb-6">The stream you're looking for doesn't exist or may have been removed.</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-sports-red hover:bg-red-700"
            >
              Go to Homepage
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LocalStreamPage;
