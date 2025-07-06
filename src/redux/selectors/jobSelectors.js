import { createSelector } from '@reduxjs/toolkit';

const selectJobsState = (state) => state.jobs;
const selectApplicationsState = (state) => state.applications;

export const selectAllJobs = createSelector(
  [selectJobsState],
  (jobsState) => jobsState.items
);

export const selectJobsStatus = createSelector(
  [selectJobsState],
  (jobsState) => jobsState.status
);

export const selectJobsError = createSelector(
  [selectJobsState],
  (jobsState) => jobsState.error
);

export const selectJobById = createSelector(
  [selectAllJobs, (state, jobId) => jobId], 
  (jobs, jobId) => jobs.find(job => job.id === jobId)
);

export const selectAppliedJobs = createSelector(
  [selectApplicationsState],
  (applicationsState) => applicationsState.appliedJobs
);

export const selectIsJobApplied = createSelector(
  [selectAppliedJobs, (state, jobId) => jobId],
  (appliedJobs, jobId) => appliedJobs.some(job => job.id === jobId)
);