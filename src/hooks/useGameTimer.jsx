import { useState, useEffect } from 'react';

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
