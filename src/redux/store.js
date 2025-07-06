import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobsSlice";
import applicationsReducer from "./slices/applicationsSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("jobHunterAppliedJobs");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("jobHunterAppliedJobs", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    applications: applicationsReducer,
  },
  preloadedState: {
    applications: preloadedState?.applications || { appliedJobs: [] },
  },
});

store.subscribe(() => {
  saveState({
    applications: {
      appliedJobs: store.getState().applications.appliedJobs,
    },
  });
});

export default store;
