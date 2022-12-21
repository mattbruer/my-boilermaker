import { createLogger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import auth from './authSlice';
import songs from './songSlice';

const store = configureStore({
  reducer: { auth, songs },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger({ collapsed: true })),
});

export default store;
export * from './authSlice';
