import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from '../redux/slices/jobsSlice';
import JobCard from '../components/JobCard';

const JobListingsPage = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.items);
  const jobStatus = useSelector((state) => state.jobs.status);
  const error = useSelector((state) => state.jobs.error);

  const [filterRole, setFilterRole] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (jobStatus === 'idle') {
      dispatch(fetchJobs());
    }
  }, [jobStatus, dispatch]);

  const filteredJobs = jobs.filter(job => {
    const matchesRole = filterRole ? job.title.toLowerCase().includes(filterRole.toLowerCase()) : true;
    const matchesLocation = filterLocation ? job.location.toLowerCase().includes(filterLocation.toLowerCase()) : true;
    const matchesSearch = searchTerm
      ? (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         job.company.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;

    return matchesRole && matchesLocation && matchesSearch;
  });

  if (jobStatus === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-lg text-gray-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        Loading jobs...
      </div>
    );
  }

  if (jobStatus === 'failed') {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600 text-lg">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Job Listings</h1>

      {/* Filter and Search Section */}
      <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-inner flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Filter by Role (e.g., Frontend)"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-200 flex-1 min-w-[200px]"
        />
        <input
          type="text"
          placeholder="Filter by Location (e.g., Bangalore)"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-200 flex-1 min-w-[200px]"
        />
        <input
          type="text"
          placeholder="Search by Title or Company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-200 flex-1 min-w-[200px]"
        />
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-600 text-lg">No jobs found matching your criteria.</div>
      )}
    </div>
  );
};

export default JobListingsPage;