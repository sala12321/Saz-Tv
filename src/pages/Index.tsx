
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import UpcomingMatches from '../components/UpcomingMatches';
import TomorrowMatches from '../components/TomorrowMatches';
import LiveMatches from '../components/LiveMatches';
import Footer from '../components/Footer';
import { isSupabaseConfigured } from '../lib/supabase';
import { AlertCircle } from 'lucide-react';

const Index = () => {
  const [supabaseConfigured, setSupabaseConfigured] = useState(true);

  useEffect(() => {
    setSupabaseConfigured(isSupabaseConfigured());
  }, []);

  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow">
        {!supabaseConfigured && (
          <div className="bg-amber-500 text-black p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <AlertCircle size={18} />
              <span>Supabase configuration is missing. Please set the environment variables.</span>
            </div>
          </div>
        )}
        <Hero />
        <LiveMatches />
        <UpcomingMatches />
        <TomorrowMatches />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
