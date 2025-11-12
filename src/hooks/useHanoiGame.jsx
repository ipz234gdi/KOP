import { useState, useRef, useCallback, useEffect } from 'react';

function createInitialRods(diskCount) {
  return [
    Array.from({ length: diskCount }, (_, i) => diskCount - i),
    [],
    []
  ];
}

function canMoveDisk(fromRod, toRod) {
  if (fromRod.length === 0) return false;
  if (toRod.length === 0) return true;
  return fromRod[fromRod.length - 1] < toRod[toRod.length - 1];
}

export function useHanoiGame(diskCount) {
  const [rods, setRods] = useState(() => createInitialRods(diskCount));
  const [selectedRod, setSelectedRod] = useState(null);
  const [moves, setMoves] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    resetGame();
  }, [diskCount]);

  const handleRodClick = useCallback(
    (idx) => {
      if (selectedRod === null) {
        if (rods[idx].length > 0) setSelectedRod(idx);
        return;
      }

      if (selectedRod === idx) {
        setSelectedRod(null);
        return;
      }

      const fromRod = rods[selectedRod];
      const toRod = rods[idx];

      if (canMoveDisk(fromRod, toRod)) {
        moveDisk(selectedRod, idx);
      }

      setSelectedRod(null);
    },
    [selectedRod, rods]
  );

  const moveDisk = useCallback(
    (from, to) => {
      const disk = rods[from][rods[from].length - 1];
      const newRods = rods.map((rod, i) => {
        if (i === from) return rod.slice(0, -1);
        if (i === to) return [...rod, disk];
        return rod;
      });
      setRods(newRods);
      setMoves((m) => m + 1);
    },
    [rods]
  );

  const isFinished = useCallback(() => rods[2].length === diskCount, [rods, diskCount]);

  const getElapsedTime = useCallback(
    () => Math.floor((Date.now() - startTime.current) / 1000),
    []
  );

  const resetGame = useCallback(() => {
    setRods(createInitialRods(diskCount));
    setMoves(0);
    setSelectedRod(null);
    startTime.current = Date.now();
  }, [diskCount]);

  return {
    rods,
    selectedRod,
    moves,
    handleRodClick,
    isFinished,
    getElapsedTime,
    resetGame,
  };
}