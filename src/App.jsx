import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobListingsPage from "./pages/JobListingsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 p-4 shadow-lg">
        {" "}
        <li className="text-2xl font-bold tracking-wider text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-105 inline-block">
        Job<span className="text-yellow-700">Portal</span>
        </li>
        <ul className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
          <li>
            <NavLink
              to="/"
              end
              className={
                ({ isActive }) =>
                  `text-white text-lg font-semibold px-4 py-2 rounded-md transition-colors duration-300
                ${
                  isActive
                    ? "bg-yellow-700 shadow-inner"
                    : "hover:bg-yellow-700"
                }` 
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jobs"
              className={
                ({ isActive }) =>
                  `text-white text-lg font-semibold px-4 py-2 rounded-md transition-colors duration-300
                ${
                  isActive
                    ? "bg-yellow-700 shadow-inner"
                    : "hover:bg-yellow-700"
                }` 
              }
            >
              Job Listings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-applications"
              className={
                ({ isActive }) =>
                  `text-white text-lg font-semibold px-4 py-2 rounded-md transition-colors duration-300
                ${
                  isActive
                    ? "bg-yellow-700 shadow-inner"
                    : "hover:bg-yellow-700"
                }` 
              }
            >
              My Applications
            </NavLink>
          </li>
        </ul>
      </nav>

    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobListingsPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="/my-applications" element={<MyApplicationsPage />} />
        
        <Route
          path="*"
          element={
            <div className="container mx-auto px-4 py-16 text-center text-4xl font-bold text-gray-700">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
