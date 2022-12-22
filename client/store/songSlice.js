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
  measures: [[], []],
  selectedSong: 0,
  selectedMeasure: 0,
  position: [0, 0, 0],
  currentLine: 0,
  currentMeasure: 0,
  currentMeasPos: 0,
  lines: [[], []],
  measuresPerLine: 4,
  timeSig: [2, 2],
  editMode: false,
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
    toggleEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    editTitle: (state, action) => {
      const song = state.allSongs.find(
        (song) => song.id === state.selectedSong
      );
      song.title = action.payload;
    },
    selectSong: (state, action) => {
      state.selectedSong = action.payload;
      const song = state.allSongs.find((song) => song.id == action.payload);
      state.measures = JSON.parse(song.measures);
    },
  },
});

export const { setAllSongs, addSong, toggleEditMode, editTitle, selectSong } =
  songSlice.actions;
export default songSlice.reducer;