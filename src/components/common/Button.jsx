/**
 * @module Button
 * @description Reusable button component with customizable styles and behavior.
 */
import styles from './Button.module.css';

/**
 * A reusable button component.
 * @function Button
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Button label content.
 * @param {Function} [props.onClick] - Click event handler.
 * @param {string} [props.className=""] - Additional CSS class names.
 * @param {string} [props.type="button"] - HTML button type attribute.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @returns {JSX.Element} A styled button element.
 */
function Button({ children, onClick, className = "", type = "button", disabled = false }) {
    return (
        <button
            type={type}
            className={`${styles.btn} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
export default Button;