export function saveGameResult({ stats, userId, difficulty, diskCount, lost = false }) {
  const timestamp = Date.now();

  try {
    const rawResults = window.localStorage.getItem('playerResults') || '[]';
    const results = JSON.parse(rawResults);
    results.push({
      userId,
      moves: stats?.moves ?? null,
      time: stats?.time ?? null,
      lost: !!lost,
      date: timestamp
    });
    window.localStorage.setItem('playerResults', JSON.stringify(results));
  } catch (err) {
    console.error('Не вдалось зберегти playerResults:', err);
  }

  try {
    const rawConfigs = window.localStorage.getItem('gameConfigs') || '[]';
    const configs = JSON.parse(rawConfigs);
    configs.push({
      userId,
      difficulty: difficulty ?? null,
      diskCount: diskCount ?? null,
      date: timestamp
    });
    window.localStorage.setItem('gameConfigs', JSON.stringify(configs));
  } catch (err) {
    console.error('Не вдалось зберегти gameConfigs:', err);
  }
}
