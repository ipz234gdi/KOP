import { createSlice } from '@reduxjs/toolkit';
import { DefdiskCountNum, DefdifficultyNum, DefuserId } from '../../utils/DefaultValue';

const loadSettings = () => {
    const saved = localStorage.getItem('hanoiSettings');
    return saved ? JSON.parse(saved) : { DefdiskCountNum, DefdifficultyNum, DefuserId};
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState: loadSettings(),
    reducers: {
        updateSettings: (state, action) => {
            state.userId = action.payload.userId;
            state.diskCount = Number(action.payload.diskCount);
            state.difficulty = Number(action.payload.difficulty);
        },
    },
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;