import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '../history';
import { sendToken } from './helperFunctions';

export const newSong = createAsyncThunk(
  'song/newSong',
  async (formValues, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/songs', formValues, sendToken());
      thunkAPI.dispatch(addSong(data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const loadUserSongs = createAsyncThunk(
  'song/loadUserSongs',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/api/songs', sendToken());
      thunkAPI.dispatch(setAllSongs(data));
    } catch (error) {
      console.log(errpr);
    }
  }
);

const initialState = {
  allSongs: [],
};

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    addSong: (state, action) => {
      state.allSongs.push(action.payload);
    },
  },
});

export const { setAllSongs, addSong } = songSlice.actions;
export default songSlice.reducer;
