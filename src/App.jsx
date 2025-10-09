import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Minimal.css'
import Button from './components/Button'
import Board from './components/Board'
import Header from './components/Header'
import Rod from './components/Rod'
import Disk from './components/Disk'
import StartPage from './components/StartPage'
import GamePage from './components/GamePage'
import ResultsPage from './components/ResultsPage'

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
      <Header title="Ханойські башти" subtitle="Каркас застосунку — без бізнес-логіки" />
      <div>
        {page === "start" && <StartPage onStart={handleStart} />}
        {page === "game" && <GamePage diskCount={gameSettings.diskCount} onFinish={handleFinish} onAbort={handleAbort} />}
        {page === "results" && <ResultsPage stats={lastStats} onRestart={handleRestart} />}
      </div>
      <footer>
        UI scaffold — витягніть компоненти до окремих файлів для виробничого коду.
      </footer>
    </div>
  );
}

