
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Copy, CreditCard, Heart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const Donate = () => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: `${label} copied to clipboard!`,
    });
  };
  
  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <Heart className="text-sports-red w-8 h-8 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">Support SazTV</h1>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 md:p-8 mb-8 text-center">
              <p className="text-xl text-gray-200 mb-6">
                SazTV is a free platform maintained by developers who are passionate about making sports accessible
                to everyone. Your donations help us keep the servers running and develop new features.
              </p>
              
              <div className="inline-flex items-center justify-center bg-sports-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition mb-4">
                <CreditCard className="mr-2" size={20} />
                <span>Donate with Credit Card</span>
              </div>
              
              <p className="text-gray-400 mb-8">
                Or use one of the cryptocurrency options below
              </p>
              
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-5">
                  <h3 className="text-lg font-medium text-white mb-2">Bitcoin (BTC)</h3>
                  <div className="flex items-center justify-between bg-gray-700 rounded p-3 mb-2">
                    <code className="text-sm text-gray-300 truncate">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</code>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'BTC address')}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-5">
                  <h3 className="text-lg font-medium text-white mb-2">Ethereum (ETH)</h3>
                  <div className="flex items-center justify-between bg-gray-700 rounded p-3 mb-2">
                    <code className="text-sm text-gray-300 truncate">0x1ED3d2cDe39Cf6988C688d98435DBf9c3d9d08B9</code>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard('0x1ED3d2cDe39Cf6988C688d98435DBf9c3d9d08B9', 'ETH address')}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 md:p-8 text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">Thank You!</h2>
              <p className="text-gray-300">
                Every donation, no matter the size, helps us keep SazTV running. We appreciate your support!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
