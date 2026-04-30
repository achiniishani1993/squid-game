import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../styles/eliminated.css";

const EliminatedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="eliminated d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="fw-bold text-white display-1 display-md-1 display-sm-2">
        ELIMINATED!
      </h1>

      <div className="d-flex flex-column flex-md-row gap-5 p-4 mt-4 w-100 justify-content-center align-items-center">
        <Button
          variant="light"
          className="big-btn fw-bold"
          onClick={() => navigate("/game")}
        >
          TRY AGAIN
        </Button>
        <Button
          variant="dark"
          className="big-btn fw-bold"
          onClick={() => navigate("/leaderboard")}
        >
          LEADERBOARD
        </Button>
      </div>
    </div>
  );
};

export default EliminatedPage;
