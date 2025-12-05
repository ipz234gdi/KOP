import Button from '../components/common/Button'
import Board from '../components/game/Board'
import GameModal from '../components/common/GameModal'
import { useHanoiGame } from '../hooks/useHanoiGame'
import { useGameTimer } from '../hooks/useGameTimer';
import { useGameStatus } from '../hooks/useGameStatus';
import { formatTime } from '../utils/formatTime';
import { useParams } from "react-router-dom";
import styles from './GamePage.module.css';
import { DefdiskCountNum, DefdifficultyNum } from '../utils/DefaultValue';

export function GamePage({ onFinish, onAbort }) {
    const { userId, difficulty, diskCount } = useParams();

    const diskCountNum = Number(diskCount) || DefdiskCountNum;
    const difficultyNum = Number(difficulty) || DefdifficultyNum;

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
    
    const { currentTime, timeExpired, resetTimer } = useGameTimer(
        getElapsedTime, 
        maxTime, 
        isFinished()
    );

    const { 
        showFinishModal, 
        finalStats, 
        handleRestartLevel,
        handleGoToResults
    } = useGameStatus({
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
    })

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