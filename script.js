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

  function checkWinner() {
    const board = gameBoard.getBoard();
    const marker = currentPlayer.marker;
    if (
      marker === board[0][0] &&
      marker === board[0][1] &&
      marker === board[0][2]
    ) {
      console.log(`${currentPlayer.name} wins by top row!`);
    }
    if (
      marker === board[1][0] &&
      marker === board[1][1] &&
      marker === board[1][2]
    ) {
      console.log(`${currentPlayer.name} wins by middle row!`);
    }
    if (
      marker === board[2][0] &&
      marker === board[2][1] &&
      marker === board[2][2]
    ) {
      console.log(`${currentPlayer.name} wins by bottom row!`);
    }
    if (
      marker === board[0][0] &&
      marker === board[1][0] &&
      marker === board[2][0]
    ) {
      console.log(`${currentPlayer.name} wins by left column!`);
    }
    if (
      marker === board[0][1] &&
      marker === board[1][1] &&
      marker === board[2][1]
    ) {
      console.log(`${currentPlayer.name} wins by middle column!`);
    }
    if (
      marker === board[0][2] &&
      marker === board[1][2] &&
      marker === board[2][2]
    ) {
      console.log(`${currentPlayer.name} wins by right column!`);
    }
    if (
      marker === board[0][0] &&
      marker === board[1][1] &&
      marker === board[2][2]
    ) {
      console.log(`${currentPlayer.name} wins by diagonal!`);
    }
    if (
      marker === board[0][2] &&
      marker === board[1][1] &&
      marker === board[2][0]
    ) {
      console.log(`${currentPlayer.name} wins by diagonal!`);
    }
  }

  return {
    switchTurn,
    playRound,
    checkWinner,
  };
})();

console.log(gameBoard.getBoard());
