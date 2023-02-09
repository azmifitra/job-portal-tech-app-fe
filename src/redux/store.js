import { configureStore } from '@reduxjs/toolkit';
import { jobApi } from './services/jobApi';
import authReducer from './slices/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jobApi.middleware),
});
