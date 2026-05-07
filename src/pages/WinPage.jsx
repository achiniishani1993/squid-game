import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Logo from "../assets/images/logo-Gold.png";
import "../styles/win.css";
import winAudio from "../assets/audios/audio-win.mp3"; /* imported audio */
import { useEffect, useRef } from "react";

const WinPage = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  /*  Add and play audio - Audio Start */
  useEffect(() => {
    audioRef.current = new Audio(winAudio);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    audioRef.current.play().catch((err) => {
      console.warn("Autoplay blocked:", err);
    });
    // clean audio
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);
  /*  Handle Navigation path and audio stop */
  const handleNavigate = (path) => {
    // Stop audio before navigating
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    navigate(path);
  };
  /*   - Audio End */

  return (
    <div className="win d-flex flex-column justify-content-center align-items-center text-center">
      <div className="d-flex flex-column align-items-center justify-content-center gap-3 mt-3">
        <img
          src={Logo}
          alt="Squid Game logo"
          className="img-fluid"
          style={{ maxWidth: "250px" }}
        />
        <h1 className="fw-bold display-1 display-md-1 display-sm-2">WINNER!</h1>
        <p className="fs-1 fw-bold ">Score: </p>
        {/* TODO - need to read score from localStorage */}
      </div>

      <div className="d-flex flex-column flex-md-row gap-5 p-4 mt-4 w-100 justify-content-center align-items-center">
        <Button
          variant="light"
          className="big-btn fw-bold play-again-btn"
          onClick={() => handleNavigate("/game")}
        >
          PLAY AGAIN
        </Button>
        <Button
          variant="dark"
          className="big-btn fw-bold leaderboard-btn"
          onClick={() => handleNavigate("/leaderboard")}
        >
          LEADERBOARD
        </Button>
      </div>
    </div>
  );
};

export default WinPage;
