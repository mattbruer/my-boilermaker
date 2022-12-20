import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '../history';

export const me = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  const token = window.localStorage.getItem('token');

  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return thunkAPI.dispatch(setAuth(res.data));
  }
});

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (formVals, thunkAPI) => {
    try {
      const { data } = await axios.post(`/auth/${formVals.formName}`, formVals);
      window.localStorage.setItem('token', data.token);
      thunkAPI.dispatch(me());
    } catch (authError) {
      console.log(authError);
      return thunkAPI.dispatch(setAuth({ error: authError }));
    }
  }
);
const initialState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      return action.payload;
    },
    logout: () => {
      window.localStorage.removeItem('token');
      history.push('/login');
      return {};
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
