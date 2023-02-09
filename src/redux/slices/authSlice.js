import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, setHeaders } from './api';
import axios from 'axios';

const initialState = {
  token: localStorage.getItem('access_token'),
  loginStatus: '',
  loginError: '',
};

export const loginUser = createAsyncThunk('auth/loginUser', async (user, { rejectWithValue }) => {
  try {
    const data = await axios.post(`${url}/login`, {
      email: user.email,
      password: user.password,
    });

    localStorage.setItem('access_token', data.data.access_token);

    return data.data.access_token;
  } catch (err) {
    console.log(err.response);
    return rejectWithValue(err.response.data);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (user, { rejectWithValue }) => {
  try {
    localStorage.clear();

    return;
  } catch (err) {
    console.log(err.response);
    return rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // omit reducer cases
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: 'pending', loginError: '' };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return { ...state, loginStatus: 'success' };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: 'rejected',
        loginError: action.payload.message,
      };
    });
    builder.addCase(logoutUser.pending, (state, action) => {
      return { ...state, loginStatus: 'pending', loginError: '' };
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      return { ...state, loginStatus: '', loginError: '' };
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: 'rejected',
        loginError: action.payload.message,
      };
    });
  },
});

export default authSlice.reducer;
