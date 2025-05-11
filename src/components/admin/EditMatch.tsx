import React from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Match } from '@/types/supabase';

const formSchema = z.object({
  competition: z.string().min(1, "Competition is required"),
  home_team: z.string().min(1, "Home team is required"),
  away_team: z.string().nullable(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  slug: z.string().min(1, "Slug is required"),
  score: z.string().nullable().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface EditMatchProps {
  match: Match;
  onSave: (updatedMatch: Match) => void;
  matchType: 'live' | 'upcoming';
}

const EditMatch = ({ match, onSave, matchType }: EditMatchProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      competition: match.competition,
      home_team: match.home_team,
      away_team: match.away_team,
      date: match.date,
      time: match.time,
      slug: match.slug,
      score: match.score || '',
    },
  });

  const handleSubmit = (data: FormData) => {
    const updatedMatch: Match = {
      ...match,
      competition: data.competition,
      home_team: data.home_team,
      away_team: data.away_team,
      date: data.date,
      time: data.time,
      slug: data.slug,
      score: matchType === 'live' ? (data.score || '0-0') : null,
    };
    
    onSave(updatedMatch);
  };

  const generateSlug = () => {
    const homeTeam = form.getValues('home_team').toLowerCase().replace(/\s+/g, '-');
    const awayTeam = form.getValues('away_team')?.toLowerCase().replace(/\s+/g, '-');
    const slug = awayTeam ? `${homeTeam}-vs-${awayTeam}` : homeTeam;
    form.setValue('slug', slug);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="competition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Competition</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. UEFA Champions League" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {matchType === 'live' && (
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Score</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 2-1" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="home_team"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Team</FormLabel>
                <FormControl>
                  <Input placeholder="Home Team" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="away_team"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Away Team</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Away Team (optional for single events)" 
                    {...field} 
                    value={field.value || ''} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 items-end">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>URL Slug</FormLabel>
                <FormControl>
                  <Input placeholder="team-vs-team" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={generateSlug}
            className="mb-2"
          >
            Generate Slug
          </Button>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="submit" className="bg-sports-blue hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditMatch;
