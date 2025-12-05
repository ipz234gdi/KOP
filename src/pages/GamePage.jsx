import { useState, useEffect } from 'react'
import Button from '../components/common/Button'
import Board from '../components/game/Board'
import GameModal from '../components/common/GameModal'
import { useHanoiGame } from '../hooks/useHanoiGame'
import { useGameTimer } from '../hooks/useGameTimer';
import { formatTime } from '../utils/formatTime';
import { useGameStatus } from '../hooks/useGameStatus';

export function GamePage({ onFinish, onAbort, settings }) {

    const {
        rods,
        selectedRod,
        moves,
        handleRodClick,
        isFinished,
        getElapsedTime,
        resetGame,
    } = useHanoiGame(settings.diskCount);

    const maxTime = Math.round((2 ** settings.diskCount) * (4 - settings.difficulty) * 2);

    const { currentTime, timeExpired, resetTimer } = useGameTimer(getElapsedTime, maxTime);

    const {
        showFinishModal,
        finalStats,
        handleRestartLevel,
        handleGoToResults,
    } = useGameStatus({
        isFinished,
        getElapsedTime,
        moves,
        currentTime,
        timeExpired,
        resetGame,
        resetTimer,
        onFinish
    })

    return (
        <main>
            <section>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                        <h2>Гра</h2>
                        <p>Кількість дисків: {settings.diskCount}</p>
                        <p>Ходів: {moves}</p>
                        <p>Час: {formatTime(currentTime)} / залишилось {formatTime(Math.max(maxTime - currentTime, 0))}</p>
                    </div>

                    <div style={{
                        display: "flex",
                        gap: "8px",
                        flexDirection: "column",
                    }}>
                        <Button onClick={onAbort}>Повернутися</Button>
                    </div>
                </div>

                <Board rods={rods} selectedRod={selectedRod} onRodClick={handleRodClick} />

                <div style={{ marginTop: "24px", color: "#888", fontSize: "0.95rem" }}>
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