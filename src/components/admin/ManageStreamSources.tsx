
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from 'sonner';
import { Trash2, Plus, Link as LinkIcon, Edit2 } from 'lucide-react';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  date: string;
  status: string;
}

interface StreamSource {
  id: number;
  matchId: number;
  name: string;
  embedCode: string;
  slug: string;
}

const ManageStreamSources = () => {
  // State for matches and stream sources
  const [matches, setMatches] = useState<Match[]>([]);
  const [streamSources, setStreamSources] = useState<StreamSource[]>([]);
  
  // State for form
  const [selectedMatch, setSelectedMatch] = useState<string>("");
  const [sourceName, setSourceName] = useState<string>("");
  const [embedCode, setEmbedCode] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  // Load matches and stream sources on mount
  useEffect(() => {
    // Load all matches (both live and upcoming)
    const liveMatches = JSON.parse(localStorage.getItem('liveMatches') || '[]');
    const upcomingMatches = JSON.parse(localStorage.getItem('upcomingMatches') || '[]');
    const allMatches = JSON.parse(localStorage.getItem('matches') || '[]');
    
    // Combine all match sources, but prefer using 'matches' if available
    const combinedMatches = allMatches.length > 0 ? allMatches : [...liveMatches, ...upcomingMatches];
    setMatches(combinedMatches);

    const storedStreamSources = localStorage.getItem('streamSources');
    if (storedStreamSources) {
      setStreamSources(JSON.parse(storedStreamSources));
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMatch || !sourceName || !embedCode) {
      toast.error("Please fill all required fields");
      return;
    }

    const matchId = parseInt(selectedMatch);
    const match = matches.find(m => m.id === matchId);
    
    if (!match) {
      toast.error("Invalid match selection");
      return;
    }

    // Create a slug from team names - used for URL
    const slug = `${match.homeTeam.toLowerCase().replace(/\s+/g, '-')}-vs-${match.awayTeam.toLowerCase().replace(/\s+/g, '-')}-${sourceName.toLowerCase().replace(/\s+/g, '-')}`;

    // Ensure the iframe code is properly formatted
    let formattedEmbedCode = embedCode.trim();
    if (!formattedEmbedCode.includes('<iframe')) {
      // Convert URL to iframe if needed
      formattedEmbedCode = `<iframe src="${formattedEmbedCode}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
    }

    if (isEditing && currentEditId !== null) {
      // Update existing stream source
      const updatedSources = streamSources.map(source => 
        source.id === currentEditId 
          ? { ...source, matchId, name: sourceName, embedCode: formattedEmbedCode, slug } 
          : source
      );
      
      setStreamSources(updatedSources);
      localStorage.setItem('streamSources', JSON.stringify(updatedSources));
      toast.success("Stream source updated successfully");
    } else {
      // Add new stream source
      const newSource = {
        id: Date.now(),
        matchId,
        name: sourceName,
        embedCode: formattedEmbedCode,
        slug
      };
      
      const updatedSources = [...streamSources, newSource];
      setStreamSources(updatedSources);
      localStorage.setItem('streamSources', JSON.stringify(updatedSources));
      toast.success("Stream source added successfully");
    }
    
    // Reset form
    resetForm();
  };

  const handleEdit = (source: StreamSource) => {
    setSelectedMatch(source.matchId.toString());
    setSourceName(source.name);
    setEmbedCode(source.embedCode);
    setIsEditing(true);
    setCurrentEditId(source.id);
  };

  const handleDelete = (id: number) => {
    const updatedSources = streamSources.filter(source => source.id !== id);
    setStreamSources(updatedSources);
    localStorage.setItem('streamSources', JSON.stringify(updatedSources));
    toast.success("Stream source deleted successfully");
  };

  const resetForm = () => {
    setSelectedMatch("");
    setSourceName("");
    setEmbedCode("");
    setIsEditing(false);
    setCurrentEditId(null);
  };

  const getMatchText = (match: Match) => {
    return `${match.homeTeam} vs ${match.awayTeam} (${match.competition})`;
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Manage Stream Sources</h2>
      
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">
          {isEditing ? "Edit Stream Source" : "Add New Stream Source"}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="match" className="text-sm font-medium text-gray-300">
                Select Match *
              </label>
              <Select 
                value={selectedMatch} 
                onValueChange={setSelectedMatch}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select a match" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {matches.length > 0 ? (
                    matches.map(match => (
                      <SelectItem key={match.id} value={match.id.toString()} className="focus:bg-gray-700">
                        {getMatchText(match)}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-matches" disabled>No matches available</SelectItem>
                  )}
                </SelectContent>
              </Select>
              {matches.length === 0 && (
                <p className="text-amber-500 text-xs mt-1">
                  No matches found. Please add matches first.
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="sourceName" className="text-sm font-medium text-gray-300">
                Source Name *
              </label>
              <Input
                id="sourceName"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="e.g. Source 1, English HD, etc."
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="embedCode" className="text-sm font-medium text-gray-300">
              Embed Code (iframe) *
            </label>
            <Input
              id="embedCode"
              value={embedCode}
              onChange={(e) => setEmbedCode(e.target.value)}
              placeholder="<iframe src='https://example.com/embed' ...></iframe> or just the URL"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <p className="text-xs text-gray-400">
              Paste the full iframe code or just the stream URL. We'll convert URLs to proper iframe code automatically.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              type="submit" 
              className="bg-sports-blue hover:bg-blue-700"
            >
              {isEditing ? (
                <>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Update Stream Source
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Stream Source
                </>
              )}
            </Button>
            
            {isEditing && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetForm}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
      
      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <h3 className="p-4 text-xl font-semibold text-white bg-gray-800">Stream Sources</h3>
        {streamSources.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-300">Match</TableHead>
                <TableHead className="text-gray-300">Source Name</TableHead>
                <TableHead className="text-gray-300">Stream URL</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {streamSources.map((source) => {
                const match = matches.find(m => m.id === source.matchId);
                return (
                  <TableRow key={source.id} className="hover:bg-gray-800">
                    <TableCell className="font-medium">
                      {match ? getMatchText(match) : "Match not found"}
                    </TableCell>
                    <TableCell>{source.name}</TableCell>
                    <TableCell className="truncate max-w-xs">
                      <a 
                        href={`/local-stream/${source.slug}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sports-blue hover:underline flex items-center"
                      >
                        <LinkIcon className="h-4 w-4 mr-1" />
                        /local-stream/{source.slug}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          onClick={() => handleEdit(source)} 
                          variant="outline" 
                          size="sm"
                          className="text-gray-300"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          onClick={() => handleDelete(source.id)} 
                          variant="outline" 
                          size="sm"
                          className="text-sports-red"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 bg-gray-900">
            <LinkIcon className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-300">No stream sources added yet</h3>
            <p className="text-gray-500 mt-2">Add your first stream source above</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStreamSources;
