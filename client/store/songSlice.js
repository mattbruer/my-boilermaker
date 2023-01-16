import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { sendToken } from "./helperFunctions";
import {
  play,
  initExpectedTime,
  record,
  stopRec,
  stopAllRec,
} from "../audioFunctions/play";

//i made these thunks because of side effects...??
export const playSong = createAsyncThunk("song/playSong", (_, thunkAPI) => {
  thunkAPI.dispatch(togglePlay(true));
  initExpectedTime();
  play();
});

export const advancePosition = createAsyncThunk(
  "song/advancePosition",
  (_, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;
    dispatch(positionAdvanced());

    if (getState().songs.recordingArmed && getState().songs.position === 1) {
      stopRec();
      record();
      dispatch(toggleRec(true));
    }
  }
);

export const stopSong = createAsyncThunk("song/stopSong", (_, thunkAPI) => {
  thunkAPI.dispatch(togglePlay(false));
  thunkAPI.dispatch(resetPosition());
  stopAllRec();
});

export const saveChanges = createAsyncThunk(
  "song/saveChanges",
  async (newSong, thunkAPI) => {
    try {
      const { data } = await axios.put("/api/songs", newSong, sendToken());
      thunkAPI.dispatch(toggleEditMode(!toggleEditMode));
    } catch (error) {
      console.log(error);
    }
  }
);

export const newSong = createAsyncThunk(
  "song/newSong",
  async (formValues, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/songs", formValues, sendToken());
      data.measures = JSON.parse(data.measures);
      thunkAPI.dispatch(addSong(data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const loadUserSongs = createAsyncThunk(
  "song/loadUserSongs",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/songs", sendToken());
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
  tempo: 120,
  isPlaying: false,
  validChords: false,
  capo: 0,
  flattenedSong: [],
  isRecording: false,
  recordingArmed: false,
  passes: [],
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    addSong: (state, action) => {
      state.allSongs.push(action.payload);
    },
    armRecording: (state, action) => {
      state.recordingArmed = true;
    },
    toggleRec: (state, action) => {
      state.isRecording = action.payload;
    },
    pushPasses: (state, action) => {
      state.passes.push(action.payload);
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
      song.measures.push(["", ""]);
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
    positionAdvanced: (state, action) => {
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
  positionAdvanced,
  togglePlay,
  resetPosition,
  setCapo,
  toggleRec,
  armRecording,
  pushPasses,
} = songSlice.actions;
export default songSlice.reducer;
