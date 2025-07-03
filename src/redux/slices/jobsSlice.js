import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobsData from '../../data/jobsData.json';

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(jobsData);
      }, 500);
    });
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;