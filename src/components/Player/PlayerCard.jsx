// Just ONE card — image, number, name, selected highlight
// Receives:   player, selected, onClick  (all from parent)
// Returns:    just the card UI

import Card from "react-bootstrap/Card";
import "../../styles/playerSelection.css";

const PlayerCard = ({ player, isSelected, onSelect }) => {
  if (!player) return null;

  return (
    <div className="d-flex justify-content-center">
      <Card
        onClick={() => onSelect(player)}
        className="text-center shadow-sm h-100"
        style={{
          width: "160px",
          height: "220px",
          cursor: "pointer",
          border: isSelected ? "3px solid hotpink" : "1px solid #E40166",
        }}
      >
        <div className="d-flex justify-content-center mt-3 ">
          <Card.Img src={player.img} alt={player.name} className="player-img" />
        </div>

        <Card.Body className="d-flex flex-column justify-content-center align-items-center p-2">
          <Card.Title className="mb-1 fs-6 rounded card-title">
            #{player.id}
          </Card.Title>

          <Card.Text className="mb-0 card-text">{player.name}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PlayerCard;
