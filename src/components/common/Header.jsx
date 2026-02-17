/**
 * @module Header
 * @description Application header component with title and subtitle.
 */

/**
 * Header component displaying the app title and optional subtitle.
 * @function Header
 * @param {Object} props - Component props.
 * @param {string} props.title - Main header title text.
 * @param {string} [props.subtitle] - Optional subtitle text.
 * @returns {JSX.Element} A styled header element.
 */
function Header({ title, subtitle }) {
  return (
    <header className="w-full py-4 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
        </div>
        <div className="text-xs opacity-80">Tower of Hanoi</div>
      </div>
    </header>
  );
}
export default Header;