import Button from './Button'
import Board from './Board'
import { useHanoiGame } from '../hooks/useHanoiGame'

function GamePage({ diskCount, onFinish, onAbort }) {
    const {
        rods,
        selectedRod,
        moves,
        handleRodClick,
        isFinished,
        getElapsedTime,
        resetGame,
    } = useHanoiGame(diskCount);

    // Завершення гри при перемозі
    if (isFinished()) {
        onFinish({ moves, time: getElapsedTime() });
        resetGame();
        return null;
    }

    return (
        <main>
            <section>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                        <h2>Гра</h2>
                        <p>Кількість дисків: {diskCount}</p>
                        <p>Ходів: {moves}</p>
                    </div>
                    <div style={{ 
                        display: "flex", 
                        gap: "8px",
                        flexDirection: "column",
                        }}>
                        <Button onClick={onAbort}>Повернутися</Button>
                        <Button onClick={() => onFinish({ moves, time: getElapsedTime() })}>Завершити</Button>
                    </div>
                </div>
                <Board rods={rods} selectedRod={selectedRod} onRodClick={handleRodClick} />
                <div style={{ marginTop: "24px", color: "#888", fontSize: "0.95rem" }}>
                    Переміщайте диски, дотримуючись правил Ханойської вежі.
                </div>
            </section>
        </main>
    );
}

export default GamePage;