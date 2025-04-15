
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, PlayCircle, Globe2, Volume2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface StreamLink {
  id: number;
  matchId: number;
  name: string;
  url: string;
  quality: string;
  language?: string;
  channel?: string;
}

interface Match {
  id: number;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  date?: string;
  time?: string;
  score?: string;
  slug: string;
}

const StreamPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [streamLinks, setStreamLinks] = useState<StreamLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the match in both live and upcoming matches
    const liveMatches = JSON.parse(localStorage.getItem('liveMatches') || '[]');
    const upcomingMatches = JSON.parse(localStorage.getItem('upcomingMatches') || '[]');
    
    let foundMatch = liveMatches.find((m: Match) => m.slug === slug);
    if (!foundMatch) {
      foundMatch = upcomingMatches.find((m: Match) => m.slug === slug);
    }
    
    setMatch(foundMatch || null);
    
    if (foundMatch) {
      // Find stream links for this match
      const allLinks = JSON.parse(localStorage.getItem('streamLinks') || '[]');
      const matchLinks = allLinks.filter((link: StreamLink) => link.matchId === foundMatch.id);
      setStreamLinks(matchLinks);
    }
    
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-sports-dark flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-700 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-sports-dark flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Match Not Found</h1>
          <p className="text-gray-400 mb-6">The match you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="bg-sports-blue hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center gap-2">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const isLive = match.score !== undefined;

  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link to="/" className="text-sports-blue hover:text-blue-400 transition flex items-center gap-1 mb-6">
          <ArrowLeft size={16} />
          <span>Back to all matches</span>
        </Link>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-white mb-2">
              {match?.homeTeam}
              {match?.awayTeam && <span> vs {match.awayTeam}</span>}
            </h1>
            <div className="text-gray-400">{match?.competition}</div>
          </div>
          
          <div className="flex flex-wrap gap-6 mb-4">
            {match?.score && (
              <div className="flex items-center gap-2">
                <span className="live-badge">LIVE</span>
                <span className="text-white font-bold text-xl">{match.score}</span>
              </div>
            )}
            
            {match?.date && (
              <div className="text-gray-300">
                {match.date} • {match.time}
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Available Stream Sources</h2>
          
          {streamLinks.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <p className="text-gray-400 mb-4">No stream sources available for this match yet.</p>
              {match?.score && (
                <p className="text-white">Please check back shortly. Stream sources will be added soon.</p>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {streamLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Globe2 size={16} className="text-gray-400" />
                        <span className="font-medium">{link.channel || link.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Volume2 size={16} className="text-gray-400" />
                        <Badge variant="secondary">
                          {link.language || 'English'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {link.quality}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sports-blue hover:bg-blue-700 text-white text-sm px-4 py-2 rounded inline-flex items-center gap-2"
                      >
                        <PlayCircle size={16} />
                        <span>Watch Stream</span>
                        <ExternalLink size={14} />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Stream Information</h2>
          <div className="text-gray-300 space-y-2">
            <p>• Streams typically become available 30 minutes before the event starts.</p>
            <p>• For the best experience, use an ad blocker when accessing stream links.</p>
            <p>• If a stream is not working, try another one from the list above.</p>
            <p>• Some streams may require you to close pop-up ads before viewing.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StreamPage;
