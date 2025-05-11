
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import EditMatch from './EditMatch';
import { supabase } from '@/lib/supabase';
import type { Match } from '@/types/supabase';

const ManageMatches = () => {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [selectedType, setSelectedType] = useState<'live' | 'upcoming'>('live');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMatches = async () => {
    setLoading(true);
    try {
      // Fetch live matches
      const { data: liveData, error: liveError } = await supabase
        .from('matches')
        .select('*')
        .eq('type', 'live');

      if (liveError) {
        toast({
          title: "Error",
          description: `Failed to fetch live matches: ${liveError.message}`,
          variant: "destructive",
        });
        return;
      }

      // Fetch upcoming matches
      const { data: upcomingData, error: upcomingError } = await supabase
        .from('matches')
        .select('*')
        .eq('type', 'upcoming');

      if (upcomingError) {
        toast({
          title: "Error",
          description: `Failed to fetch upcoming matches: ${upcomingError.message}`,
          variant: "destructive",
        });
        return;
      }

      setLiveMatches(liveData || []);
      setUpcomingMatches(upcomingData || []);
    } catch (error) {
      console.error("Error fetching matches:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while fetching matches.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('matches')
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: `Failed to delete match: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      // Refresh matches
      await fetchMatches();

      toast({
        title: "Match Deleted",
        description: "The match has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting match:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting the match.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (match: Match) => {
    setSelectedMatch(match);
    setIsDialogOpen(true);
  };

  const handleSaveEdit = async (updatedMatch: Match) => {
    try {
      const { error } = await supabase
        .from('matches')
        .update({
          competition: updatedMatch.competition,
          home_team: updatedMatch.home_team,
          away_team: updatedMatch.away_team,
          date: updatedMatch.date,
          time: updatedMatch.time,
          slug: updatedMatch.slug,
          score: updatedMatch.score,
          type: updatedMatch.type
        })
        .eq('id', updatedMatch.id);

      if (error) {
        toast({
          title: "Error",
          description: `Failed to update match: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      // Refresh matches
      await fetchMatches();

      setIsDialogOpen(false);
      toast({
        title: "Match Updated",
        description: "The match has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating match:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while updating the match.",
        variant: "destructive",
      });
    }
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

      {loading ? (
        <div className="text-center py-8 text-gray-400">
          Loading matches...
        </div>
      ) : currentMatches.length === 0 ? (
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
                    {match.home_team}
                    {match.away_team && <> vs {match.away_team}</>}
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
