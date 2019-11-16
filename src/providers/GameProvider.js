import React, { useState } from 'react';
import constants from '../constants/constants';

export const GameContext = React.createContext();

const GameProvider = props => {
  const [activeGameBoard, setActiveGameBoard] = useState(0);
  const [player, setPlayer] = useState(constants.PLAYER_ONE);

  const values = {
    activeGameBoard,
    setActiveGameBoard,
    player,
    setPlayer
  };

  return (
    <GameContext.Provider value={values}>{props.children}</GameContext.Provider>
  );
};

export default GameProvider;
