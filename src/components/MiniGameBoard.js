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

const MiniGameBoard = props => {
  const game = useContext(GameContext);
  const { index } = props;
  const [activeBoard, setActiveBoard] = useState(false);
  const [gameSquares, setSquares] = useState(constants.STARTING_GAME_BOARD);
  const [gameWon, setGameWon] = useState(false);
  const { switchPlayer, player, startOfGame } = game;

  useEffect(() => {
    if (gameWon) {
      console.log('gameboard is won');
    }
  }, [gameWon]);

  useEffect(() => {
    if (game.activeGameBoard === index && gameWon === false) {
      return setActiveBoard(true);
    }
    setActiveBoard(false);
  }, [index, game.activeGameBoard, gameWon]);

  const setGameBoardStatus = (gameSquares, currentPlayer) => {
    const match = owner => gameSquares[owner].ownedBy === currentPlayer;
    constants.winningMatches.forEach(winningMatch => {
      if (winningMatch.every(match)) {
        setGameWon(true);
      }
    });
  };

  const claimSquare = (indexOfSquare, currentPlayer) => {
    const updatedGameSquares = deepClone(gameSquares);
    updatedGameSquares[indexOfSquare].ownedBy = currentPlayer;
    setSquares(updatedGameSquares);
    setGameBoardStatus(updatedGameSquares, currentPlayer);
  };

  const handleSquareClick = indexOfSquare => () => {
    if (startOfGame.current) {
      startOfGame.current = false;
    }
    claimSquare(indexOfSquare, player);
    switchPlayer(player);
    game.setActiveGameBoard(indexOfSquare);
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

export default MiniGameBoard;
