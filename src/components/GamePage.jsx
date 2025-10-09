import Button from './Button'
import Board from './Board'

function GamePage({ diskCount, onFinish, onAbort }) {
    const rods = [
        Array.from({ length: diskCount }, (_, i) => diskCount - i),
        [],
        []
    ];

    return (
        <main>
            <section>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                        <h2>Гра</h2>
                        <p>Кількість дисків: {diskCount}</p>
                        <p>Ходів: --</p>
                    </div>
                    <div style={{ 
                        display: "flex", 
                        gap: "8px",
                        flexDirection: "column",
                        }}>
                        <Button onClick={onAbort}>Повернутися</Button>
                        <Button onClick={() => onFinish({ moves: "--", time: "--" })}>Завершити</Button>
                    </div>
                </div>
                <Board rods={rods} selectedRod={null} onRodClick={() => {}} />
                <div style={{ marginTop: "24px", color: "#888", fontSize: "0.95rem" }}>
                    Тут буде логіка гри. Зараз це лише UI.
                </div>
            </section>
        </main>
    );
}

export default GamePage;