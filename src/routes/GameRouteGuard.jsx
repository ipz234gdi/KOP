import { useParams, Navigate } from "react-router-dom";

export default function GameRouteGuard({ children }) {
  const { userId, difficulty, diskCount } = useParams();

  const diff = Number(difficulty);
  const disks = Number(diskCount);

  const validDifficulty = [1, 2, 3];
  const minDisks = 3;
  const maxDisks = 8;

  const isValid =
    userId &&
    validDifficulty.includes(diff) &&
    disks >= minDisks &&
    disks <= maxDisks;

  if (!isValid) {
    return <Navigate to="/404" replace />;
  }

  return children;
}
