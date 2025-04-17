
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from 'lucide-react';

interface Match {
  id: number;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  slug: string;
}

interface StreamLink {
  id: number;
  matchId: number;
  name: string;
  url: string;
  quality: string;
}

const formSchema = z.object({
  matchId: z.string().min(1, "Match is required"),
  name: z.string().min(1, "Link name is required"),
  url: z.string().url("Please enter a valid URL"),
  quality: z.string().min(1, "Quality is required"),
});

type FormData = z.infer<typeof formSchema>;

const AddStreamLinks = () => {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [streamLinks, setStreamLinks] = useState<StreamLink[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [matchType, setMatchType] = useState<'all' | 'live' | 'upcoming'>('all');
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matchId: "",
      name: "",
      url: "",
      quality: "HD",
    },
  });

  useEffect(() => {
    // Load matches and links from localStorage
    const loadedLiveMatches = JSON.parse(localStorage.getItem('liveMatches') || '[]');
    const loadedUpcomingMatches = JSON.parse(localStorage.getItem('upcomingMatches') || '[]');
    const loadedStreamLinks = JSON.parse(localStorage.getItem('streamLinks') || '[]');
    
    setLiveMatches(loadedLiveMatches);
    setUpcomingMatches(loadedUpcomingMatches);
    setAllMatches([...loadedLiveMatches, ...loadedUpcomingMatches]);
    setStreamLinks(loadedStreamLinks);
  }, []);

  const onSubmit = (data: FormData) => {
    const matchId = parseInt(data.matchId);
    
    // Create new stream link
    const newLink: StreamLink = {
      id: Date.now(),
      matchId: matchId,
      name: data.name,
      url: data.url,
      quality: data.quality,
    };
    
    const updatedLinks = [...streamLinks, newLink];
    setStreamLinks(updatedLinks);
    localStorage.setItem('streamLinks', JSON.stringify(updatedLinks));
    
    // Reset form fields
    form.reset({
      matchId: data.matchId, // Keep the selected match
      name: "",
      url: "",
      quality: "HD",
    });
    
    toast({
      title: "Stream Link Added",
      description: "The stream link has been added successfully.",
    });
  };

  const handleDelete = (linkId: number) => {
    // Remove the link
    const updatedLinks = streamLinks.filter(link => link.id !== linkId);
    setStreamLinks(updatedLinks);
    localStorage.setItem('streamLinks', JSON.stringify(updatedLinks));
    
    toast({
      title: "Stream Link Removed",
      description: "The stream link has been removed successfully.",
    });
  };

  const handleFilterChange = (type: 'all' | 'live' | 'upcoming') => {
    setMatchType(type);
    setSelectedMatch(null);
    form.setValue("matchId", "");
  };

  const filteredLinks = selectedMatch 
    ? streamLinks.filter(link => link.matchId === selectedMatch)
    : streamLinks;

  const filteredMatches = matchType === 'all' 
    ? allMatches 
    : matchType === 'live' 
      ? liveMatches 
      : upcomingMatches;

  const getMatchName = (matchId: number) => {
    const match = allMatches.find(m => m.id === matchId);
    if (!match) return "Unknown Match";
    return match.awayTeam 
      ? `${match.homeTeam} vs ${match.awayTeam}`
      : match.homeTeam;
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add Stream Links</h2>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant={matchType === 'all' ? 'default' : 'outline'}
            onClick={() => handleFilterChange('all')}
            size="sm"
          >
            All Matches
          </Button>
          <Button 
            variant={matchType === 'live' ? 'default' : 'outline'}
            onClick={() => handleFilterChange('live')}
            size="sm"
          >
            Live Matches
          </Button>
          <Button 
            variant={matchType === 'upcoming' ? 'default' : 'outline'}
            onClick={() => handleFilterChange('upcoming')}
            size="sm"
          >
            Upcoming Matches
          </Button>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="matchId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Match</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedMatch(parseInt(value));
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a match" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredMatches.map((match) => (
                        <SelectItem key={match.id} value={match.id.toString()}>
                          {match.awayTeam 
                            ? `${match.homeTeam} vs ${match.awayTeam}`
                            : match.homeTeam}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="quality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stream Quality</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="HD">HD</SelectItem>
                      <SelectItem value="SD">SD</SelectItem>
                      <SelectItem value="720p">720p</SelectItem>
                      <SelectItem value="1080p">1080p</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Stream 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stream URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/stream" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            className="bg-sports-blue hover:bg-blue-700 w-full"
          >
            Add Stream Link
          </Button>
        </form>
      </Form>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Manage Stream Links</h3>
          <Select
            onValueChange={(value) => setSelectedMatch(value === 'all' ? null : parseInt(value))}
            value={selectedMatch?.toString() || "all"}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Filter by match" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Matches</SelectItem>
              {allMatches.map((match) => (
                <SelectItem key={match.id} value={match.id.toString()}>
                  {match.awayTeam 
                    ? `${match.homeTeam} vs ${match.awayTeam}`
                    : match.homeTeam}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredLinks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No stream links found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Match</TableHead>
                  <TableHead>Link Name</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">
                      {getMatchName(link.matchId)}
                    </TableCell>
                    <TableCell>{link.name}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                        {link.quality}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {link.url}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(link.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStreamLinks;
