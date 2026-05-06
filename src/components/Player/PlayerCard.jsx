// Just ONE card — image, number, name, selected highlight
// Receives:   player, selected, onClick  (all from parent)
// Returns:    just the card UI

import Card from "react-bootstrap/Card";

const PlayerCard = ({ player, isSelected, onSelect }) => {
  if (!player) return null;

  return (
    <div>
      <Card onClick={() => onSelect(player)} style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={player.img}
          alt={player.name}
          style={{ width: "80px", borderRadius: "50%" }}
        />
        <Card.Body>
          <Card.Title> #{player.id}</Card.Title>
          <Card.Text>{player.name}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PlayerCard;
