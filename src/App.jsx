import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom"; // Import Link

const HomePage = lazy(() => import("./pages/HomePage"));
const JobListingsPage = lazy(() => import("./pages/JobListingsPage"));
const JobDetailsPage = lazy(() => import("./pages/JobDetailsPage"));
const MyApplicationsPage = lazy(() => import("./pages/MyApplicationsPage"));
const ApplicationFormPage = lazy(() => import("./pages/ApplicationFormPage"));

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <nav className="bg-gray-800 p-4 shadow-lg">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold tracking-wider text-white hover:text-blue-400 transition-colors duration-300 mb-4 sm:mb-0 "
            >
              Job<span className="text-violet-500">Portal</span>
            </Link>
            <ul className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `no-underline [text-decoration:none] text-gray-300 text-lg font-semibold px-4 py-2 rounded-md transition-colors duration-300
                    ${
                      isActive
                        ? "bg-violet-900 text-white shadow-inner"
                        : "hover:bg-gray-700"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/jobs"
                  className={({ isActive }) =>
                    `no-underline [text-decoration:none] text-gray-300 text-lg font-semibold px-4 py-2 rounded-md transition-colors duration-300
                    ${
                      isActive
                        ? "bg-violet-900 text-white shadow-inner"
                        : "hover:bg-gray-700"
                    }`
                  }
                >
                  Job Listings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-applications"
                  className={({ isActive }) =>
                    `no-underline [text-decoration:none] text-gray-300 text-lg font-semibold px-4 py-2 rounded-md transition-colors duration-300
                    ${
                      isActive
                        ? "bg-violet-900 text-white shadow-inner"
                        : "hover:bg-gray-700"
                    }`
                  }
                >
                  My Applications
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <main className="flex-grow container mx-auto px-4 py-8">
          <Suspense
            fallback={
              <div className="text-center text-xl text-gray-500 py-20">
                Loading content...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs" element={<JobListingsPage />} />
              <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
              <Route path="/apply/:jobId" element={<ApplicationFormPage />} />
              <Route path="/my-applications" element={<MyApplicationsPage />} />
              <Route
                path="*"
                element={
                  <div className="container mx-auto px-4 py-16 text-center text-4xl font-bold text-gray-700">
                    404 - Page Not Found
                    <p className="mt-4 text-lg">
                      The page you are looking for does not exist.
                    </p>
                    <Link
                      to="/"
                      className="text-violet-600 hover:underline mt-4 inline-block"
                    >
                      Go to Home
                    </Link>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </main>

        <footer className="bg-gray-800 text-gray-400 text-center p-4 text-sm mt-8">
          &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
