import Rod from './Rod'

function Board({ rods, selectedRod, onRodClick, maxDiskCount }) {
    return (
        <div className="board">
            {rods.map((r, i) => (
                <Rod
                    key={i}
                    title={`Стержень ${i + 1}`}
                    disks={rods[i]}
                    selected={selectedRod === i}
                    onClick={() => onRodClick(i)}
                    maxDisks={maxDiskCount}
                />
            ))}
        </div>
    );
}
export default Board;