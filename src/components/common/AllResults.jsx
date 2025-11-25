import { useEffect, useState } from 'react';
import styles from './AllResults.module.css';

export default function AllResults() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const rawResults = window.localStorage.getItem('playerResults') || '[]';
      const rawConfigs = window.localStorage.getItem('gameConfigs') || '[]';
      const results = JSON.parse(rawResults);
      const configs = JSON.parse(rawConfigs);

      const cfgMap = {};
      configs.forEach(c => {
        const key = String(c.date);
        if (!cfgMap[key]) cfgMap[key] = [];
        cfgMap[key].push(c);
      });

      const merged = (results || [])
        .slice()
        .sort((a,b) => (b.date || 0) - (a.date || 0))
        .map(r => {
          const key = String(r.date);
          const cfg = (cfgMap[key] && cfgMap[key].shift()) || null;
          return {
            userId: r.userId ?? cfg?.userId ?? '—',
            moves: r.moves,
            time: r.time,
            lost: !!r.lost,
            difficulty: cfg?.difficulty ?? '—',
            diskCount: cfg?.diskCount ?? '—',
            date: r.date
          };
        });

      setItems(merged);
    } catch (err) {
      console.error('Помилка читання all results/configs:', err);
      setItems([]);
    }
  }, []);

  if (!items.length) {
    return <div className={styles.container}><div className={styles.empty}>Немає збережених ігор</div></div>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Усі результати гравців</h3>
      <div className={styles.list}>
        {items.map((it, idx) => (
          <div key={idx} className={`${styles.row} ${it.lost ? styles.rowLost : ''}`}>
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
