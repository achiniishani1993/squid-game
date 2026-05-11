// read selectedplayer info & username from localStorage
// save score to storage when game ends
// handle navigation after game ends
// game logic + UI + imports GameControls

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import GameControls from "../components/Game/GameControls";

import dollFront from "../assets/images/456.png";
import dollBack from "../assets/images/388.png";

import redLightSound from "../assets/audio/redlight.mp3";

import "../styles/gamePage.css";

const GamePage = () => {
  const navigate = useNavigate();

  // 🔹 USER + PLAYER
  const [currentUser, setCurrentUser] = useState(null);

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

  // 🔥 LOAD USER FROM STORAGE
  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem("currentUser")) || {};

    setCurrentUser(savedUser);
  }, []);

  // 🔥 TIMER
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

  // 🔥 AUDIO + DOLL SYNC
  useEffect(() => {
    audioRef.current = new Audio(redLightSound);

    const startLoop = () => {
      if (!gameRunningRef.current) return;

      // 🟢 GREEN LIGHT
      setDollFrontFacing(false);

      audioRef.current.play();

      setTimeout(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        // 🔴 RED LIGHT
        setDollFrontFacing(true);

        setTimeout(() => {
          startLoop();
        }, Math.random() * 2000 + 1000);
      }, 2000);
    };

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
    const leaderboard =
      JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({
      username: currentUser?.username || "Guest",
      score,
    });

    localStorage.setItem(
      "leaderboard",
      JSON.stringify(leaderboard)
    );

    if (won) {
      navigate("/win");
    } else {
      navigate("/eliminated");
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
    <div className="game-page">

      {/* HEADER */}
      <div className="game-header">
        <h2>
          Player:{" "}
          <span className="pink">
            {currentUser?.username || "Guest"}
          </span>
        </h2>

        <h3>Score: {score}</h3>

        <h3>Time: {time}s</h3>
      </div>

      {/* DOLL */}
      <div className="doll-container">
        <img
          src={dollFrontFacing ? dollFront : dollBack}
          alt="Doll"
          className="doll-img"
        />
      </div>

      {/* TRACK */}
      <div className="track">

        {/* PLAYER */}
        <div
          className="player"
          style={{ left: `${position}%` }}
        >
          <img
            src={currentUser?.character?.img}
            alt="Selected character"
          />
        </div>

        {/* GOAL */}
        <div className="goal">
          💰
        </div>
      </div>

      {/* CONTROLS */}
      <GameControls
        startMoving={startMoving}
        stopMoving={stopMoving}
      />

    </div>
  );
};

export default GamePage;