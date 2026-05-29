//(**** Fixed ------Improved UI move forward button ***-add additional feature color change to the button and touch for mobile and tablet)

import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../../styles/game.css";

const GameControls = ({ startMoving, stopMoving }) => {
  const [down, setDown] = useState(false);

  const handleStart = () => {
    setDown(true);
    startMoving();
  };

  const handleStop = () => {
    setDown(false);
    stopMoving();
  };

  return (
    <div className="controls">
      <Button
        onMouseDown={handleStart}
        onMouseUp={handleStop}
        onMouseLeave={handleStop}
        onTouchStart={handleStart}
        onTouchEnd={handleStop}
        className={`move-button ${
          down ? "down" : "up"
        } text-white border-0 w-100 fs-1 fw-bold`}
      >
        MOVE FORWARD
      </Button>
    </div>
  );
};

export default GameControls;
