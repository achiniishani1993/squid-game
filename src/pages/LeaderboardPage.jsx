//random generate users a from API
//get real user from localStorage
// Read scores from localStorage
//merge all players
//sort score
// Display ranked list
//Handle navigation

import { useEffect, useState } from "react";
import "../styles/leaderboard.css";
import { useNavigate } from "react-router-dom";

const PLAYERS = [
  { id: 456, name: "Seong Gi-hun" },
  { id: 388, name: "Cho Sang-woo" },
  { id: 246, name: "Jang Deok-su" },
  { id: 120, name: "Ji-yeong" },
  { id: 149, name: "Kang Sae-byeok" },
];

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  //  run once when page first loads
  useEffect(() => {
    createLeaderboard();
  }, []);

  const createLeaderboard = async () => {
    try {
      // get random users from exisiting API
      const response = await fetch("https://randomuser.me/api/?results=9");

      const data = await response.json();

      // create random players and give character data randomly
      const randomPlayers = data.results.map((user) => {
        const randomCharacter =
          PLAYERS[Math.floor(Math.random() * PLAYERS.length)];

        return {
          username: user.login.username,
          characterId: randomCharacter.id,
          characterName: randomCharacter.name,

          // add random score to the random generated players
          score: Math.floor(Math.random() * 900),

          isRealUser: false,
        };
      });

      // Get real user data from localStorage

      const savedUser = JSON.parse(localStorage.getItem("currentUser")) || {};
      const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
      // take last score
      const lastScore = leaderboard[leaderboard.length - 1]?.score || 0;

      let realUser = null;

      if (savedUser && savedUser.hasPlayed && savedUser.isWinner) {
        realUser = {
          username: savedUser.username,
          characterId: savedUser.character.id,
          characterName: savedUser.character.name,
          score: lastScore,
          isRealUser: true,
        };
      }

      // merge all players
      const allPlayers = realUser
        ? [...randomPlayers, realUser]
        : randomPlayers;

      // now sort by the score - high to low
      allPlayers.sort((a, b) => b.score - a.score);

      // add rank (numbering 1 to ....)
      const rankedPlayers = allPlayers.map((player, index) => ({
        rank: index + 1,
        ...player,
      }));

      setPlayers(rankedPlayers);
    } catch (error) {
      console.log("Leaderboard Error:", error);
    }
  };

  return (
    <div className="container-fluid py-5 px-3 d-flex justify-content-center">
      {/* title */}
      <div className="leaderboard-container">
        <div className="text-center mb-5">
          <h1 className="fw-bold title">🏆 LEADERBOARD</h1>

          <h2 className=" fw-bold title-second">Top Survivors</h2>
        </div>

        {/* leaderboard list */}
        <div className="container">
          <div className="d-flex flex-column gap-4">
            {players.map((player) => (
              <div
                key={player.rank}
                className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 p-md-4 player-card"
                style={{
                  border: player.isRealUser
                    ? "3px solid #00ff99"
                    : "2px solid white",

                  boxShadow: player.isRealUser
                    ? "0 0 15px #00ff99"
                    : "0 0 10px rgba(255,255,255,0.3)",
                }}
              >
                <div className="d-flex align-items-center gap-3 gap-md-4 w-100">
                  {/* rank */}
                  <h1 className="m-0 fw-bold text-center rank">
                    {player.rank}
                  </h1>

                  <div className="flex-grow-1">
                    <h2 className="m-0 fw-bold username">{player.username}</h2>

                    <p className="mt-2 mb-0 character">
                      #{player.characterId} {player.characterName}
                    </p>
                  </div>
                </div>

                {/* SCORE */}
                <h1 className="m-0 fw-bold text-center score">
                  {player.score}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-sm-row justify-content-center align-items-center gap-3 px-2 px-md-5 button-container">
          <button
            className="btn back-btn fw-bold w-sm-auto"
            onClick={() => navigate("/startPlay")}
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
