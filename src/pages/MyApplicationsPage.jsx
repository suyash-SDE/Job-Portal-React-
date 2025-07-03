import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MyApplicationsPage = () => {
  const appliedJobs = useSelector((state) => state.applications.appliedJobs);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">My Applications</h1>
      {appliedJobs.length > 0 ? (
        <div className="space-y-4 max-w-2xl mx-auto">
          {appliedJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <Link to={`/jobs/${job.id}`} className="block text-decoration-none text-gray-800">
                <h3 className="text-xl font-semibold text-yellow-600 mb-2">{job.title}</h3>
                <p className="text-gray-700 mb-1"><strong className="font-medium">Company:</strong> {job.company}</p>
                <p className="text-gray-700 mb-1"><strong className="font-medium">Location:</strong> {job.location}</p>
                <p className="text-sm italic text-gray-500"><strong className="font-medium">Applied On:</strong> {new Date().toLocaleDateString()}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg shadow-inner mt-10">
          <p className="text-xl text-gray-600 mb-6">You haven't applied for any jobs yet.</p>
          <Link to="/jobs">
            <button className="bg-pink-700 hover:bg-fuchsia-700 text-white font-bold py-3 px-8 rounded shadow-md transform hover:scale-105 transition-all duration-300">
              Browse Job Listings
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyApplicationsPage;
