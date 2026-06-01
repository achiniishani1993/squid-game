// read selectedplayer info & username from localStorage
// save score to storage when game ends
// handle navigation after game ends
// game logic + UI + imports GameControls

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import GameControls from "../components/Game/GameControls";

// (***Fixed Imported*** - Import relevant images and audio correctly)
import dollFront from "../assets/images/doll-front.png";
import dollBack from "../assets/images/doll-back.png";
import player from "../assets/images/player.png";
import price from "../assets/images/wincash.png";
import redLightSound from "../assets/audios/audio-game.mp3";
import "../styles/game.css";

const GamePage = () => {
  const navigate = useNavigate();

  // 🔹 USER + PLAYER - (*** Fixed code *** set currentUser to useState and removed unwanted useEffect)
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")),
  );

  // 🔹 GAME STATE
  const [position, setPosition] = useState(0);
  const [moving, setMoving] = useState(false);
  const [dollFrontFacing, setDollFrontFacing] = useState(false);
  const [time, setTime] = useState(60);
  const [score, setScore] = useState(0);

  // 🔹 REFS
  const moveRef = useRef(null);
  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const gameRunningRef = useRef(true);

  // timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          endGame(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // (******Fixed Code****** doll and audio sync is reviced and set random turning for the doll)
  useEffect(() => {
    audioRef.current = new Audio(redLightSound);

    const startLoop = () => {
      if (!gameRunningRef.current) return;

      setDollFrontFacing(false);
      audioRef.current.play().catch(() => {});

      const greenTime = Math.random() * 3000 + 2000;

      setTimeout(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        setDollFrontFacing(true);

        const redTime = Math.random() * 2000 + 1000;

        setTimeout(startLoop, redTime);
      }, greenTime);
    };

    // (*** Fixed Code **** -add missed statloop to correct the error )
    startLoop();

    return () => {
      gameRunningRef.current = false;

      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // 🔥 PLAYER MOVEMENT
  useEffect(() => {
    if (moving) {
      moveRef.current = setInterval(() => {
        setPosition((prev) => {
          const next = prev + 1;

          // ❌ PLAYER MOVED DURING RED LIGHT
          if (dollFrontFacing) {
            endGame(false);
            return prev;
          }

          // 🏆 PLAYER WINS
          if (next >= 100) {
            endGame(true);
            return 100;
          }

          return next;
        });
      }, 100);
    }

    return () => clearInterval(moveRef.current);
  }, [moving, dollFrontFacing]);

  // 💰 SCORE LOGIC
  useEffect(() => {
    setScore(position * 10);
  }, [position]);

  // 🔥 END GAME
  const endGame = (won) => {
    clearInterval(moveRef.current);
    clearInterval(timerRef.current);

    gameRunningRef.current = false;

    // SAVE SCORE
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    console.log("username" + currentUser?.username);
    leaderboard.push({
      username: currentUser?.username || "Guest",
      score,
    });

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    if (won) {
      navigate("/win");
    } else {
      navigate("/eliminate");
    }
  };

  // 🎮 CONTROLS
  const startMoving = () => {
    setMoving(true);
  };

  const stopMoving = () => {
    setMoving(false);
  };

  return (
    //(**** Fixed Code ****- Revised UI according to the design and add bootstrap and css to make responsive to all devices)
    <div className="game-page">
      {/* HEADER  add user data properly from localstorage and bootstrap*/}
      <div className="game-header border border-white rounded p-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div className="d-flex align-items-center gap-3">
          <img
            src={currentUser?.character.img}
            alt={currentUser?.character.name}
            className="img-fluid rounded user-character-img"
          />

          <div>
            <h5 className="mb-1 text-white">{currentUser?.username}</h5>
            <p className="mb-0 text-white"># {currentUser?.character.id}</p>
          </div>
        </div>

        <h5 className="mb-0 text-white">
          Score:
          <span className="fs-2 text-pink">{score}</span>
        </h5>

        <h5 className="mb-0 text-white">
          Time:
          <span className="fs-2 text-pink">{time}s</span>
        </h5>
      </div>

      {/* DOLL - (***Fixed code***** Replaced css and add bootstrap) */}
      <div className="doll-container">
        <img
          src={dollFrontFacing ? dollFront : dollBack}
          alt="Doll"
          className="doll-img"
        />
      </div>

      {/* (***Fixed code***** Placed money bag and player on the track bar) */}
      <div className="track-wrapper">
        <div className="track">
          <div className="player" style={{ left: `${position}%` }}>
            <img src={player} alt="player" />
          </div>

          <div className="goal">
            <img src={price} alt="goal" />
          </div>
        </div>
      </div>

      <GameControls startMoving={startMoving} stopMoving={stopMoving} />

      <p className="game-info fw-bold text-center mt-5 px-3">
        ONLY MOVE FORWARD ON THE DOLL BACK — FREEZE ON THE DOLL FRONT!
      </p>
    </div>
  );
};

export default GamePage;
