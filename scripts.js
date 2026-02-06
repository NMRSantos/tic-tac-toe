let createPlayer = function (name, marker) {
  return {
    name,
    marker,
  };
}

let gameBoard = (function () {
    let board = [];
    let initBoard = () =>{
        board = ["","","","","","","","",""];
    }
    initBoard();
    const getBoard = () => board;
    const setMark = (position, marker) => {
        board[position] = marker;
    };
    const reset = () => initBoard();
    return {
        getBoard,
        setMark,
        reset
    }
})();


let gameController = (function () {
    let player1 = createPlayer("Bob", "X");
    let player2 = createPlayer("Adam", "O");
    let currentPlayer = player1;
    let gameOver = false;
    const winningCombos = [
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]]]
    ;
    
    const playTurn = (position) => {
        if(gameOver) return;

        gameBoard.setMark(position, currentPlayer.marker)
        console.log(gameBoard.getBoard())
        switchPlayer()
    };

    const switchPlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }
    };

    const checkForWin = (marker) => {

    }

    return {
        playTurn
    }
})();