import React, { useState, useContext, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import Square from './Square';
import { GameContext } from '../providers/GameProvider';
import deepClone from '../utils/deepClone';
import constants from '../constants/constants';
import xIcon from '../images/times-solid.svg';
import circleIcon from '../images/circle-regular.svg';

const BoardWrapper = styled.div`
  height: 33%;
  display: flex;
  align-items: center;
  flex: 0 0 33%;
  border: 3px solid black;
  position: relative;
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
  z-index: 1;
`;

const OwnerIconContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: initial;
`;

const OwnerIcon = styled.img`
  height: 80%;
  width: 80%;
`;

const MiniGameBoard = props => {
  const game = useContext(GameContext);
  const { squareIndex, ownedBy } = props.gameBoard;
  const [activeBoard, setActiveBoard] = useState(false);
  const [gameSquares, setSquares] = useState(constants.STARTING_GAME_BOARD);
  const { switchPlayer, player, startOfGame } = game;
  const gameOwnerIcon = ownedBy === constants.PLAYER_ONE ? xIcon : circleIcon;

  useEffect(() => {
    if (game.activeGameBoard === squareIndex && !ownedBy) {
      return setActiveBoard(true);
    }
    return setActiveBoard(false);
  }, [squareIndex, game.activeGameBoard, ownedBy]);

  const claimMiniBoard = player => {
    const updatedBigGameSquares = deepClone(props.bigGameSquares);
    updatedBigGameSquares[squareIndex].ownedBy = player;
    props.setBigGameSquares(updatedBigGameSquares);
  };

  const setGameBoardStatus = (gameSquares, currentPlayer) => {
    const match = owner => gameSquares[owner].ownedBy === currentPlayer;
    constants.winningMatches.forEach(winningMatch => {
      if (winningMatch.every(match)) {
        claimMiniBoard(currentPlayer);
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
      {ownedBy && (
        <OwnerIconContainer>
          <OwnerIcon src={gameOwnerIcon} />
        </OwnerIconContainer>
      )}
      <Board>{getBoardSquares(gameSquares)}</Board>
    </BoardWrapper>
  );
};

export default MiniGameBoard;
