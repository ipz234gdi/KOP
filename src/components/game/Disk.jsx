/**
 * @module Disk
 * @description Visual representation of a disk in the Tower of Hanoi game.
 * Each disk has a unique size and color.
 */
import styles from './Disk.module.css';

/**
 * Color palette for disks (cycled by size).
 * @constant {string[]}
 */
const colors = [
    "#FFB347",
    "#87CEEB",
    "#90EE90",
    "#FF6961",
    "#C299FF",
    "#FFD700",
    "#FFB6C1",
    "#A0CED9",
];

/**
 * Disk component representing a single game disk.
 * Width and color are calculated based on the disk size.
 * @function Disk
 * @param {Object} props - Component props.
 * @param {number} props.size - Disk size (1 = smallest, 8 = largest).
 * @param {number} props.index - Position index on the rod.
 * @returns {JSX.Element} A styled disk element.
 */
function Disk({ size, index }) {
    const maxSize = 8;
    const minWidth = 40;
    const maxWidth = 160;

    const width = minWidth + ((maxWidth - minWidth) * (size - 1)) / (maxSize - 1);

    const color = colors[(size - 1) % colors.length];

    return (
        <div
            className={`${styles.disk} ${styles.diskAnim}`}
            style={{
                width: `${width}px`,
                background: color,
            }}
        >
            D{size}
        </div>
    );
}
export default Disk;