// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js'; // Import the user reducer

// Configure and create the store
export const store = configureStore({
  reducer: {
    user: userReducer, // Attach the user reducer to the 'user' slice of state
  },
});

// Export the store
export default store;
