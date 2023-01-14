import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";
import { sendToken } from "./helperFunctions";

const initialState = {
  balance: {
    mando: -25,
    guitar: 25,
  },
  volume: {
    mando: 50,
    guitar: 50,
  },
  toggleMixerModal: false,
};

const mixerSlice = createSlice({
  name: "mixer",
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance[action.payload.instrument] = action.payload.balance;
    },
    setVolume: (state, action) => {
      state.volume[action.payload.instrument] = action.payload.volume;
    },
    toggleMixer: (state, action) => {
      state.toggleMixerModal = action.payload;
    },
  },
});

export const { setBalance, setVolume, toggleMixer } = mixerSlice.actions;
export default mixerSlice.reducer;
