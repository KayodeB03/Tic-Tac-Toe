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
      console.log(gameBoard.getBoard());
    } else {
      console.log("Space is not availible, Try again.");
    }
    checkWinner();
    switchTurn();
  }

  const winConditions = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  function checkWinner() {
    const board = gameBoard.getBoard();
    const marker = currentPlayer.marker;
    for (const combination of winConditions) {
      const [a, b, c] = combination;

      // check a, b, and c
      if (
        board[a[0]][a[1]] === marker &&
        board[b[0]][b[1]] === marker &&
        board[c[0]][c[1]] === marker
      ) {
        console.log(`${currentPlayer.name} wins!`);
        return;
      }
    }
  }

  return {
    playRound,
    checkWinner,
    switchTurn,
  };
})();

console.log(gameBoard.getBoard());
