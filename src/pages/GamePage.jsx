import { useState, useEffect } from 'react'
import Button from '../components/common/Button'
import Board from '../components/game/Board'
import GameModal from '../components/common/GameModal'
import { useHanoiGame } from '../hooks/useHanoiGame'
import { useGameTimer } from '../hooks/useGameTimer';
import { formatTime } from '../utils/formatTime';
import { useParams } from "react-router-dom";
import styles from './GamePage.module.css';

export function GamePage({ onFinish, onAbort }) {
    const { userId, difficulty, diskCount } = useParams();

    const diskCountNum = Number(diskCount);
    const difficultyNum = Number(difficulty);

    const [showFinishModal, setShowFinishModal] = useState(false);
    const [finalStats, setFinalStats] = useState(null);

    const {
        rods,
        selectedRod,
        moves,
        handleRodClick,
        isFinished,
        getElapsedTime,
        resetGame,
    } = useHanoiGame(diskCountNum);

    const maxTime = Math.round((2 ** diskCountNum) * (4 - difficultyNum) * 2);

    const { currentTime, timeExpired, resetTimer } = useGameTimer(getElapsedTime, maxTime, showFinishModal);

    useEffect(() => {
        if (isFinished() && !showFinishModal) {

            const finalTime = getElapsedTime();
            setFinalStats({ moves, time: finalTime });
            setShowFinishModal(true);
        }
    }, [rods, isFinished, moves, getElapsedTime, showFinishModal]);

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
        // передаємо userId назад в App щоб App зміг правильно перейти на /user/:userId/results
        onFinish(finalStats, userId);
    };

    return (
        <main className={styles.page}>
            <section>
                <div className={styles.headerRow}>
                    <div className={styles.stats}>
                        <h2 className={styles.title}>Гра — {userId}</h2>
                        <div className={styles.statRow}>
                          <span>Диски:</span><strong>{diskCountNum}</strong>
                        </div>
                        <div className={styles.statRow}>
                          <span>Складність:</span><strong>{difficultyNum}</strong>
                        </div>
                        <div className={styles.statRow}>
                          <span>Ходи:</span><strong>{moves}</strong>
                        </div>
                        <div className={styles.statRow}>
                          <span>Час:</span><strong>{formatTime(currentTime)}</strong>
                          <small className={styles.remaining}> / залишилось {formatTime(Math.max(maxTime - currentTime, 0))}</small>
                        </div>
                    </div>

                    <div className={styles.controls}>
                        <Button onClick={onAbort}>Повернутися</Button>
                    </div>
                </div>

                <Board rods={rods} selectedRod={selectedRod} onRodClick={handleRodClick} />

                <div className={styles.hint}>
                    Переміщайте диски, дотримуючись правил Ханойської вежі.
                </div>
            </section>

            {showFinishModal && (
                <GameModal
                    timeExpired={timeExpired}
                    finalStats={finalStats}
                    onRestart={handleRestartLevel}
                    onFinish={handleGoToResults}
                />
            )}
        </main>
    );
}

export default GamePage;