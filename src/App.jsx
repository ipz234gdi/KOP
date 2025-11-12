import { useState } from 'react'
import './App.css'
import './Minimal.css'
import Header from './components/Header'
import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage'
import ResultsPage from './pages/ResultsPage'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const [page, setPage] = useState("start");
  const [lastStats, setLastStats] = useState(null);

  const [settings, setSettings] = useLocalStorage('hanoiSettings', {
    diskCount: 3,
    difficulty: 1,
  });

  function handleStart() {
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
        {page === "start" && (
          <StartPage
            onStart={handleStart}
            settings={settings}
            setSettings={setSettings}
          />
        )}

        { }
        {page === "game" && (
          <GamePage
            settings={settings}
            onFinish={handleFinish}
            onAbort={handleAbort}
          />
        )}
        {page === "results" && <ResultsPage stats={lastStats} onRestart={handleRestart} />}
      </div>
      <footer>
        Розроблено студентом Грушевицьким Д.І. ІПЗ-23-4, 2025
      </footer>
    </div>
  );
}

