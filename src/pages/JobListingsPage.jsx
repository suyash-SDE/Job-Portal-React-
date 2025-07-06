import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../redux/slices/jobsSlice";
import JobCard from "../components/JobCard";
import useDebounce from "../hooks/useDebounce";
import {
  selectAllJobs,
  selectJobsStatus,
  selectJobsError,
} from "../redux/selectors/jobSelectors";

const JobListingsPage = () => {
  const dispatch = useDispatch();

  const jobs = useSelector(selectAllJobs);
  const jobStatus = useSelector(selectJobsStatus);
  const error = useSelector(selectJobsError);

  const [filterRole, setFilterRole] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [jobsPerPage] = useState(9);
  const [currentJobsDisplayed, setCurrentJobsDisplayed] = useState(jobsPerPage);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (jobStatus === "idle") {
      dispatch(fetchJobs());
    }
  }, [jobStatus, dispatch]);

  useEffect(() => {
    setCurrentJobsDisplayed(jobsPerPage);
  }, [filterRole, filterLocation, debouncedSearchTerm, jobsPerPage]);

  const memoizedFilteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase().trim();
      const lowerCaseFilterRole = filterRole.toLowerCase().trim();
      const lowerCaseFilterLocation = filterLocation.toLowerCase().trim();

      const matchesRole = lowerCaseFilterRole
        ? job.title.toLowerCase().includes(lowerCaseFilterRole)
        : true;

      const matchesLocation = lowerCaseFilterLocation
        ? job.location.toLowerCase().includes(lowerCaseFilterLocation)
        : true;

      const matchesSearch = lowerCaseSearchTerm
        ? job.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          job.company.toLowerCase().includes(lowerCaseSearchTerm)
        : true;

      return matchesRole && matchesLocation && matchesSearch;
    });
  }, [jobs, debouncedSearchTerm, filterRole, filterLocation]);

  const memoizedPaginatedJobs = useMemo(() => {
    return memoizedFilteredJobs.slice(0, currentJobsDisplayed);
  }, [memoizedFilteredJobs, currentJobsDisplayed]);

  const handleSeeMore = () => {
    setCurrentJobsDisplayed((prevCount) => prevCount + jobsPerPage);
  };

  if (jobStatus === "loading") {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-lg text-gray-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
        Loading jobs...
      </div>
    );
  }

  if (jobStatus === "failed") {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600 text-lg">
        Error: {error || "Failed to load jobs."}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Job Listings
      </h1>

      <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-inner flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Filter by Role (e.g., Frontend)"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300 flex-1 min-w-[200px] bg-gray-50 text-gray-800"
          aria-label="Filter by Job Role"
        />
        <input
          type="text"
          placeholder="Filter by Location (e.g., Bangalore)"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300 flex-1 min-w-[200px] bg-gray-50 text-gray-800"
          aria-label="Filter by Job Location"
        />
        <input
          type="text"
          placeholder="Search by Title or Company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300 flex-1 min-w-[200px] bg-gray-50 text-gray-800"
          aria-label="Search by Job Title or Company"
        />
      </div>

      {memoizedPaginatedJobs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memoizedPaginatedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {memoizedFilteredJobs.length > currentJobsDisplayed && (
            <div className="text-center mt-8">
              <button
                onClick={handleSeeMore}
                className="px-6 py-3 bg-violet-950 text-white font-semibold rounded shadow-md hover:bg-violet-950 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition duration-200"
              >
                See More Jobs
                {/* ({memoizedFilteredJobs.length - currentJobsDisplayed} remaining) */}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10 text-gray-600 text-lg bg-white rounded-lg shadow">
          No jobs found matching your criteria. Please adjust your filters or
          search term.
        </div>
      )}
    </div>
  );
};

export default JobListingsPage;
