// Just ONE card — image, number, name, selected highlight
// Receives:   player, selected, onClick  (all from parent)
// Returns:    just the card UI

import Card from "react-bootstrap/Card";

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
          border: isSelected ? "2px solid hotpink" : "1px solid #E40166",
        }}
      >
        <div className="d-flex justify-content-center mt-3">
          <Card.Img
            src={player.img}
            alt={player.name}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover", 
              borderRadius: "50%",
            }}
          />
        </div>

        <Card.Body className="d-flex flex-column justify-content-center align-items-center p-2">
          <Card.Title className="mb-1 fs-6 rounded "  style={{ backgroundColor: "#E40166" , width:"70px" }}> 
            #{player.id}
          </Card.Title>

          <Card.Text
            className="mb-0"
            style={{
              fontSize: "0.9rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap", 
            }}
          >
            {player.name}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PlayerCard;
