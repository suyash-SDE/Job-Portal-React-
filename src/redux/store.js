import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice';
import applicationsReducer from './slices/applicationsSlice';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    applications: applicationsReducer,
  },
});

export default store;