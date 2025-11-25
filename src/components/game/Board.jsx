import Rod from './Rod'
import styles from './Board.module.css'

function Board({ rods, selectedRod, onRodClick, maxDiskCount }) {
    return (
        <div className={styles.board}>
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