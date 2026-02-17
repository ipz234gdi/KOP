/**
 * @module GameModal
 * @description Modal dialog shown when a game level is completed or time expires.
 * Displays stats (moves, time) for wins or a message for losses.
 */
import Button from './Button';
import { formatTime } from '../../utils/formatTime';
import Modal from './Modal';

/**
 * Game completion modal component.
 * @function GameModal
 * @param {Object} props - Component props.
 * @param {boolean} props.timeExpired - Whether the game ended due to time expiration.
 * @param {Object} [props.finalStats] - Final game statistics.
 * @param {number} [props.finalStats.moves] - Number of moves made.
 * @param {number} [props.finalStats.time] - Time elapsed in seconds.
 * @param {Function} props.onRestart - Callback to restart the game.
 * @param {Function} props.onFinish - Callback to finish and view results.
 * @returns {JSX.Element} A modal with game results and action buttons.
 */
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
