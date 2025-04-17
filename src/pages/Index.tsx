
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import LiveMatches from '../components/LiveMatches';
import TomorrowMatches from '../components/TomorrowMatches';
import PopularCompetitions from '../components/PopularCompetitions';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <LiveMatches />
        <TomorrowMatches />
        <PopularCompetitions />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
