import Disk from './Disk'

function Rod({ title, disks = [], selected = false, onClick }) {
    return (
        <div className={`rod${selected ? " selected" : ""}`} onClick={onClick}>
            <div style={{
                position: "relative",
                height: "180px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center"
            }}>
                <div className="rod-pole" />
                <div style={{ position: "relative", 
                    zIndex: 1, 
                    width: "100%", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"

                    }}>
                    {disks.length === 0 ? (
                        <div className="rod-empty">Порожньо</div>
                    ) : (
                        disks.slice().reverse().map((d, i) => <Disk key={i} size={d} index={i} />)
                    )}
                </div>
            </div>
            <div className="rod-title">{title}</div>
        </div>
    );
}
export default Rod;