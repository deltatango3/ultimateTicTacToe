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

const NUMBER_OF_GAME_BOARDS = 9;

const GameBoard = () => {
  const [gameSquares, setSquares] = useState(constants.STARTING_GAME_BOARD);

  console.log(gameSquares);

  // const getGameBoards = numberOfBoards => {
  //   return [...Array(numberOfBoards).keys()].map(index => (
  //     <MiniGameBoard
  //       key={index}
  //       index={index}
  //       bigGameSquares={gameSquares}
  //       setBigGameSquares={setSquares}
  //     />
  //   ));
  // };
  const getGameBoards = gameBoards => {
    return gameBoards.map((gameBoard, index) => {
      return (
        <MiniGameBoard
          key={index}
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
