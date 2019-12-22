import React, { useState } from 'react';
import styled from 'styled-components';
import MiniGameBoard from './MiniGameBoard';
import GameProvider from '../providers/GameProvider';
import constants from '../constants/constants';

const BigBoardWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: 0 auto;
`;

const GameBoard = () => {
  const [gameSquares, setSquares] = useState(constants.STARTING_GAME_BOARD);

  const getGameBoards = gameBoards => {
    return gameBoards.map(gameBoard => {
      return (
        <MiniGameBoard
          key={gameBoard.squareIndex}
          gameBoard={gameBoard}
          bigGameSquares={gameSquares}
          setBigGameSquares={setSquares}
        />
      );
    });
  };

  return (
    <GameProvider>
      <BigBoardWrapper>{getGameBoards(gameSquares)}</BigBoardWrapper>
    </GameProvider>
  );
};

export default GameBoard;
