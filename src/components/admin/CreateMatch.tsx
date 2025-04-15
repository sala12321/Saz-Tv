
import React, { useState } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  competition: z.string().min(1, "Competition is required"),
  homeTeam: z.string().min(1, "Home team is required"),
  awayTeam: z.string(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  type: z.string().min(1, "Match type is required"),
  slug: z.string().min(1, "Slug is required"),
});

type FormData = z.infer<typeof formSchema>;

const CreateMatch = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      competition: "",
      homeTeam: "",
      awayTeam: "",
      date: "",
      time: "",
      type: "upcoming",
      slug: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    
    // Get existing matches from localStorage
    const existingLiveMatches = JSON.parse(localStorage.getItem('liveMatches') || '[]');
    const existingUpcomingMatches = JSON.parse(localStorage.getItem('upcomingMatches') || '[]');
    
    const newMatch = {
      id: Date.now(),
      competition: data.competition,
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      date: data.date,
      time: data.time,
      slug: data.slug,
      score: data.type === 'live' ? '0-0' : '',
      links: 0
    };

    // Add match to the appropriate list
    if (data.type === 'live') {
      localStorage.setItem('liveMatches', JSON.stringify([...existingLiveMatches, newMatch]));
    } else {
      localStorage.setItem('upcomingMatches', JSON.stringify([...existingUpcomingMatches, newMatch]));
    }

    // Show success message
    toast({
      title: "Match Created",
      description: `${data.homeTeam} vs ${data.awayTeam} has been created successfully.`,
    });

    // Reset form
    form.reset();
    setIsSubmitting(false);
  };

  const generateSlug = () => {
    const homeTeam = form.getValues('homeTeam').toLowerCase().replace(/\s+/g, '-');
    const awayTeam = form.getValues('awayTeam').toLowerCase().replace(/\s+/g, '-');
    const slug = awayTeam ? `${homeTeam}-vs-${awayTeam}` : homeTeam;
    form.setValue('slug', slug);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create New Match</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Match Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select match type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
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
          
          <Button 
            type="submit" 
            className="bg-sports-blue hover:bg-blue-700 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Match"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateMatch;
