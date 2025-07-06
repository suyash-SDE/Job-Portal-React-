import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { removeApplication } from "../redux/slices/applicationsSlice";
import { selectAppliedJobs } from "../redux/selectors/jobSelectors";
import useConfirm from "../hooks/useConfirm.jsx";

const MyApplicationsPage = () => {
  const appliedJobs = useSelector(selectAppliedJobs);
  const dispatch = useDispatch();
  const { confirm, ConfirmComponent } = useConfirm();

  const handleRemoveApplication = async (jobId, jobTitle) => {
    const isConfirmed = await confirm(
      `Are you sure you want to remove your application for "${jobTitle}"?`
    );

    if (isConfirmed) {
      dispatch(removeApplication(jobId));
      toast.info(`Application for "${jobTitle}" has been removed.`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        My Applications
      </h1>

      {appliedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <Link
                to={`/jobs/${job.id}`}
                className="block no-underline text-gray-800"
              >
                <h3 className="text-xl font-semibold text-violet-700 mb-2">
                  {job.title}
                </h3>
                <p className="text-gray-700 mb-1">
                  <strong className="font-medium">Company:</strong>{" "}
                  {job.company}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong className="font-medium">Location:</strong>{" "}
                  {job.location}
                </p>
                <p className="text-sm italic text-gray-500">
                  <strong className="font-medium">Applied On:</strong>{" "}
                  {job.applicationDate
                    ? new Date(job.applicationDate).toLocaleDateString()
                    : "N/A"}{" "}
                </p>
                {job.applicantData && (
                  <div className="text-sm text-gray-600 border-t border-gray-100 pt-3 mt-3">
                    <p>
                      <strong>Applicant:</strong>{" "}
                      {job.applicantData.applicantName}
                    </p>
                    <p>
                      <strong>Email:</strong> {job.applicantData.applicantEmail}
                    </p>
                    <p className="truncate">
                      {" "}
                      <strong>Resume:</strong>{" "}
                      <a
                        href={job.applicantData.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline  "
                      >
                        {job.applicantData.resumeUrl}
                      </a>
                    </p>
                  </div>
                )}
              </Link>
              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => handleRemoveApplication(job.id, job.title)}
                  className="px-4 py-2 rounded font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 shadow-sm"
                >
                  Remove Application
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg shadow-inner mt-10">
          <p className="text-xl text-gray-600 mb-6">
            You haven't applied for any jobs yet.
          </p>
          <Link to="/jobs" className="no-underline">
            <button className="bg-violet-700 hover:bg-violet-800 text-white font-bold py-3 px-8 rounded shadow-md transform hover:scale-105 transition-all duration-300">
              Browse Job Listings
            </button>
          </Link>
        </div>
      )}
      <ConfirmComponent />
    </div>
  );
};

export default MyApplicationsPage;
