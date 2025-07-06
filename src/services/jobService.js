import jobsData from "../data/jobsData.json";

export const fetchAllJobsApi = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(jobsData);
    }, 500);
  });
};

export const fetchJobByIdApi = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const job = jobsData.find((j) => j.id === id);
      resolve(job);
    }, 300);
  });
};

export const submitApplicationApi = async (applicationData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve({
          success: true,
          message: "Application submitted successfully!",
        });
      } else {
        reject(new Error("Failed to submit application. Please try again."));
      }
    }, 800);
  });
};
