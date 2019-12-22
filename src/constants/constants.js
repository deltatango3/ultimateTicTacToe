const topRow = [0, 1, 2];
const middleRow = [3, 4, 5];
const bottomRow = [6, 7, 8];
const leftColumn = [0, 3, 6];
const middleColumn = [1, 4, 7];
const rightColumn = [2, 5, 8];
const leftToRightDiagonal = [0, 4, 8];
const rightToLeftDiagonal = [2, 4, 6];

const constants = {
  STARTING_GAME_BOARD: [
    {
      squareIndex: 0,
      ownedBy: ''
    },
    {
      squareIndex: 1,
      ownedBy: ''
    },
    {
      squareIndex: 2,
      ownedBy: ''
    },
    {
      squareIndex: 3,
      ownedBy: ''
    },
    {
      squareIndex: 4,
      ownedBy: ''
    },
    {
      squareIndex: 5,
      ownedBy: ''
    },
    {
      squareIndex: 6,
      ownedBy: ''
    },
    {
      squareIndex: 7,
      ownedBy: ''
    },
    {
      squareIndex: 8,
      ownedBy: ''
    }
  ],
  PLAYER_ONE: 'playerOne',
  PLAYER_TWO: 'playerTwo',
  winningMatches: [
    topRow,
    middleRow,
    bottomRow,
    leftColumn,
    middleColumn,
    rightColumn,
    leftToRightDiagonal,
    rightToLeftDiagonal
  ]
};

export default constants;
