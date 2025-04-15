
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

interface EditMatchProps {
  match: Match;
  onSave: (updatedMatch: Match) => void;
  matchType: 'live' | 'upcoming';
}

const formSchema = z.object({
  competition: z.string().min(1, "Competition is required"),
  homeTeam: z.string().min(1, "Home team is required"),
  awayTeam: z.string(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  slug: z.string().min(1, "Slug is required"),
  score: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const EditMatch: React.FC<EditMatchProps> = ({ match, onSave, matchType }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      competition: match.competition,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      date: match.date,
      time: match.time,
      slug: match.slug,
      score: match.score || '',
    },
  });

  const onSubmit = (data: FormData) => {
    onSave({
      ...match,
      competition: data.competition,
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      date: data.date,
      time: data.time,
      slug: data.slug,
      score: data.score,
    });
  };

  const generateSlug = () => {
    const homeTeam = form.getValues('homeTeam').toLowerCase().replace(/\s+/g, '-');
    const awayTeam = form.getValues('awayTeam').toLowerCase().replace(/\s+/g, '-');
    const slug = awayTeam ? `${homeTeam}-vs-${awayTeam}` : homeTeam;
    form.setValue('slug', slug);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="homeTeam"
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
            name="awayTeam"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Away Team</FormLabel>
                <FormControl>
                  <Input placeholder="Away Team (optional for single events)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {matchType === 'live' && (
          <FormField
            control={form.control}
            name="score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Score</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 2-1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
        
        <div className="flex justify-end gap-2 pt-2">
          <Button type="submit" className="bg-sports-blue hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditMatch;
