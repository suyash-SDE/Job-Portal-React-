import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectIsJobApplied } from "../redux/selectors/jobSelectors";

const JobCard = ({ job }) => {
  const isApplied = useSelector((state) => selectIsJobApplied(state, job.id));

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-7 flex flex-col justify-between hover:shadow-2xl hover:border-violet-400 transition-all duration-300">
      <Link to={`/jobs/${job.id}`} className="block no-underline text-gray-800">
        <h3 className="text-2xl font-bold text-violet-700 mb-3">{job.title}</h3>
        <p className="text-gray-700 text-base mb-2 flex items-center ">
          <strong className="font-semibold mr-1 ">Company:</strong>{" "}
          {job.company}
        </p>
        <p className="text-gray-700 text-base mb-4 flex items-center">
          <strong className="font-semibold mr-1">Location:</strong>{" "}
          {job.location}
        </p>
        <p className="text-base text-red-500 font-bold mb-5 flex items-center">
          <strong className="font-medium mr-1">Deadline:</strong> {job.deadline}
        </p>
      </Link>

      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end">
        {isApplied ? (
          <button
            className="px-6 py-3 rounded text-lg font-bold transition-all duration-300 shadow-md
              bg-gray-300 text-gray-600 cursor-not-allowed hover:shadow-sm"
            disabled={true}
          >
            Applied
          </button>
        ) : (
          <Link to={`/apply/${job.id}`} className="no-underline">
            <button
              className="px-6 py-3 rounded text-lg font-bold transition-all duration-300 shadow-md
                bg-violet-950 hover:bg-violet-800 text-white hover:scale-105 active:scale-95"
            >
              Apply Now
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobCard;
