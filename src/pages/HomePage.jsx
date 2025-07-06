import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-6">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-extrabold text-purple-800 mb-6 animate-pulse">
          Welcome to the Job Portal
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/jobs">
            <button
              className="bg-gray-900 hover:bg-gray-700 rounded text-white font-bold py-3 px-8 
shadow-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              View Job Listings
            </button>
          </Link>
          <Link to="/my-applications">
            <button className="bg-teal-600  hover:bg-teal-700 rounded text-white font-bold py-3 px-8 shadow-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
              My Applications
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
