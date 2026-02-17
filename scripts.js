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
    const body = document.querySelector("body");
    body.style.display = "flex";
    body.style.justifyContent = "center";
    body.style.alignItems = "center";
    body.style.flexDirection = "column";
    body.style.gap = "1rem";
    body.style.height = "100vh";
    let header;
    let gameUi;
    
    let render = () => {

        function createGameHeader() {
            header = document.createElement("div");
            header.style.border = "solid black 1px";
            header.style.width = "100vw"
            header.style.height = "5rem";
            body.appendChild(header);
        };

        function createGameUi() {
            gameUi = document.createElement("div");
            gameUi.style.display = "flex";
            gameUi.style.justifyContent = "center";
            gameUi.style.alignItems = "center";
            body.appendChild(gameUi);
        };

        function createSquare(row, columnNumber, rowNumber) {
            let squareClassNumber = columnNumber * 3 + rowNumber;
            const square = document.createElement("div");
            
            square.addEventListener('click', () => {
                let board = gameBoard.getBoard();
                gameController.playTurn(squareClassNumber);
                if(board[squareClassNumber] == "X") {
                    square.style.border = "solid red 1px"
                    console.log(board[squareClassNumber]);
                } else if (board[squareClassNumber] == "O") {
                    square.style.border = "solid blue 1px";
                    console.log(board[squareClassNumber])
                } else {
                    square.style.border = "solid black 1px";
                };
            });

            square.className = `square${squareClassNumber}`;
            square.style.height = "10rem";
            square.style.width = "10rem";
            square.style.border = "solid black 1px";
            row.appendChild(square);
        };

        function createRow(rowNumber) {
            const row = document.createElement("div");
            row.className = "row";
            gameUi.appendChild(row);
            for (let columnNumber = 0; columnNumber < 3; columnNumber++) {
                createSquare(row, columnNumber, rowNumber);
            };
        };

        function createGrid() {
            for (let rowNumber = 0; rowNumber < 3; rowNumber++) {
                createRow(rowNumber);
            };
        };

        function resetGame() {
            const button = document.createElement("button");
            button.textContent = "Reset";
            body.appendChild(button);
            button.style.display = "flex";
            button.style.justifyContent = "center";
            button.style.alignItems = "center";
            button.addEventListener('click', () => {
                gameBoard.reset()
                body.removeChild(gameUi);
                body.removeChild(button);
                render();
            });
        };
        
        createGameHeader()
        createGameUi()
        createGrid();
        resetGame();
    };

    return {
        render
    };
})();