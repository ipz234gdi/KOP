import { useState, useRef } from 'react';

export function useHanoiGame(diskCount) {
  const [rods, setRods] = useState([
    Array.from({ length: diskCount }, (_, i) => diskCount - i),
    [],
    []
  ]);
  const [selectedRod, setSelectedRod] = useState(null);
  const [moves, setMoves] = useState(0);
  const startTime = useRef(Date.now());

  function handleRodClick(idx) {
    if (selectedRod === null) {
      // Select rod if it has disks
      if (rods[idx].length > 0) setSelectedRod(idx);
    } else if (selectedRod === idx) {
      setSelectedRod(null);
    } else {
      // Try to move disk
      const fromRod = rods[selectedRod];
      const toRod = rods[idx];
      if (
        fromRod.length > 0 &&
        (toRod.length === 0 || fromRod[fromRod.length - 1] < toRod[toRod.length - 1])
      ) {
        const disk = fromRod[fromRod.length - 1];
        const newRods = rods.map((rod, i) =>
          i === selectedRod
            ? rod.slice(0, -1)
            : i === idx
            ? [...rod, disk]
            : rod
        );
        setRods(newRods);
        setMoves(moves + 1);
        setSelectedRod(null);
      } else {
        setSelectedRod(null);
      }
    }
  }

  function isFinished() {
    return rods[2].length === diskCount;
  }

  function getElapsedTime() {
    return Math.floor((Date.now() - startTime.current) / 1000);
  }

  function resetGame() {
    setRods([
      Array.from({ length: diskCount }, (_, i) => diskCount - i),
      [],
      []
    ]);
    setMoves(0);
    setSelectedRod(null);
    startTime.current = Date.now();
  }

  return {
    rods,
    selectedRod,
    moves,
    handleRodClick,
    setSelectedRod,
    isFinished,
    getElapsedTime,
    resetGame,
  };
}