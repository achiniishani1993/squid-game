//Display all selected players
// Renders the full grid of PlayerCards
// Owns the "which card is selected" state
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

const PlayerSelection = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const PLAYERS = [
    { id: 456, name: "Seong Gi-hun", img: img456 },
    { id: 388, name: "Cho Sang-woo", img: img388 },
    { id: 246, name: "Jang Deok-su", img: img246 },
    { id: 120, name: "Ji-yeong", img: img120 },
    { id: 149, name: "Kang Sae-byeok", img: img149 },
  ];

  const handleSelect = () => {
    setSelectedPlayer(player);
    // save to the local storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    localStorage.getItem(
      "currentUser",
      JSON.stringify({ ...currentUser, character: player }),
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-4">
      <div
        className="bg-white text-dark rounded-4 shadow-lg w-100 mx-2 p-2 d-flex flex-column"
        style={{ maxWidth: "1200px", minHeight: "100vh" }}
      >
        <div className="justify-content-center text-center align-items-center">
          <img
            src={Logo}
            alt="Squid Game logo"
            className="img-fluid mb-3 "
            style={{ maxWidth: "250px" }}
          />

          <p className="mb-2 fs-4">
            "You bet on horses? It's the same here, but we bet on humans. You're
            our horses."
          </p>

          <h2 className="fw-bold mb-2">Select your player</h2>
          {/* need to getItem from localStorage- username */}
          <p>
            Welcome,,
            <span style={{ color: "#E40166", fontWeight: "600" }}>
              username
            </span>
          </p>
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          {PLAYERS.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              isSelected={selectedPlayer?.id === player.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center gap-3 mt-5">
          <Button variant="dark" disabled={!selectedPlayer}  className="btn px-4 py-3 fw-bold fs-1 ">PLAY NOW</Button>

          <Button variant="light"  className="btn leaderboard-btn px-4 py-3 fw-bold fs-6">🏆 LEADERBOARD</Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSelection;
