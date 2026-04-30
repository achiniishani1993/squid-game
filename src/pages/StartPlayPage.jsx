//the full page - background, header, quote
// get username from GameContext to show in welcome,<username>
// SelectedPlayer(player)  → saves to GameContext for future use in game page so GamePage reads it from GameContext.jsx
//Handles navigation after player is confirmed

import PlayerSelection from "../components/Player/PlayerSelection"

const StartPlayPage = () => {
  return (
    <div>
   <PlayerSelection/>
    </div>
  )
}

export default StartPlayPage