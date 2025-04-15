
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import EditMatch from './EditMatch';

interface Match {
  id: number;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  slug: string;
  score?: string;
  links: number;
}

const ManageMatches = () => {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [selectedType, setSelectedType] = useState<'live' | 'upcoming'>('live');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load matches from localStorage
    const loadedLiveMatches = JSON.parse(localStorage.getItem('liveMatches') || '[]');
    const loadedUpcomingMatches = JSON.parse(localStorage.getItem('upcomingMatches') || '[]');
    
    setLiveMatches(loadedLiveMatches);
    setUpcomingMatches(loadedUpcomingMatches);
  }, []);

  const handleDelete = (id: number) => {
    if (selectedType === 'live') {
      const updatedMatches = liveMatches.filter(match => match.id !== id);
      setLiveMatches(updatedMatches);
      localStorage.setItem('liveMatches', JSON.stringify(updatedMatches));
    } else {
      const updatedMatches = upcomingMatches.filter(match => match.id !== id);
      setUpcomingMatches(updatedMatches);
      localStorage.setItem('upcomingMatches', JSON.stringify(updatedMatches));
    }

    toast({
      title: "Match Deleted",
      description: "The match has been successfully deleted.",
    });
  };

  const handleEdit = (match: Match) => {
    setSelectedMatch(match);
    setIsDialogOpen(true);
  };

  const handleSaveEdit = (updatedMatch: Match) => {
    if (selectedType === 'live') {
      const updatedMatches = liveMatches.map(match => 
        match.id === updatedMatch.id ? updatedMatch : match
      );
      setLiveMatches(updatedMatches);
      localStorage.setItem('liveMatches', JSON.stringify(updatedMatches));
    } else {
      const updatedMatches = upcomingMatches.map(match => 
        match.id === updatedMatch.id ? updatedMatch : match
      );
      setUpcomingMatches(updatedMatches);
      localStorage.setItem('upcomingMatches', JSON.stringify(updatedMatches));
    }

    setIsDialogOpen(false);
    toast({
      title: "Match Updated",
      description: "The match has been successfully updated.",
    });
  };

  const currentMatches = selectedType === 'live' ? liveMatches : upcomingMatches;

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Manage Matches</h2>
        <div className="flex gap-2">
          <Button 
            variant={selectedType === 'live' ? 'default' : 'outline'}
            onClick={() => setSelectedType('live')}
          >
            Live Matches
          </Button>
          <Button 
            variant={selectedType === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setSelectedType('upcoming')}
          >
            Upcoming Matches
          </Button>
        </div>
      </div>

      {currentMatches.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No {selectedType} matches found. Create some matches first.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Competition</TableHead>
                <TableHead>Teams</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMatches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell className="font-medium">{match.competition}</TableCell>
                  <TableCell>
                    {match.homeTeam}
                    {match.awayTeam && <> vs {match.awayTeam}</>}
                  </TableCell>
                  <TableCell>
                    {match.date} <br />
                    <span className="text-sm text-gray-400">{match.time}</span>
                  </TableCell>
                  <TableCell>
                    {selectedType === 'live' ? (
                      <span className="live-badge">LIVE</span>
                    ) : (
                      <span className="text-yellow-500">Upcoming</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(match)}>
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(match.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Match</DialogTitle>
          </DialogHeader>
          {selectedMatch && (
            <EditMatch 
              match={selectedMatch} 
              onSave={handleSaveEdit} 
              matchType={selectedType}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageMatches;
