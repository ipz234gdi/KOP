/**
 * @module Modal
 * @description Modal overlay component that renders children in a portal.
 */
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

/**
 * Modal component using React Portal.
 * Renders an overlay with centered content into the `#modal-root` DOM element.
 * @function Modal
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Content displayed inside the modal.
 * @returns {React.ReactPortal} A portal rendering the modal overlay.
 */
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