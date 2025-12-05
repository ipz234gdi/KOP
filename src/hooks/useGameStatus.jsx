import { useState, useEffect } from "react";

export function useGameStatus({ 
    isFinished, 
    getElapsedTime, 
    moves, 
    currentTime, 
    timeExpired, 
    resetGame, 
    resetTimer, 
    onFinish 
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
        onFinish(finalStats);
    };

    return {
        showFinishModal,
        finalStats,
        handleRestartLevel,
        handleGoToResults,
        setShowFinishModal
    };
}
