import { useState, useEffect } from 'react';

export function useGameStatus({
    isFinished,
    timeExpired,
    moves,
    getElapsedTime,
    currentTime
}) {
    const [showFinishModal, setShowFinishModal] = useState(false);
    const [finalStats, setFinalStats] = useState(null);

    useEffect(() => {
        if (isFinished() && !showFinishModal) {
            const finalTime = getElapsedTime();
            setFinalStats({ moves, time: finalTime });
            setShowFinishModal(true);
        }
    }, [isFinished, showFinishModal, moves, getElapsedTime]);

    useEffect(() => {
        if (timeExpired && !showFinishModal) {
            setFinalStats({ moves, time: currentTime });
            setShowFinishModal(true);
        }
    }, [timeExpired, showFinishModal, currentTime, moves]);

    const resetStatus = () => {
        setShowFinishModal(false);
        setFinalStats(null);
    };

    return {
        showFinishModal,
        finalStats,
        resetStatus
    };
}