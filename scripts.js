let createPlayer = function (name, marker) {
  return {
    name,
    marker,
  };
};

let gameBoard = (function () {
    let board = [];

    let initBoard = () => {
        board = ["","","","","","","","",""];
    };

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
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    
    const playTurn = (position) => {
        if(gameOver) return;

        let board = gameBoard.getBoard();
        if(board[position] === "") {
            gameBoard.setMark(position, currentPlayer.marker)
            console.log(board)
            checkForWin(currentPlayer.marker)
        };

        if(!gameOver) switchPlayer();
    };

    const switchPlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        };
    };

    const checkForWin = (marker) => {
        const board = gameBoard.getBoard();
        for (let i = 0; i < winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];
            if (board[a] === marker && board[b] === marker && board[c] === marker) {
                gameOver = true;
                console.log(`${currentPlayer.name} won!`);
                return true;
            };
        };
        return false;
    };

    return {
        playTurn
    };
})();