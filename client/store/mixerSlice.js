import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '../history';
import { sendToken } from './helperFunctions';

const initialState = {
  balance: {
    mando: 0,
    guitar: 0,
  },
  volume: {
    mando: 0,
    guitar: 0,
  },
  toggleMixerModal: false,
};

const mixerSlice = createSlice({
  name: 'mixer',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance[action.payload.instrument] = action.payload.balance;
    },
    toggleMixer: (state, action) => {
      state.toggleMixerModal = action.payload;
    },
  },
});

export const { setBalance, toggleMixer } = mixerSlice.actions;
export default mixerSlice.reducer;
