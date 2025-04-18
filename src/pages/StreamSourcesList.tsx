
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, AlertCircle } from 'lucide-react';

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

const StreamSourcesList = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [streamSources, setStreamSources] = useState<StreamSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const matchId = parseInt(id);
    
    // Find the match from all possible sources
    const liveMatches = JSON.parse(localStorage.getItem('liveMatches') || '[]') as Match[];
    const upcomingMatches = JSON.parse(localStorage.getItem('upcomingMatches') || '[]') as Match[];
    const allMatches = JSON.parse(localStorage.getItem('matches') || '[]') as Match[];
    
    // Combine all match sources, but prefer using 'matches' if available
    const combinedMatches = allMatches.length > 0 ? allMatches : [...liveMatches, ...upcomingMatches];
    const matchData = combinedMatches.find(m => m.id === matchId);
    
    if (matchData) {
      setMatch(matchData);
      
      // Find all stream sources for this match
      const sources = JSON.parse(localStorage.getItem('streamSources') || '[]') as StreamSource[];
      const matchSources = sources.filter(s => s.matchId === matchId);
      setStreamSources(matchSources);
    }
    
    setIsLoading(false);
  }, [id]);

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
            <p className="text-gray-300">Loading...</p>
          </div>
        ) : match ? (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                {match.homeTeam} vs {match.awayTeam}
              </h1>
              <p className="text-gray-400">
                {match.competition} • {new Date(match.date).toLocaleDateString()}
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Available Stream Sources</h2>
              
              {streamSources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {streamSources.map((source) => (
                    <Link
                      to={`/local-stream/${source.slug}`}
                      key={source.id}
                      className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg border border-gray-700 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-white">{source.name}</span>
                      <Button size="sm" className="bg-sports-red hover:bg-red-700">
                        <Play className="h-4 w-4 mr-1" />
                        Watch
                      </Button>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No Stream Sources Available</h3>
                  <p className="text-gray-400">
                    There are currently no stream sources available for this match. Please check back later.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
            <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Match Not Found</h2>
            <p className="text-gray-400 mb-6">The match you're looking for doesn't exist or may have been removed.</p>
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

export default StreamSourcesList;
