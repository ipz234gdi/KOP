import Button from '../components/common/Button'

function formatTime(sec) {
  if (typeof sec !== "number" || isNaN(sec)) return "--";
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  let parts = [];
  if (days) parts.push(`${days} д`);
  if (hours) parts.push(`${hours} г`);
  if (minutes) parts.push(`${minutes} хв`);
  parts.push(`${seconds} с`);
  return parts.join(" ");
}

function ResultsPage({ stats, onRestart }) {
  return (
    <main style={{ maxWidth: "480px", margin: "32px auto", padding: "24px", background: "#fff", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <section style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "600", marginBottom: "8px" }}>Результат</h2>
        <p style={{ color: "#888", marginBottom: "24px" }}>Плейсхолдер для відображення статистики після гри.</p>

        <div className="results-stats">
          <div className="results-block">
            <div className="results-label">Ходи</div>
            <div className="results-value">{stats?.moves ?? "--"}</div>
          </div>
          <div className="results-block">
            <div className="results-label">Час</div>
            <div className="results-value">{formatTime(stats?.time)}</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <Button onClick={onRestart}>Грати знову</Button>
          <Button onClick={() => alert('Поділитись (плейсхолдер)')}>Поділитись</Button>
        </div>
      </section>
    </main>
  );
}
export default ResultsPage;