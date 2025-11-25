import styles from './Disk.module.css';

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