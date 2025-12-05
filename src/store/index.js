import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import resultsReducer from './slices/resultsSlice';

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