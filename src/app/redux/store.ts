import { configureStore } from '@reduxjs/toolkit';
import continueWatchingSlice from './slices/continueWatchingSlice';

const store = configureStore({
  reducer: {
    continueWatching: continueWatchingSlice
  }
});

export default store;