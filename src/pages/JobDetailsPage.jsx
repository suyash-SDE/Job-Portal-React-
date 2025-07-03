import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { applyForJob } from '../redux/slices/applicationsSlice';

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.jobs.items);
  const appliedJobs = useSelector(state => state.applications.appliedJobs);

  const job = jobs.find((j) => j.id === jobId);

  const isApplied = appliedJobs.some(appliedJob => appliedJob.id === job?.id);

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Job Not Found</h2>
        <p className="text-lg text-gray-600 mb-6">The job you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/jobs')}
          className="bg-blue-600 hover:bg-emerald-400 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Back to Job Listings
        </button>
      </div>
    );
  }

  const handleApply = () => {
    dispatch(applyForJob(job));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-yellow-600 mb-3">{job.title}</h2>
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">{job.company}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg mb-8">
          <p><strong className="text-gray-800">Location:</strong> <span className="text-gray-600">{job.location}</span></p>
          <p><strong className="text-gray-800">Deadline:</strong> <span className="text-gray-600">{job.deadline}</span></p>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8">
          <h4 className="text-2xl font-bold text-gray-800 mb-4">Job Description:</h4>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-end gap-4">
          <button
            onClick={handleApply}
            className={`px-8 py-3 rounded-lg font-bold text-white transition-colors duration-300
              ${isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
            `}
            disabled={isApplied}
          >
            {isApplied ? 'Applied' : 'Apply for this Job'}
          </button>
          <button
            onClick={() => navigate('/jobs')}
            className="px-8 py-3 rounded-lg font-bold text-neutral-600 border border-neutral-600 hover:bg-blue-50 transition-colors duration-300"
          >
            Back to Listings
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;