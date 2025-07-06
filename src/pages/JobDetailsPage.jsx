import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  selectJobById,
  selectIsJobApplied,
} from "../redux/selectors/jobSelectors";

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const job = useSelector((state) => selectJobById(state, jobId));
  const isApplied = useSelector((state) => selectIsJobApplied(state, jobId));

  useEffect(() => {
    if (!job) {
      toast.error("Job details not found. Redirecting to listings.");
      navigate("/jobs");
    }
  }, [job, navigate]);

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-xl text-gray-500">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-violet-700 mb-3">{job.title}</h2>
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">
          {job.company}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg mb-8">
          <p>
            <strong className="text-gray-800">Location:</strong>{" "}
            <span className="text-gray-600">{job.location}</span>
          </p>
          <p>
            <strong className="text-gray-800">Deadline:</strong>{" "}
            <span className="text-gray-600">{job.deadline}</span>
          </p>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8">
          <h4 className="text-2xl font-bold text-gray-800 mb-4">
            Job Description:
          </h4>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-end gap-4">
          {isApplied ? (
            <button
              className="px-8 py-3 rounded font-bold text-white bg-gray-400 cursor-not-allowed shadow-md"
              disabled={true}
            >
              Applied
            </button>
          ) : (
            <Link to={`/apply/${job.id}`} className="no-underline">
              <button className="px-8 py-3 rounded font-bold text-white  bg-violet-950 hover:bg-violet-900 transition-colors duration-300 shadow-md transform hover:scale-105 active:scale-95">
                Apply for this Job
              </button>
            </Link>
          )}
          <button
            onClick={() => navigate("/jobs")}
            className="px-8 py-3 rounded font-bold text-neutral-600 border border-neutral-600 hover:bg-gray-100 transition-colors duration-300 shadow-sm"
          >
            Back to Listings
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
