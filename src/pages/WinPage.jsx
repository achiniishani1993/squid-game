import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Logo from "../assets/images/logo-Gold.png";
import "../styles/win.css";

const WinPage = () => {
  const navigate = useNavigate();

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
        <p className="fs-1 fw-bold ">Score: </p>{" "}
        {/* TODO - need to read score from api */}
      </div>

      <div className="d-flex flex-column flex-md-row gap-5 p-4 mt-4 w-100 justify-content-center align-items-center">
        <Button
          variant="light"
          className="big-btn fw-bold play-again-btn"
          onClick={() => navigate("/game")}
        >
          PLAY AGAIN
        </Button>
        <Button
          variant="dark"
          className="big-btn fw-bold leaderboard-btn"
          onClick={() => navigate("/leaderboard")}
        >
          LEADERBOARD
        </Button>
      </div>
    </div>
  );
};

export default WinPage;
