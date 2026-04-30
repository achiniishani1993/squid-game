import { Routes, Route , Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StartPlayPage from "../pages/StartPlayPage";
import GamePage from "../pages/GamePage";
import LeaderBoardPage from "../pages/LeaderboardPage";
import EliminatedPage from "../pages/EliminatedPage";
import WinPage from "../pages/WinPage";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/startPlay" element={<StartPlayPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
        <Route path="/eliminate" element={<EliminatedPage />} />
        <Route path="/win" element={<WinPage />} />

      

        {/* ── 404 — unknown routes go back to login ── */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
