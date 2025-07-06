import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyForJob } from "../redux/slices/applicationsSlice";
import { toast } from "react-toastify";
import { submitApplicationApi } from "../services/jobService";
import {
  selectJobById,
  selectIsJobApplied,
} from "../redux/selectors/jobSelectors";

const ApplicationFormPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const job = useSelector((state) => selectJobById(state, jobId));
  const isApplied = useSelector((state) => selectIsJobApplied(state, jobId));

  // State for form inputs
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status during submission

  useEffect(() => {
    if (!job) {
      toast.error("Job not found! Redirecting to listings.");
      navigate("/jobs");
    }
  }, [job, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isApplied) {
      toast.info(`You have already applied for "${job.title}".`);
      navigate("/my-applications");
      return;
    }
    if (!applicantName.trim() || !applicantEmail.trim() || !resumeUrl.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicantEmail.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      new URL(resumeUrl.trim());
    } catch (_) {
      toast.error("Please enter a valid URL for your resume.");
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true

      const apiResponse = await submitApplicationApi({
        jobId: job.id,
        applicantName: applicantName.trim(),
        applicantEmail: applicantEmail.trim(),
        resumeUrl: resumeUrl.trim(),
      });
      dispatch(
        applyForJob({
          ...job, // Spread existing job details
          applicantData: {
            applicantName: applicantName.trim(),
            applicantEmail: applicantEmail.trim(),
            resumeUrl: resumeUrl.trim(),
          },
          applicationDate: new Date().toISOString(),
        })
      );

      toast.success(
        apiResponse.message ||
          `Application for "${job.title}" submitted successfully!`
      );
      navigate("/my-applications");
    } catch (error) {
      toast.error(
        `Failed to submit application: ${error.message || "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-xl text-gray-500">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-violet-950 mb-6 text-center">
          Apply for {job.title}
        </h2>
        <p className="text-lg text-gray-700 mb-4 text-center">
          at <strong className="text-gray-900">{job.company}</strong> in{" "}
          <strong className="text-gray-900">{job.location}</strong>
        </p>

        {isApplied ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md text-center mb-6">
            <p className="font-semibold">
              You have already applied for this position!
            </p>
            <button
              onClick={() => navigate("/my-applications")}
              className="mt-4 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-md transition-colors duration-200 shadow"
            >
              View My Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="applicantName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="applicantName"
                name="applicantName"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-base bg-gray-50 text-gray-900"
                aria-required="true"
              />
            </div>
            <div>
              <label
                htmlFor="applicantEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="applicantEmail"
                name="applicantEmail"
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-Violet-500 sm:text-base bg-gray-50 text-gray-900"
                aria-required="true"
              />
            </div>
            <div>
              <label
                htmlFor="resumeUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Resume Link (e.g., Google Drive, Dropbox){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="resumeUrl"
                name="resumeUrl"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-Violet-500 sm:text-base bg-gray-50 text-gray-900"
                placeholder="https://docs.google.com/document/d/your-resume-link"
                aria-required="true"
              />
            </div>
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-gray-300 rounded text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200 shadow-sm"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-transparent rounded shadow-sm text-base font-medium text-white bg-violet-900 hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-950 transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationFormPage;
