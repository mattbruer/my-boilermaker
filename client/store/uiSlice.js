import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggleCapoModal: false,
  toggleMixerModal: false,
  playDisabled: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCapoModal: (state, action) => {
      state.toggleCapoModal = action.payload;
    },
    toggleMixer: (state, action) => {
      state.toggleMixerModal = action.payload;
    },
    disablePlay: (state, action) => {
      state.playDisabled = action.payload;
    },
  },
});

export const { toggleCapoModal, toggleMixer, disablePlay } = uiSlice.actions;
export default uiSlice.reducer;
