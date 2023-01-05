import { createLogger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import auth from './authSlice';
import songs from './songSlice';
import mixer from './mixerSlice';
import ui from './uiSlice';

const store = configureStore({
  reducer: { auth, songs, mixer, ui },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger({ collapsed: true })),
});

export default store;
export * from './authSlice';
