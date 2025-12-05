import './App.css'
import Header from './components/common/Header'
import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage'
import ResultsPage from './pages/ResultsPage'
import { useLocalStorage } from './hooks/useLocalStorage'
import { saveGameResult } from './utils/gameStorage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import GameRouteGuard from "./routes/GameRouteGuard";
import NotFoundPage from "./pages/NotFoundPage";
import { useDispatch } from 'react-redux';
import { addResult } from './store/slices/resultsSlice';

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [lastStats, setLastStats] = useLocalStorage("lastStats", null);

  function handleStart(values) {
    const { userId, difficulty, diskCount } = values;
    navigate(`/user/${encodeURIComponent(userId)}/game/${difficulty}/${diskCount}`);
  }

  function handleFinish(stats, userId, difficulty, diskCount, lost = false) {
    const decodedUserId = userId ? decodeURIComponent(userId) : userId;
    const now = Date.now();

    dispatch(addResult({
      id: now,
      userId: decodedUserId,
      moves: stats?.moves || 0,
      time: stats?.time || 0,
      lost: !!lost,
      difficulty: difficulty,
      diskCount: diskCount,
      date: now
    }));

    setLastStats(stats);
    try {
      saveGameResult({ stats, userId: decodedUserId, difficulty, diskCount, lost });
    } catch (err) {
      console.error('Save error:', err);
    }

    navigate(`/user/${encodeURIComponent(decodedUserId)}/results`);
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
            <StartPage onStart={handleStart} />
          }
        />

        <Route
          path="/user/:userId/game/:difficulty/:diskCount"
          element={
            <GameRouteGuard>
              <GamePage
                onFinish={handleFinish}
                onAbort={() => navigate('/')}
              />
            </GameRouteGuard>
          }
        />

        <Route
          path="/user/:userId/results"
          element={
            <ResultsPage
              onRestart={handleRestart}
            />
          }
        />

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <footer>
        Розроблено студентом Грушевицьким Д.І. ІПЗ-23-4, 2025
      </footer>
    </div>
  );
}

