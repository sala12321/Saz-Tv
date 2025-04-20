import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, Copy, Bitcoin, Banknote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

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
  const { toast } = useToast();
  const isMobile = useIsMobile();

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

  const getProcessedEmbedCode = (code: string): string => {
    if (code.includes('<iframe')) {
      let processedCode = code
        .replace(/width="[^"]*"/g, 'width="100%"')
        .replace(/height="[^"]*"/g, 'height="100%"');
      
      if (!processedCode.includes('style=')) {
        processedCode = processedCode.replace('<iframe', '<iframe style="width:100%;height:calc(100vh - 200px);border:0;border-radius:0.5rem;"');
      }
      
      return processedCode;
    } else {
      return `<iframe src="${code}" style="width:100%;height:calc(100vh - 200px);border:0;border-radius:0.5rem;" allowfullscreen></iframe>`;
    }
  };

  const copyToClipboard = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: `${label} copied to clipboard!`,
    });
  }, [toast]);

  const renderStream = () => {
    if (!streamSource) return null;
    
    const processedEmbedCode = getProcessedEmbedCode(streamSource.embedCode);
    
    return (
      <div 
        className="w-full max-w-5xl mx-auto mb-6"
        dangerouslySetInnerHTML={{ __html: processedEmbedCode }} 
      />
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
              <h1 className="text-2xl font-bold text-white mb-1">
                {match.homeTeam} vs {match.awayTeam}
              </h1>
              <p className="text-gray-400">
                {match.competition} • {new Date(match.date).toLocaleDateString()}
              </p>
            </div>
            
            {renderStream()}
            
            {/* Donate Section */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Banknote className="text-sports-red h-5 w-5" />
                <h3 className="text-xl font-semibold text-white">Support SazTV</h3>
              </div>
              
              <p className="text-gray-300 mb-4">
                Help us keep the streams running by making a small donation. Every contribution helps!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Bitcoin className="text-amber-500 h-5 w-5" />
                    <h4 className="font-medium text-white">Bitcoin (BTC)</h4>
                  </div>
                  <div className="flex items-center justify-between bg-gray-700 rounded p-2">
                    <code className="text-xs text-gray-300 truncate">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</code>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'BTC address')}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Banknote className="text-green-500 h-5 w-5" />
                    <h4 className="font-medium text-white">Bank Transfer</h4>
                  </div>
                  <div className="flex items-center justify-between bg-gray-700 rounded p-2">
                    <code className="text-xs text-gray-300 truncate">IBAN: ES91 2100 0418 4502 0005 1332</code>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard('ES91 2100 0418 4502 0005 1332', 'IBAN')}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <Button 
                    variant="default" 
                    className="w-full bg-sports-red hover:bg-red-700"
                    onClick={() => navigate('/donate')}
                  >
                    More Donation Options
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Disclaimer */}
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
