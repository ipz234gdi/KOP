import styles from './Button.module.css';

function Button({ children, onClick, className = "", type = "button" }) {
    return (
        <button type={type} className={`${styles.btn} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}
export default Button;