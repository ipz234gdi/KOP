function Button({ children, onClick, className = "" }) {
    return (
        <button className={`minimal-btn ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}
export default Button;