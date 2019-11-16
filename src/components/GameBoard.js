import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Square from './Square';
import { GameContext } from '../providers/GameProvider';
import deepClone from '../utils/deepClone';
import constants from '../constants/constants';

const BoardWrapper = styled.div`
  height: 33%;
  display: flex;
  align-items: center;
  flex: 0 0 33%;
  border: 3px solid black;
  cursor: pointer;
  &:nth-child(-n + 3) {
    border-top: none;
  }
  &:nth-child(n + 7) {
    border-bottom: none;
  }
  &:nth-child(3n + 1) {
    border-left: none;
  }
  &:nth-child(3n + 3) {
    border-right: none;
  }
`;

const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 95%;
  width: 95%;
  margin: 0 auto;
`;

const getNextPlayer = player => {
  if (player === constants.PLAYER_ONE) {
    return constants.PLAYER_TWO;
  }
  return constants.PLAYER_ONE;
};

const GameBoard = props => {
  const game = useContext(GameContext);
  const { index } = props;
  const [activeBoard, setActiveBoard] = useState(false);
  const [gameSquares, setSquares] = useState(constants.STARTING_GAME_BOARD);

  useEffect(() => {
    if (game.activeGameBoard === index) {
      return setActiveBoard(true);
    }
    setActiveBoard(false);
  }, [index, game.activeGameBoard]);

  const claimSquare = indexOfSquare => {
    const updatedGameSquares = deepClone(gameSquares);
    updatedGameSquares[indexOfSquare].ownedBy = game.player;
    setSquares(updatedGameSquares);
  };

  const handleSquareClick = indexOfSquare => () => {
    claimSquare(indexOfSquare);
    game.setActiveGameBoard(indexOfSquare);
    game.setPlayer(getNextPlayer(game.player));
  };

  const getBoardSquares = squares =>
    squares.map(square => {
      return (
        <Square
          key={square.squareIndex}
          squareIndex={square.squareIndex}
          activeBoard={activeBoard}
          handleSquareClick={handleSquareClick}
          ownedBy={square.ownedBy}
        />
      );
    });

  return (
    <BoardWrapper>
      <Board>{getBoardSquares(gameSquares)}</Board>
    </BoardWrapper>
  );
};

export default GameBoard;
