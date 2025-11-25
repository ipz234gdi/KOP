import Button from './Button';
import { formatTime } from '../../utils/formatTime';
import Modal from './Modal';

export default function GameModal({ timeExpired, finalStats, onRestart, onFinish }) {
  return (
    <Modal>
      {timeExpired ? (
        <>
          <h2>Час вийшов!</h2>
          <p>Ви не встигли завершити рівень.</p>
        </>
      ) : (
        <>
          <h2>Рівень пройдено!</h2>
          <div>
            <p>Ходів: <span>{finalStats?.moves}</span></p>
            <p>Час: <span>{formatTime(finalStats?.time)}</span></p>
          </div>
        </>
      )}

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
        <Button onClick={onRestart}>Почати заново</Button>
        <Button onClick={onFinish}>{timeExpired ? 'Переглянути результати' : 'Завершити'}</Button>
      </div>
    </Modal>
  );
}
