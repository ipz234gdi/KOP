/**
 * @module Board
 * @description Game board component that displays three rods with disks.
 */
import Rod from './Rod'
import styles from './Board.module.css'

/**
 * Board component containing three rods for the Tower of Hanoi game.
 * @function Board
 * @param {Object} props - Component props.
 * @param {Array<number[]>} props.rods - Array of 3 rod arrays, each containing disk sizes.
 * @param {number|null} props.selectedRod - Index of the currently selected rod.
 * @param {Function} props.onRodClick - Callback when a rod is clicked.
 * @param {number} props.maxDiskCount - Maximum number of disks in the game.
 * @returns {JSX.Element} A game board with three rods.
 */
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