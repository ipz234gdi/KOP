/**
 * @module useGameTimer
 * @description Timer hook that tracks elapsed time and detects time expiration.
 */
import { useState, useEffect } from 'react';

/**
 * Custom hook for managing game timer with expiration.
 * @function useGameTimer
 * @param {Function} getElapsedTime - Returns current elapsed time in seconds.
 * @param {number} maxTime - Maximum allowed time in seconds.
 * @param {boolean} isGameOver - Whether the game has ended.
 * @returns {Object} Timer state: { currentTime, timeExpired, resetTimer }.
 */
export function useGameTimer(getElapsedTime, maxTime, isGameOver) {
  const [currentTime, setCurrentTime] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      const elapsed = getElapsedTime();
      setCurrentTime(elapsed);

      if (elapsed >= maxTime) {
        setTimeExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getElapsedTime, maxTime, isGameOver]);

  const resetTimer = () => {
    setCurrentTime(0);
    setTimeExpired(false);
  };

  return { currentTime, timeExpired, resetTimer };
}
