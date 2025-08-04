function Player(sign) {
  this.sign = sign;

  const getSign = () => sign;

  return {
    getSign,
  };
}

const game = () => {
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
};
