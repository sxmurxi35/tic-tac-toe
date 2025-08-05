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

    const fieldCheck = (index) => {
      if (board.getField(index) === "") {
        return true;
      } else return false;
    };

    const makeMove = (index) => {
      const activeSign = () => activePlayer().getSign();

      if (fieldCheck(index) === false) {
        return console.log("Please pick another field");
      }

      board.setField(index, activeSign());
      console.log(board.getField(index));
      increaseTurn();
    };

    return {
      makeMove,
    };
  };

  return {
    gameBoard,
    gameController,
  };
})();

const gameControllerTest = game.gameController();

gameControllerTest.makeMove(0);
gameControllerTest.makeMove(1);
