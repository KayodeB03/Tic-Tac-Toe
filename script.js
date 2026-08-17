const gameBoard = (() => {
  const board = [];
  const rows = 3;
  const columns = 3;

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
      board[i].push(null);
    }
  }
  function getBoard() {
    return board;
  }

  function placeMarker(row, column, marker) {
    board[row][column] = marker;
  }

  function isSpaceAvailible(row, column) {
    return board[row][column] === null;
  }

  return {
    // expose things you want the rest of the program to use
    getBoard,
    placeMarker,
    isSpaceAvailible,
  };
})();

const gameController = (() => {
  function playerCreator(name, marker) {
    const player = function () {
      this.name = name;
      this.marker = marker;
    };
    return new player();
  }

  const player1 = playerCreator(`${"Player 1"}`, "X");
  const player2 = playerCreator(`${"Player 2"}`, "O");

  let currentPlayer = player1;

  function switchTurn() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function playRound(row, column) {
    if (gameBoard.isSpaceAvailible(row, column)) {
      gameBoard.placeMarker(row, column, currentPlayer.marker);
      switchTurn();
      console.log(gameBoard.getBoard());
    } else {
      console.log("Space is not availible, Try again.");
    }
  }

  function checkWinner() {}

  return {
    player1,
    player2,
    currentPlayer,
    switchTurn,
    playRound,
  };
})();

console.log(gameBoard.getBoard());

console.log(gameController.currentPlayer);
