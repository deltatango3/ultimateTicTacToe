import React from 'react';
import styled from 'styled-components';
import MiniGameBoard from './MiniGameBoard';
import GameProvider from '../providers/GameProvider';

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
  const getGameBoards = numberOfBoards => {
    return [...Array(numberOfBoards).keys()].map(index => (
      <MiniGameBoard key={index} index={index} />
    ));
  };

  return (
    <GameProvider>
      <BigBoardWrapper>{getGameBoards(NUMBER_OF_GAME_BOARDS)}</BigBoardWrapper>
    </GameProvider>
  );
};

export default GameBoard;
