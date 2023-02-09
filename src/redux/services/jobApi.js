import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../slices/api';

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers, { getState }) => {
      headers.set('access_token', localStorage.getItem('access_token'));
      return headers;
    },
  }),
  endpoints: (build) => ({
    getPositions: build.query({ query: ({ page, description, location, full_time }) => `/positions?page=${page}&description=${description}&location=${location}&full_time=${full_time}` }),
    getPositionDetails: build.query({ query: (id) => `/positions/${id}` }),
  }),
});

export const { useGetPositionsQuery, useGetPositionDetailsQuery } = jobApi;
