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

    let winner = undefined;

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

      if (conditionsCheck == true) {
        const player = activePlayer().getSign();

        switch (player) {
          case "x":
            winner = "Player X";
            turn = 99;
            break;

          case "o":
            winner = "Player O";
            turn = 99;
            break;
        }
      }
    };

    const makeMove = (index) => {
      if (turn > 10 && winner == undefined)
        console.error("Error occured. Please refresh the page.");

      if (winner !== undefined) return console.log(`Please reset the game!`);
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
    };

    const resetGame = () => {
      board.resetBoard();
      turn = 0;
      winner = undefined;
    };

    return {
      board,
      makeMove,
      resetGame,
      activeSign,
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

  let targetField;

  pageGameboard.addEventListener("click", (e) => {
    targetField = Number(e.target.id);

    controller.makeMove(targetField);
  });

  pageGameboard.addEventListener("mouseover", (e) => {
    const field = document.getElementById(e.target.id);
    field.textContent = controller.activeSign();
  });

  pageGameboard.addEventListener("mouseout", (e) => {
    const field = document.getElementById(e.target.id);
    const boardField = controller.board.getField(Number(e.target.id));
    field.textContent = boardField;
  });
})();
