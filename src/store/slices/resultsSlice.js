import { createSlice } from '@reduxjs/toolkit';

const loadAndMergeHistory = () => {
    const rawResults = localStorage.getItem('playerResults') || '[]';
    const rawConfigs = localStorage.getItem('gameConfigs') || '[]';
    const results = JSON.parse(rawResults);
    const configs = JSON.parse(rawConfigs);

    const cfgMap = {};
    configs.forEach(c => {
        const key = String(c.date);
        if (!cfgMap[key]) cfgMap[key] = [];
        cfgMap[key].push(c);
    });

    const merged = (results || [])
        .slice()
        .sort((a, b) => (b.date || 0) - (a.date || 0))
        .map(r => {
            const key = String(r.date);
            const cfg = (cfgMap[key] && cfgMap[key].shift()) || null;
            return {
                id: r.date,
                userId: r.userId ?? cfg?.userId ?? '—',
                moves: r.moves,
                time: r.time,
                lost: !!r.lost,
                difficulty: cfg?.difficulty ?? '—',
                diskCount: cfg?.diskCount ?? '—',
                date: r.date
            };
        });
    return merged;
};

const loadedHistory = loadAndMergeHistory();

const initialState = {
    history: loadedHistory,
    lastGameStats: loadedHistory.length > 0 ? loadedHistory[0] : null,
};

const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        addResult: (state, action) => {
            state.history.unshift(action.payload);

            state.lastGameStats = action.payload;
        },
    },
});

export const { addResult } = resultsSlice.actions;
export default resultsSlice.reducer;