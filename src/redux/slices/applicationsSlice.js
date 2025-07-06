import { createSlice } from "@reduxjs/toolkit";

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    appliedJobs: [],
  },
  reducers: {
    applyForJob: (state, action) => {
      const jobExists = state.appliedJobs.some(
        (job) => job.id === action.payload.id
      );
      if (!jobExists) {
        state.appliedJobs.push({
          ...action.payload,
          applicationDate: new Date().toISOString(),
        });
      }
    },
    removeApplication: (state, action) => {
      const jobIdToRemove = action.payload;
      state.appliedJobs = state.appliedJobs.filter(
        (job) => job.id !== jobIdToRemove
      );
    },
  },
});

export const { applyForJob, removeApplication } = applicationsSlice.actions;
export default applicationsSlice.reducer;
