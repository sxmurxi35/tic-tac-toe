function Player(sign) {
  this.sign = sign;

  const getSign = () => sign;

  return {
    getSign,
  };
}

const game = (() => {
  const gameBoard = () => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getField = (index) => {
      return board[index];
    };

    const setField = (index, sign) => {
      board[index] = sign;
    };

    const resetBoard = () => {
      for (let i = 0; i < board.length; i++) {
        board[i] = "";
      }
    };

    return {
      board,
      getField,
      setField,
      resetBoard,
    };
  };

  const gameController = () => {
    const playerX = Player("x");
    const playerO = Player("o");
    let turn = 0;

    const board = gameBoard();

    const activePlayer = () => {
      if (turn % 2 == 0) {
        return playerX;
      } else return playerO;
    };

    const increaseTurn = () => turn++;

    const activeSign = () => activePlayer().getSign();

    const fieldCheck = (index) => {
      if (board.getField(index) === "") {
        return true;
      } else return false;
    };

    let winner = "";

    const checkWinner = (index) => {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      // winConditions[1][0]; <-------------- 3

      const conditionsCheck = winConditions
        .filter((pattern) => pattern.includes(index))
        .some((possiblePattern) =>
          possiblePattern.every(
            (value) => board.getField(value) == activeSign()
          )
        );

      const winnerMsg = () => {
        const winnerMsgSelector = document.querySelector(".game-result");
        winnerMsgSelector.textContent = `${winner} won the game!`;
        winnerMsgSelector.style.opacity = 100;
      };

      if (conditionsCheck == true) {
        const player = activeSign();

        switch (player) {
          case "x":
            winner = "Player X";
            turn = 99;
            winnerMsg();
            break;

          case "o":
            winner = "Player O";
            turn = 99;
            winnerMsg();
            break;
        }
      }

      console.log(winner);
    };

    const makeMove = (index) => {
      if (turn > 10 && winner == "")
        console.error("Error occured. Please refresh the page.");

      if (winner !== "") return console.log(`Please reset the game!`);
      if (fieldCheck(index) === false) {
        return console.log("Please pick another field");
      }

      board.setField(index, activeSign());
      console.log(turn);
      checkWinner(index);
      if (winner) {
        console.log(`${winner} won the game!`);
      }
      increaseTurn();
      console.log(index, board.getField(index));
      console.log(winner);
    };

    const resetGame = () => {
      board.resetBoard();
      turn = 0;
      winner = "";
    };

    const gameWon = () => (winner !== "" ? true : false);

    return {
      board,
      makeMove,
      resetGame,
      activeSign,
      gameWon,
    };
  };

  return {
    gameBoard,
    gameController,
  };
})();

const displayController = (() => {
  const controller = game.gameController();
  const pageGameboard = document.querySelector(".gameboard");
  const resetButton = document.querySelector(".reset-button");

  pageGameboard.addEventListener("click", (e) => {
    console.log(e.target.id);
    let targetField = Number(e.target.id);
    if (targetField == null) return;

    if (!controller.gameWon())
      document.getElementById(e.target.id).classList.add("clicked");

    controller.makeMove(targetField);
  });

  pageGameboard.addEventListener("mouseover", (e) => {
    if (e.target.id == null || e.target.id == "") return;

    const field = document.getElementById(e.target.id);
    if (!controller.gameWon() && e.target.textContent == "")
      field.textContent = controller.activeSign();
  });

  pageGameboard.addEventListener("mouseout", (e) => {
    if (e.target.id == null || e.target.id == "") return;

    const field = document.getElementById(e.target.id);
    const boardField = controller.board.getField(Number(e.target.id));
    if (!controller.gameWon()) field.textContent = boardField;
  });

  resetButton.addEventListener("click", () => {
    controller.resetGame();
    const gameResult = document.querySelector(".game-result");
    gameResult.textContent = "Noone won yet";
    gameResult.style.opacity = 0;

    for (let i = 0; i < 9; i++) {
      document.getElementById(i).textContent = "";
      document.getElementById(i).classList.remove("clicked");
    }
  });
})();
