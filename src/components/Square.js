import React, { Fragment } from 'react';
import styled from 'styled-components';

const SquareTile = styled.div`
  position: relative;
  flex: 0 0 calc((100% / 3) - 4px);
  border: 2px solid green;
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

const DisabledSquareTile = styled(SquareTile)`
  border: 2px solid grey;
  cursor: initial;
`;

const PlayedSquare = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
`;

const Square = props => {
  const getPlayerIcon = ownedBy => {
    if (ownedBy === 'playerOne') {
      return 'x';
    }
    if (ownedBy === 'playerTwo') {
      return 'o';
    }
    return '';
  };

  return (
    <Fragment>
      {props.activeBoard && (
        <SquareTile onClick={props.handleSquareClick(props.squareIndex)}>
          <PlayedSquare>{getPlayerIcon(props.ownedBy)}</PlayedSquare>
        </SquareTile>
      )}
      {!props.activeBoard && (
        <DisabledSquareTile>
          <PlayedSquare>{getPlayerIcon(props.ownedBy)}</PlayedSquare>
        </DisabledSquareTile>
      )}
    </Fragment>
  );
};

export default Square;
