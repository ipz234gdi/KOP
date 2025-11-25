import Disk from './Disk'
import styles from './Rod.module.css'

function Rod({ title, disks = [], selected = false, onClick, maxDisks = 8 }) {
    const rodHeight = 28 * maxDisks + 24;

    return (
        <div className={`${styles.rod} ${selected ? styles.selected : ''}`} onClick={onClick}>
            <div style={{
                position: "relative",
                height: `${rodHeight}px`,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center"
            }}>
                <div className={styles.rodPole} />
                <div style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: `${rodHeight}px`,
                    justifyContent: "flex-end"
                }}>
                    {disks.length === 0 ? (
                        <div className={styles.rodEmpty}>Порожньо</div>
                    ) : (
                        disks.slice().reverse().map((d, i) => <Disk key={i} size={d} index={i} />)
                    )}
                </div>
            </div>
            <div className={styles.rodTitle}>{title}</div>
        </div>
    );
}
export default Rod;