
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-sports-dark flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-sports-red mb-4">404</h1>
          <p className="text-2xl text-white mb-8">Oops! Page not found</p>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            The page you're looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <Link 
            to="/" 
            className="bg-sports-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded inline-flex items-center transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
