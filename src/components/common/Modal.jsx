import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

function Modal({ children }) {
  return createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;