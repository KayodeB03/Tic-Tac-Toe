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

  function resetBoard() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        board[i][j] = null;
      }
    }
  }

  return {
    // expose things you want the rest of the program to use
    getBoard,
    placeMarker,
    isSpaceAvailible,
    resetBoard,
  };
})();

const gameController = (() => {
  function playerCreator(name, marker) {
    return {
      name,
      marker,
    };
  }

  const player1Name = prompt("Enter Player 1's name:");
  const player2Name = prompt("Enter Player 2's name:");

  const player1 = playerCreator(player1Name, "X");
  const player2 = playerCreator(player2Name, "O");

  let currentPlayer = player1;

  function switchTurn() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  let gameActive = true;

  function playRound(row, column) {
    if (!gameActive) {
      return;
    }

    if (gameBoard.isSpaceAvailible(row, column)) {
      gameBoard.placeMarker(row, column, currentPlayer.marker);

      const result = gameOver();

      if (result !== false) {
        gameActive = false;
        domManager.domUpdater();
        domManager.displayResult(result);
        return;
      }

      switchTurn();
      domManager.domUpdater();
      domManager.turnUpdater();
    } else {
      console.log("Space is not available, try again.");
    }
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

      if (
        board[a[0]][a[1]] === marker &&
        board[b[0]][b[1]] === marker &&
        board[c[0]][c[1]] === marker
      ) {
        return currentPlayer;
      }
    }

    return null;
  }

  function gameOver() {
    const winner = checkWinner();

    if (winner) {
      return winner;
    }

    const board = gameBoard.getBoard();

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (gameBoard.isSpaceAvailible(i, j)) {
          return false;
        }
      }
    }

    return "tie";
  }

  function resetGame() {
    gameBoard.resetBoard();
    currentPlayer = player1;
    gameActive = true;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  return {
    playRound,
    checkWinner,
    switchTurn,
    resetGame,
    gameOver,
    getCurrentPlayer,
  };
})();

const domManager = (() => {
  const gameBoardElement = document.getElementById("gameBoard");
  const turnDisplayElement = document.getElementById("turnDisplay");

  function turnUpdater() {
    const currentPlayer = gameController.getCurrentPlayer();
    turnDisplayElement.textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
  }

  //create gameboard DOM
  function createGameboardDOM() {
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.column = j;
        cell.addEventListener("click", () => {
          gameController.playRound(i, j);
        });
        gameBoardElement.appendChild(cell);
      }
    }
  }

  function domUpdater() {
    const board = gameBoard.getBoard();

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = document.querySelector(
          `[data-row="${i}"][data-column="${j}"]`,
        );

        cell.textContent = board[i][j];
      }
    }
  }

  function displayResult(result) {
    if (result === "tie") {
      turnDisplayElement.textContent = "It's a tie!";
    } else {
      turnDisplayElement.textContent = `${result.name} wins!`;
    }
  }

  return {
    createGameboardDOM,
    domUpdater,
    turnUpdater,
    displayResult,
  };
})();

const buttonManager = (() => {
  const themeButton = document.getElementById("themeButton");
  const restartButton = document.getElementById("restartButton");

  function toggleTheme() {
    const isLight = document.body.classList.toggle("light");
    themeButton.textContent = isLight ? "Dark Mode" : "Light Mode";
  }
  themeButton.addEventListener("click", toggleTheme);

  restartButton.addEventListener("click", () => {
    gameController.resetGame();
    domManager.domUpdater();
  });

  return {
    toggleTheme,
  };
})();

domManager.createGameboardDOM();
console.log(gameBoard.getBoard());
