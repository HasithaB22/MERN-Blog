import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js'; // Import the user reducer
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine all reducers here
const rootReducer = combineReducers({
  user: userReducer, 
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Export the store
export default store;
