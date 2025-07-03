import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyForJob } from '../redux/slices/applicationsSlice';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const dispatch = useDispatch();
  const appliedJobs = useSelector(state => state.applications.appliedJobs);

  const isApplied = appliedJobs.some(appliedJob => appliedJob.id === job.id);

  const handleApply = () => {
    // Adding a simple confirmation for user experience
    if (!isApplied && window.confirm(`Are you sure you want to apply for "${job.title}" at ${job.company}?`)) {
      dispatch(applyForJob(job));
      alert(`Successfully applied for "${job.title}"!`); //  feedback
    } else if (isApplied) {
      alert(`You have already applied for "${job.title}".`); // if already applied
    }
  };

  return (
    
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-7 flex flex-col justify-between hover:shadow-2xl hover:border-fuchsia-400 ">
      
      <Link to={`/jobs/${job.id}`} className="block text-decoration-none text-gray-800">
       
        <h3 className="text-2xl font-bold text-fuchsia-400  mb-3">{job.title}</h3>
        
        <p className="text-gray-700 text-base mb-2 flex items-center"> 
          <strong className="font-semibold">Company:</strong> {job.company}
        </p>
        <p className="text-gray-700 text-base mb-4 flex items-center"> 
          <strong className="font-semibold">Location:</strong> {job.location}
        </p>
        
        <p className="text-base text-red-500 font-bold mb-5 flex items-center">
          <strong className="font-medium">Deadline:</strong> {job.deadline}
        </p>
      </Link>

      {/* Button Section */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end"> 
        <button
          onClick={handleApply}
          className={`px-6 py-3 rounded text-lg font-bold transition-all duration-300 shadow-md
            ${isApplied
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed hover:shadow-sm' 
              : 'bg-violet-950 hover:bg-violet-950 text-white hover:scale-105 ' 
            }
          `}
          disabled={isApplied}
        >
          {isApplied ? 'Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;

