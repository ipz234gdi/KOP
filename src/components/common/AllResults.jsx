import styles from './AllResults.module.css';
import { useSelector } from 'react-redux';

export default function AllResults() {
  const items = useSelector((state) => state.results.history);

  if (!items.length) {
    return <div className={styles.container}><div className={styles.empty}>Немає збережених ігор</div></div>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Усі результати гравців</h3>
      <div className={styles.list}>
        {items.map((it) => (
          <div key={it.id || it.date} className={`${styles.row} ${it.lost ? styles.rowLost : ''}`}>
            <div className={styles.colUser}>{it.userId}</div>
            <div className={styles.colSmall}>{it.moves ?? '—'} ходів</div>
            <div className={styles.colSmall}>{it.time != null ? `${it.time}s` : '—'}</div>
            <div className={styles.colSmall}>D:{it.diskCount}</div>
            <div className={styles.colSmall}>S:{it.difficulty}</div>
            <div className={styles.colDate}>{it.date ? new Date(it.date).toLocaleString() : '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
