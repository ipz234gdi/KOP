const colors = [
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
    // size — це номер диска (наприклад, 1...8)
    // максимальний розмір диска (наприклад, 8)
    const maxSize = 8;
    const minWidth = 40; // px
    const maxWidth = 160; // px

    // Розрахунок ширини: чим більший size, тим ширший диск
    const width = minWidth + ((maxWidth - minWidth) * (size - 1)) / (maxSize - 1);

    const color = colors[(size - 1) % colors.length];

    return (
        <div
            className="disk disk-anim"
            style={{
                width: `${width}px`,
                background: color,
            }}
        >
            D{size}
        </div>
    );
}
export default Disk;