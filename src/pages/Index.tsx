
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import UpcomingMatches from '../components/UpcomingMatches';
import TomorrowMatches from '../components/TomorrowMatches';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <UpcomingMatches />
        <TomorrowMatches />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
