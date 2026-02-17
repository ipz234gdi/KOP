/**
 * @module store
 * @description Redux store configuration. Combines settings and results slices.
 * Persists settings to localStorage on every state change.
 */
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import resultsReducer from './slices/resultsSlice';

/**
 * Configured Redux store instance.
 * @constant {Object}
 */
export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    results: resultsReducer,
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    window.localStorage.setItem('hanoiSettings', JSON.stringify(state.settings));
  } catch (err) {
    console.error('Не вдалося зберегти налаштування в localStorage:', err);
  }
});