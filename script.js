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

    const activePlayer = () => {
      if (turn % 2 == 0) {
        return playerX;
      } else return playerO;
    };

    const increaseTurn = () => turn++;
  };

  return {
    gameBoard,
    gameController,
  };
})();

const gameControllerTest = game.gameController();

