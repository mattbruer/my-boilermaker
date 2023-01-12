import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '../history';
import { sendToken } from './helperFunctions';
import { play } from '../audioFunctions/play';

let interval;
let pos = 0;

//i made tis a thunk because it has side effects...
export const playSong = createAsyncThunk('song/playSong', (_, thunkAPI) => {
  thunkAPI.dispatch(togglePlay(true));
  play();
});

export const stopSong = createAsyncThunk('song/stopSong', (_, thunkAPI) => {
  thunkAPI.dispatch(togglePlay(false));
  thunkAPI.dispatch(resetPosition());
});

export const saveChanges = createAsyncThunk(
  'song/saveChanges',
  async (newSong, thunkAPI) => {
    try {
      const { data } = await axios.put('/api/songs', newSong, sendToken());
      thunkAPI.dispatch(toggleEditMode(!toggleEditMode));
    } catch (error) {
      console.log(error);
    }
  }
);

export const newSong = createAsyncThunk(
  'song/newSong',
  async (formValues, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/songs', formValues, sendToken());
      data.measures = JSON.parse(data.measures);
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
      data.forEach((song) => {
        song.measures = JSON.parse(song.measures);
      });
      thunkAPI.dispatch(setAllSongs(data));
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  allSongs: [],
  measures: [[], []],
  selectedSong: null,
  selectedMeasure: 0,
  position: 0,
  loop: null,
  currentMeasure: 0,
  currentMeasPos: 0,
  lines: [[], []],
  measuresPerLine: 4,
  timeSig: [2, 2],
  editMode: false,
  tempo: 60,
  isPlaying: false,
  validChords: false,
  capo: 0,
  flattenedSong: [],
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
    editChord: (state, action) => {
      const song = state.allSongs.find(
        (song) => song.id === state.selectedSong
      );
      song.measures[action.payload.measureNumber][action.payload.position] =
        action.payload.value;
    },
    changeTempo: (state, action) => {
      state.tempo = action.payload;
    },
    addMeasure: (state, action) => {
      const song = state.allSongs.find(
        (song) => song.id === state.selectedSong
      );
      song.measures.push(['', '']);
    },
    removeMeasure: (state, action) => {
      const song = state.allSongs.find(
        (song) => song.id === state.selectedSong
      );
      song.measures.pop();
    },
    selectSong: (state, action) => {
      state.selectedSong = action.payload;
      const song = state.allSongs.find((song) => song.id == state.selectedSong);
      state.measures = song.measures;
    },
    togglePlay: (state, action) => {
      state.isPlaying = action.payload;
    },
    advancePosition: (state, action) => {
      state.position =
        state.position === state.measures.length * 4 - 1
          ? 0
          : state.position + 1;
    },
    resetPosition: (state, action) => {
      state.position = 0;
    },
    setCapo: (state, action) => {
      state.capo = action.payload;
      const song = state.allSongs.find(
        (song) => song.id === state.selectedSong
      );
      song.capo = action.payload;
    },
  },
});

export const {
  setAllSongs,
  addSong,
  toggleEditMode,
  editTitle,
  selectSong,
  editChord,
  addMeasure,
  removeMeasure,
  changeTempo,
  advancePosition,
  togglePlay,
  resetPosition,
  setCapo,
} = songSlice.actions;
export default songSlice.reducer;
