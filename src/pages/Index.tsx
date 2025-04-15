
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SportsCategories from '../components/SportsCategories';
import LiveMatches from '../components/LiveMatches';
import TomorrowMatches from '../components/TomorrowMatches';
import PopularCompetitions from '../components/PopularCompetitions';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-2">
          <Link 
            to="/live" 
            className="inline-flex items-center gap-2 text-sports-blue hover:text-blue-400 transition mb-4"
          >
            <PlayCircle size={20} />
            <span className="font-medium">View All Live Streams</span>
          </Link>
        </div>
        <SportsCategories />
        <LiveMatches />
        <TomorrowMatches />
        <PopularCompetitions />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
