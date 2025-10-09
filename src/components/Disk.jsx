const diskColors = [
    "#FFB347",
    "#87CEEB",
    "#90EE90",
    "#FF6961",
    "#C299FF",
    "#FFD700",
    "#FFB6C1",
    "#A0CED9",
];

function Disk({ size, index }) {
    return (
        <div
            className="disk disk-anim"
            style={{
                width: `${40 + size * 20}px`,
                background: diskColors[(size - 1) % diskColors.length],
            }}
        >
            {`D${size}`}
        </div>
    );
}
export default Disk;