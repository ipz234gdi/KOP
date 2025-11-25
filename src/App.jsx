import { useState } from 'react'
import './App.css'
// import './Minimal.css'
import Header from './components/common/Header'
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

  // отримує values з StartPage: { userId, diskCount, difficulty }
  function handleStart(values) {
    const { userId, difficulty, diskCount } = values;
    navigate(`/user/${encodeURIComponent(userId)}/game/${difficulty}/${diskCount}`);
  }

  // тепер отримує stats та userId
  function handleFinish(stats, userId) {
    setLastStats(stats);
    navigate(`/user/${encodeURIComponent(userId)}/results`);
  }

  function handleRestart() {
    navigate('/');
  }

  return (
    <div className="app-container">
      <Header title="Ханойські башти" subtitle="Повний робочий прототип" />

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
          path="/user/:userId/game/:difficulty/:diskCount"
          element={
            <GamePage
              onFinish={(stats, userId) => handleFinish(stats, userId)}
              onAbort={() => navigate('/')}
            />
          }
        />

        <Route
          path="/user/:userId/results"
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

