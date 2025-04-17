import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, Bell, Filter } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Match {
  id: number;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  slug: string;
}

const Schedule = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<{[key: string]: Match[]}>({});
  const [selectedCompetition, setSelectedCompetition] = useState<string>("all");
  const [competitions, setCompetitions] = useState<string[]>([]);

  useEffect(() => {
    // Load matches from localStorage
    const savedMatches = localStorage.getItem('upcomingMatches');
    if (savedMatches) {
      const parsedMatches = JSON.parse(savedMatches);
      
      // Sort matches by date and time
      const sortedMatches = parsedMatches.sort((a: Match, b: Match) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });
      
      setMatches(sortedMatches);
      
      // Extract unique competitions
      const uniqueCompetitions = Array.from(
        new Set(sortedMatches.map((match: Match) => match.competition))
      ) as string[];
      
      setCompetitions(uniqueCompetitions);

      // Group matches by date
      const grouped = sortedMatches.reduce((acc: {[key: string]: Match[]}, match: Match) => {
        if (!acc[match.date]) {
          acc[match.date] = [];
        }
        acc[match.date].push(match);
        return acc;
      }, {});
      
      setFilteredMatches(grouped);
    }
  }, []);

  const filterByCompetition = (competition: string) => {
    setSelectedCompetition(competition);
    
    if (competition === "all") {
      // Group all matches by date
      const grouped = matches.reduce((acc: {[key: string]: Match[]}, match: Match) => {
        if (!acc[match.date]) {
          acc[match.date] = [];
        }
        acc[match.date].push(match);
        return acc;
      }, {});
      
      setFilteredMatches(grouped);
    } else {
      // Filter and group matches by date
      const filtered = matches.filter(match => match.competition === competition);
      const grouped = filtered.reduce((acc: {[key: string]: Match[]}, match: Match) => {
        if (!acc[match.date]) {
          acc[match.date] = [];
        }
        acc[match.date].push(match);
        return acc;
      }, {});
      
      setFilteredMatches(grouped);
    }
  };

  // Format date as "Monday, April 15" etc.
  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "EEEE, MMMM d");
  };

  // Check if date is today, tomorrow or later
  const getDateLabel = (dateStr: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
    
    if (dateStr === today) return "Today";
    if (dateStr === tomorrow) return "Tomorrow";
    return "Upcoming";
  };

  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Match Schedule</h1>
          
          <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
            <button 
              className={`px-4 py-2 rounded ${selectedCompetition === "all" ? "bg-sports-blue text-white" : "bg-gray-800 text-gray-300"}`}
              onClick={() => filterByCompetition("all")}
            >
              All Competitions
            </button>
            
            {competitions.map(competition => (
              <button 
                key={competition}
                className={`px-4 py-2 rounded whitespace-nowrap ${selectedCompetition === competition ? "bg-sports-blue text-white" : "bg-gray-800 text-gray-300"}`}
                onClick={() => filterByCompetition(competition)}
              >
                {competition}
              </button>
            ))}
          </div>
          
          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="w-full bg-gray-900 mb-6">
              <TabsTrigger value="all" className="flex-1">All Matches</TabsTrigger>
              <TabsTrigger value="today" className="flex-1">Today</TabsTrigger>
              <TabsTrigger value="tomorrow" className="flex-1">Tomorrow</TabsTrigger>
            </TabsList>
            
            {Object.keys(filteredMatches).length === 0 && (
              <div className="bg-gray-900 rounded-lg p-8 text-center">
                <p className="text-gray-400 text-lg">No matches scheduled.</p>
                <p className="text-gray-500 mt-2">Check back later for updates.</p>
              </div>
            )}
            
            <TabsContent value="all">
              {Object.keys(filteredMatches).sort().map((date) => (
                <div key={date} className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="text-sports-blue" />
                    <h2 className="text-xl font-semibold text-white">
                      {formatDateHeader(date)} <span className="text-sports-red ml-2">{getDateLabel(date)}</span>
                    </h2>
                  </div>
                  
                  <div className="grid gap-4">
                    {filteredMatches[date].map((match) => (
                      <div 
                        key={match.id} 
                        className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition"
                      >
                        <div className="text-sm text-gray-400 mb-2">{match.competition}</div>
                        <div className="text-sm text-gray-400 mb-3">{match.time}</div>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <div>
                            <div className="text-lg font-semibold text-white">{match.homeTeam}</div>
                            <div className="text-lg font-semibold text-white">{match.awayTeam}</div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button className="text-sports-blue hover:text-blue-400 transition">
                              <Bell size={18} />
                            </button>
                            
                            <Link
                              to={`/stream/${match.slug}`}
                              className="bg-sports-blue hover:bg-blue-700 text-white text-sm px-4 py-2 rounded flex items-center gap-2"
                            >
                              View Match
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="today">
              {(() => {
                const today = format(new Date(), 'yyyy-MM-dd');
                if (!filteredMatches[today] || filteredMatches[today].length === 0) {
                  return (
                    <div className="bg-gray-900 rounded-lg p-8 text-center">
                      <p className="text-gray-400 text-lg">No matches scheduled for today.</p>
                      <p className="text-gray-500 mt-2">Check back later for updates.</p>
                    </div>
                  );
                }
                
                return (
                  <div className="grid gap-4">
                    {filteredMatches[today]?.map((match) => (
                      <div 
                        key={match.id} 
                        className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition"
                      >
                        <div className="text-sm text-gray-400 mb-2">{match.competition}</div>
                        <div className="text-sm text-gray-400 mb-3">{match.time}</div>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <div>
                            <div className="text-lg font-semibold text-white">{match.homeTeam}</div>
                            <div className="text-lg font-semibold text-white">{match.awayTeam}</div>
                          </div>
                          
                          <Link
                            to={`/stream/${match.slug}`}
                            className="bg-sports-blue hover:bg-blue-700 text-white text-sm px-4 py-2 rounded flex items-center gap-2"
                          >
                            View Match
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </TabsContent>
            
            <TabsContent value="tomorrow">
              {(() => {
                const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
                if (!filteredMatches[tomorrow] || filteredMatches[tomorrow].length === 0) {
                  return (
                    <div className="bg-gray-900 rounded-lg p-8 text-center">
                      <p className="text-gray-400 text-lg">No matches scheduled for tomorrow.</p>
                      <p className="text-gray-500 mt-2">Check back later for updates.</p>
                    </div>
                  );
                }
                
                return (
                  <div className="grid gap-4">
                    {filteredMatches[tomorrow]?.map((match) => (
                      <div 
                        key={match.id} 
                        className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition"
                      >
                        <div className="text-sm text-gray-400 mb-2">{match.competition}</div>
                        <div className="text-sm text-gray-400 mb-3">{match.time}</div>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <div>
                            <div className="text-lg font-semibold text-white">{match.homeTeam}</div>
                            <div className="text-lg font-semibold text-white">{match.awayTeam}</div>
                          </div>
                          
                          <Link
                            to={`/stream/${match.slug}`}
                            className="bg-sports-blue hover:bg-blue-700 text-white text-sm px-4 py-2 rounded flex items-center gap-2"
                          >
                            View Match
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;
