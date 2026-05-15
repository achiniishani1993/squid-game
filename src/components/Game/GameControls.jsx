
//(**** Fixed ------Improved UI move forward button ***-add additional feature color change to the button and touch for mobile and tablet)

import { useState } from "react";
import Button from "react-bootstrap/Button";

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
        onTouchStart={handleStart} /* for mobile and tablet devicess */
        onTouchEnd={handleStop}
        className="text-white border-0 w-100 fs-1 fw-bold"
        style={{
          backgroundColor: down ? "#fa142b" : "#18E32D",
          maxWidth: "350px",
          letterSpacing: "2px",
          touchAction: "none", 
        }}
      >
        MOVE FORWARD
      </Button>
    </div>
  );
};

export default GameControls;