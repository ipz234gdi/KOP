import Button from '../components/common/Button'
import { formatTime } from '../utils/formatTime';
import { useParams } from "react-router-dom";
import styles from './ResultsPage.module.css';
import AllResults from '../components/common/AllResults';

import { useSelector } from 'react-redux';

function ResultsPage({ onRestart }) {
  const { userId } = useParams();

  const lastStats = useSelector(state => state.results.lastGameStats);

  const history = useSelector(state => state.results.history);

  const userHistory = history.filter(game => game.userId === userId);

  return (
    <main className={styles.page}>
      <section className={styles.center}>
        <h2 className={styles.title}>Результат — {userId ?? '--'}</h2>
        <p className={styles.hint}>Плейсхолдер для відображення статистики після гри.</p>

        <div className={styles.resultsStats}>
          <div className={styles.resultsBlock}>
            <div className={styles.resultsLabel}>Ходи</div>
            <div className={styles.resultsValue}>{lastStats?.moves ?? "--"}</div>
          </div>
          <div className={styles.resultsBlock}>
            <div className={styles.resultsLabel}>Час</div>
            <div className={styles.resultsValue}>{formatTime(lastStats?.time)}</div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button onClick={onRestart}>Грати знову</Button>
        </div>

        <AllResults />

      </section>
    </main>
  );
}
export default ResultsPage;