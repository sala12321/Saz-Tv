
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">About SazTV</h1>
          
          <div className="bg-gray-900 rounded-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              SazTV was created with a simple mission: to provide sports fans around the world with easy access 
              to live sports content. We believe that everyone should be able to enjoy their favorite sports 
              without barriers.
            </p>
            <p className="text-gray-300">
              Our platform aggregates streaming links from across the web, making it easier for fans to find 
              reliable sources to watch their favorite matches and competitions.
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">The Developer</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center text-4xl text-gray-600">
                SZ
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Saz Developer</h3>
                <p className="text-gray-400 mb-4">Full Stack Web Developer</p>
                <p className="text-gray-300">
                  As a passionate sports fan and web developer, I created SazTV to solve a problem I faced myself: 
                  finding reliable streams for sporting events. What started as a personal project has grown into 
                  a platform used by thousands of sports fans across the globe.
                </p>
                <p className="text-gray-300 mt-4">
                  I'm committed to continuously improving SazTV and adding new features to enhance the user experience. 
                  Your feedback and suggestions are always welcome!
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Legal Disclaimer</h2>
            <p className="text-gray-300">
              SazTV does not host any content on its servers. All content is provided by third-party sources. 
              We simply aggregate links that are already available on the internet. If you believe any content 
              violates copyright, please contact the respective websites directly.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
