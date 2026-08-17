function gameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
      board[i].push(null);
    }
  }

  return board;
}

function playerCreator(name, marker) {
  const player = function () {
    this.name = name;
    this.marker = marker;
  };
  return new player();
}

const player1 = playerCreator(`${"Player 1"}`, "X");
const player2 = playerCreator(`${"Player 2"}`, "O");

const gameController = {
  board: gameBoard(),
  player1: player1,
  player2: player2,
  currentPlayer: player1,
  gameOver: false,

  switchTurn() {
    this.currentPlayer = this.currentPlayer === player1 ? player2 : player1;
  },

  checkWinner(rows, columns) {
    if (this.board[rows][columns] === this.currentPlayer.marker) {
      return true;
    }
    return false;
  },

  playRound(row, column) {
    this.board[row][column] = this.currentPlayer.marker;
    this.switchTurn();
    console.log(this.board);
  },
};

console.log(gameBoard());
