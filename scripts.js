const createPlayer = function (name, marker) {
  return {
    name,
    marker,
  };
};

let gameBoard = (function () {
    let board = [];

    const initBoard = () => {
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


const gameController = (function () {
    let player1;
    let player2;
    let currentPlayer;
    let gameOver = false;

    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    const setPlayer = (name1, name2) => {
        player1 = createPlayer(name1, "X");
        player2 = createPlayer(name2, "O")
        currentPlayer = player1;
    };
    
    const playTurn = (position) => {
        if(gameOver) return;
        if(player1 != undefined && player2 != undefined) {
            const board = gameBoard.getBoard();
            if(board[position] === "") {
                gameBoard.setMark(position, currentPlayer.marker)
                console.log(board);
                checkForWin(currentPlayer.marker)
                if(!gameOver) switchPlayer();
            };
        };
    };

    const switchPlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
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

    const resetState = () => {
        gameBoard.reset();
        player1 = undefined;
        player2 = undefined;
        currentPlayer = player1;
        gameOver = false;
    };

    return {
        resetState,
        playTurn,
        setPlayer
    };
})();


const display = (function() {
    const body = document.querySelector("body");
    body.style.display = "flex";
    body.style.justifyContent = "center";
    body.style.alignItems = "center";
    body.style.flexDirection = "column";
    body.style.gap = "1rem";
    body.style.height = "100vh";
    let header;
    let gameUi;
    
    const render = () => {
        function createGameHeader() {
            header = document.createElement("div");
            header.className = "header";
            header.style.border = "solid black 1px";
            header.style.width = "100vw"
            header.style.height = "5rem";
            header.style.display = "flex"
            header.style.alignItems = "center";
            header.style.justifyContent = "center";
            header.style.gap = "0px 40vw"
            body.appendChild(header);

            const nameInput = document.createElement("input");
            let currentPlayerSetup = 1;
            let placeholderName1 = "";
            let placeholderName2 = "";
            const displayName1 = document.createElement("p");
            const displayName2 = document.createElement("p");

            header.appendChild(nameInput);
            nameInput.addEventListener("keydown", (e) => {
                if(e.key == "Enter") {
                    if(currentPlayerSetup == 1) {
                        placeholderName1 = nameInput.value;
                        displayName1.textContent = nameInput.value;
                        nameInput.value = "";
                        currentPlayerSetup++;
                        
                    } else if(currentPlayerSetup == 2) {
                        placeholderName2 = nameInput.value;
                        displayName2.textContent = nameInput.value;
                        header.appendChild(displayName1);
                        header.appendChild(displayName2);
                        header.removeChild(nameInput);
                        gameController.setPlayer(placeholderName1, placeholderName2);
                    };
                };
            });
        };

        function createGameUi() {
            gameUi = document.createElement("div");
            gameUi.className = "gameUI";
            gameUi.style.display = "flex";
            gameUi.style.justifyContent = "center";
            gameUi.style.alignItems = "center";
            body.appendChild(gameUi);
        };

        function createSquare(row, columnNumber, rowNumber) {
            const rowLenght = 3;
            const clickedSquare = columnNumber * rowLenght + rowNumber;

            const square = document.createElement("div");

            const cross = document.createElement("img");
            cross.src = "./imgs/cross.svg";
            cross.style.height = "10rem";
            cross.style.width = "10rem";
            const circle = document.createElement("img");
            circle.src = "./imgs/circle.svg";
            circle.style.height = "10rem";
            circle.style.width = "10rem";
            
            square.addEventListener('click', () => {
                const board = gameBoard.getBoard();
                gameController.playTurn(clickedSquare);
                if(board[clickedSquare] == "X") {
                    square.appendChild(cross);
                    console.log(board[clickedSquare]);
                } else if (board[clickedSquare] == "O") {
                    square.appendChild(circle);
                    console.log(board[clickedSquare])
                } else {
                    square.style.border = "solid black 1px";
                };
            });

            square.className = `square${clickedSquare}`;
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
                gameController.resetState();
                body.removeChild(header);
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

display.render();