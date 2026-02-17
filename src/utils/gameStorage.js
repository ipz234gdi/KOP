/**
 * @module gameStorage
 * @description Utility for saving game results and configurations to localStorage.
 */

/**
 * Saves a game result and configuration to localStorage.
 * @function saveGameResult
 * @param {Object} params - Game result parameters.
 * @param {Object} params.stats - Game statistics (moves, time).
 * @param {string} params.userId - Player identifier.
 * @param {number} params.difficulty - Difficulty level.
 * @param {number} params.diskCount - Number of disks used.
 * @param {boolean} [params.lost=false] - Whether the player lost.
 */
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
