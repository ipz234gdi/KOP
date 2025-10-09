import Rod from './Rod'

function Board({ rods, selectedRod, onRodClick }) {
    return (
        <div className="board">
            {rods.map((r, i) => (
                <Rod
                    key={i}
                    title={`Стрижень ${i + 1}`}
                    disks={r}
                    selected={selectedRod === i}
                    onClick={() => onRodClick(i)}
                />
            ))}
        </div>
    );
}
export default Board;