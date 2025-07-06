import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllJobsApi } from "../../services/jobService";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await fetchAllJobsApi();
  return response;
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })

      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;
