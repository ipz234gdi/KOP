import { useState } from 'react'
import './App.css'
import './Minimal.css'
import Header from './components/common/Header'
import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage'
import ResultsPage from './pages/ResultsPage'

export default function App() {
  const [page, setPage] = useState("start");
  const [gameSettings, setGameSettings] = useState({ diskCount: 3 });
  const [lastStats, setLastStats] = useState(null);


  function handleStart(diskCount) {
    setGameSettings({ diskCount });
    setPage("game");
  }


  function handleFinish(stats) {
    setLastStats(stats);
    setPage("results");
  }


  function handleAbort() {
    setPage("start");
  }


  function handleRestart() {
    setPage("start");
  }


  return (
    <div className="app-container">
      <Header title="Ханойські башти" subtitle="Каркас застосунку" />
      <div>
        {page === "start" && <StartPage onStart={handleStart} />}
        {page === "game" && <GamePage diskCount={gameSettings.diskCount} onFinish={handleFinish} onAbort={handleAbort} />}
        {page === "results" && <ResultsPage stats={lastStats} onRestart={handleRestart} />}
      </div>
      <footer>
        Розроблено студентом Грушевицьким Д.І. ІПЗ-23-4, 2025
      </footer>
    </div>
  );
}

