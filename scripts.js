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
        console.log(board)
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

let display = (function() {
    const header = document.querySelector(".header");
    const gameUi = document.querySelector(".gameUi");
    const reset = document.querySelector(".reset");


        let render = () => {
            function createSquare(row) {
                const square = document.createElement("div");
                square.className = "square";
                row.appendChild(square);
                square.style.height = "10rem";
                square.style.width = "10rem";
                square.style.border = "solid black 1px";
                square.className = "square";
            };

            function createRow() {
                const row = document.createElement("div");
                row.className = "row";
                gameUi.appendChild(row);
                for (let i = 0; i < 3; i++) {
                    createSquare(row);
                };
            };

            function createGrid() {
                for (let i = 0; i < 3; i++) {
                    createRow();
                };
            };
        createGrid()
        };

    
    return {
        render
    };
})();

let debugDisplay = (function() {
    const header = document.querySelector(".header");
    const gameUi = document.querySelector(".gameUi");
    const reset = document.querySelector(".reset");
    let squareIdNumber = 0;

    let render = () => {
        function createSquare(row) {
            const square = document.createElement("div");
            square.className = "square";
            row.appendChild(square);
            square.style.height = "10rem";
            square.style.width = "10rem";
            square.style.border = "solid black 1px";
            square.className = "square";
            square.id = `square${squareIdNumber}`;
            squareIdNumber++
        };
        function createRow() {
            const row = document.createElement("div");
            row.className = "row";
            gameUi.appendChild(row);
            for (let i = 0; i < 3; i++) {
                createSquare(row);
            };
        };
        function createGrid() {
            for (let i = 0; i < 3; i++) {
                createRow();
            };
        };
        createGrid()
        
        let board = gameBoard.getBoard();
        board.forEach((marker) => {
            if(marker === "X") {
                console.log("this spot has a X")
            } if (marker === "O") {
                console.log("this spot has a O")
            } else console.log("this spot is empty")
        });
    };
    return {
        render
    };
})();