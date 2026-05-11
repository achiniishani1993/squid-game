import Button from "react-bootstrap/Button";

const GameControls = ({ startMoving, stopMoving }) => {
  return (
    <div className="controls">

      <Button
        variant="danger"
        className="move-btn"
        onMouseDown={startMoving}
        onMouseUp={stopMoving}
      >
        MOVE FORWARD
      </Button>

    </div>
  );
};

export default GameControls;