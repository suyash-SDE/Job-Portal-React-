import { createSlice } from '@reduxjs/toolkit';

const applicationsSlice = createSlice({
  name: 'applications',
  initialState: {
    appliedJobs: [],
  },
  reducers: {
    applyForJob: (state, action) => {
      const jobExists = state.appliedJobs.some(job => job.id === action.payload.id);
      if (!jobExists) {
        state.appliedJobs.push(action.payload);
        alert(`Successfully applied for "${action.payload.title}"!`);
      } else {
        alert(`You have already applied for "${action.payload.title}".`);
      }
    },
  },
});

export const { applyForJob } = applicationsSlice.actions;
export default applicationsSlice.reducer;