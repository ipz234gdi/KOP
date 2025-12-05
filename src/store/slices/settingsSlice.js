import { createSlice } from '@reduxjs/toolkit';

const loadSettings = () => {
  try {
    const saved = localStorage.getItem('hanoiSettings');
    return saved ? JSON.parse(saved) : { diskCount: 3, difficulty: 1, userId: '' };
  } catch (e) {
    return { diskCount: 3, difficulty: 1, userId: '' };
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: loadSettings(),
  reducers: {
    updateSettings: (state, action) => {
      state.userId = action.payload.userId;
      state.diskCount = Number(action.payload.diskCount);
      state.difficulty = Number(action.payload.difficulty);
      
      localStorage.setItem('hanoiSettings', JSON.stringify(state));
    },
  },
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;