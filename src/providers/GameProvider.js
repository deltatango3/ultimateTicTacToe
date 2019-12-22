import React, { useState, useRef } from 'react';
import constants from '../constants/constants';

export const GameContext = React.createContext();

const GameProvider = props => {
  const [activeGameBoard, setActiveGameBoard] = useState(0);
  const [player, setPlayer] = useState(constants.PLAYER_ONE);
  const startOfGame = useRef(true);

  const switchPlayer = currentPlayer => {
    if (!startOfGame.current) {
      const nextPlayer =
        currentPlayer === constants.PLAYER_ONE
          ? constants.PLAYER_TWO
          : constants.PLAYER_ONE;
      return setPlayer(nextPlayer);
    }
  };

  const values = {
    activeGameBoard,
    setActiveGameBoard,
    player,
    switchPlayer,
    startOfGame
  };

  return (
    <GameContext.Provider value={values}>{props.children}</GameContext.Provider>
  );
};

export default GameProvider;
