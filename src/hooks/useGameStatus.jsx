/**
 * @module useGameStatus
 * @description Hook managing game completion status, modal display, and result submission.
 */
import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking game completion and managing the finish modal.
 * @function useGameStatus
 * @param {Object} params - Configuration object.
 * @param {Function} params.isFinished - Returns true when the puzzle is solved.
 * @param {number} params.moves - Current move count.
 * @param {Function} params.getElapsedTime - Returns elapsed time in seconds.
 * @param {number} params.currentTime - Current timer value.
 * @param {boolean} params.timeExpired - Whether time has expired.
 * @param {Function} params.resetGame - Resets the game state.
 * @param {Function} params.resetTimer - Resets the timer.
 * @param {Function} params.onFinish - Callback to handle game finish.
 * @param {string} params.userId - Player ID.
 * @param {number} params.difficultyNum - Difficulty level.
 * @param {number} params.diskCountNum - Number of disks.
 * @returns {Object} Status state: { showFinishModal, finalStats, handleRestartLevel, handleGoToResults }.
 */
export function useGameStatus({
    isFinished,
    moves,
    getElapsedTime,
    currentTime,
    timeExpired,
    resetGame,
    resetTimer,
    onFinish,
    userId,
    difficultyNum,
    diskCountNum
}) {
    const [showFinishModal, setShowFinishModal] = useState(false);
    const [finalStats, setFinalStats] = useState(null);

    useEffect(() => {
        if (isFinished() && !showFinishModal) {
            const finalTime = getElapsedTime();
            setFinalStats({ moves, time: finalTime });
            setShowFinishModal(true);
        }
    }, [isFinished, moves, getElapsedTime, showFinishModal]);

    useEffect(() => {
        if (timeExpired && !showFinishModal) {
            setFinalStats({ moves, time: currentTime });
            setShowFinishModal(true);
        }
    }, [timeExpired, showFinishModal, currentTime, moves]);

    const handleRestartLevel = () => {
        resetGame();
        resetTimer();
        setShowFinishModal(false);
        setFinalStats(null);
    };

    const handleGoToResults = () => {
        onFinish(
            finalStats,
            userId,
            difficultyNum,
            diskCountNum,
            !!timeExpired
        );
    };

    return {
        showFinishModal,
        finalStats,
        handleRestartLevel,
        handleGoToResults
    };
}