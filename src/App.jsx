import { useState } from 'react'
import './App.css'
import './Minimal.css'
import Header from './components/Header'
import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage'
import ResultsPage from './pages/ResultsPage'
import { useLocalStorage } from './hooks/useLocalStorage'
import { Routes, Route, useNavigate } from 'react-router-dom'

export default function App() {
  const navigate = useNavigate();

  const [lastStats, setLastStats] = useLocalStorage("lastStats", null);

  const [settings, setSettings] = useLocalStorage('hanoiSettings', {
    diskCount: 3,
    difficulty: 1,
  });

  function handleStart() {
    navigate(`/game/${settings.difficulty}/${settings.diskCount}`);
  }

  function handleFinish(stats) {
    setLastStats(stats);
    navigate('/results');
  }

  function handleRestart() {
    navigate('/');
  }

  return (
    <div className="app-container">
      <Header title="Ханойські башти" subtitle="Каркас застосунку" />

      <Routes>
        <Route
          path="/"
          element={
            <StartPage
              onStart={handleStart}
              settings={settings}
              setSettings={setSettings}
            />
          }
        />

        <Route
          path="/game/:difficulty/:diskCount"
          element={
            <GamePage
              onFinish={handleFinish}
              onAbort={() => navigate('/')}
            />
          }
        />

        <Route
          path="/results"
          element={
            <ResultsPage
              stats={lastStats}
              onRestart={handleRestart}
            />
          }
        />
      </Routes>

      <footer>
        Розроблено студентом Грушевицьким Д.І. ІПЗ-23-4, 2025
      </footer>
    </div>
  );
}

