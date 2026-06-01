//Display all selected players
// Renders the full grid of PlayerCards
//playerSelection UI

import { useState } from "react";
import PlayerCard from "./PlayerCard";
import Button from "react-bootstrap/Button";
import Logo from "../../assets/images/logo-Pink.png";
import img456 from "../../assets/images/456.png";
import img388 from "../../assets/images/388.png";
import img246 from "../../assets/images/246.png";
import img120 from "../../assets/images/120.png";
import img149 from "../../assets/images/149.png";
import "../../styles/playerSelection.css";
import { useNavigate } from "react-router-dom";

const PlayerSelection = () => {
  const navigate = useNavigate();

  // Get data from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const PLAYERS = [
    { id: 456, name: "Seong Gi-hun", img: img456 },
    { id: 388, name: "Cho Sang-woo", img: img388 },
    { id: 246, name: "Jang Deok-su", img: img246 },
    { id: 120, name: "Ji-yeong", img: img120 },
    { id: 149, name: "Kang Sae-byeok", img: img149 },
  ];

  const handleSelect = (player) => {
    setSelectedPlayer(player);

    // save to the local storage
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...currentUser, character: player, hasPlayed: false, isWinner: false }),
    );
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div
        className="card shadow-lg border-0 w-100 selection-card"
      >
        <div className="card-body d-flex flex-column p-4 p-md-5">
          <div className="text-center mb-4">
            <img
              src={Logo}
              alt="Squid Game logo"
              className="img-fluid mb-3 game-logo"
            />

            <p className="fs-5 mb-2">
              "You bet on horses? It's the same here, but we bet on humans.
              You're our horses."
            </p>

            <h2 className="fw-bold">Select your player</h2>

            <p className="mb-0">
              Welcome,
              <span className="fw-semibold text-danger">
                {currentUser.username}
              </span>
            </p>
          </div>

          <div className="row g-3 justify-content-center">
            {PLAYERS.map((player) => (
              <div key={player.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <PlayerCard
                  player={player}
                  isSelected={selectedPlayer?.id === player.id}
                  onSelect={handleSelect}
                />
              </div>
            ))}
          </div>

          <div className="d-flex flex-column align-items-center gap-3 mt-4">
            <Button
              variant="dark"
              disabled={!selectedPlayer}
              className="px-4 py-2 fw-bold fs-4 playnow-btn"
              onClick={() => navigate("/game")}
            >
              PLAY NOW
            </Button>

            <Button
              variant="outline-secondary"
              className="px-4 py-2 fw-semibold leaderboard-btn"
              onClick={() => navigate("/leaderboard")}
            >
              🏆 LEADERBOARD
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSelection;
