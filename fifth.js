// Nine divs in a grid
// Each div has an id of the form "cellXY" where X is the row and Y is the column
// The divs are numbered from 0 to 8
// logic for understanding the game
// some css styling to make a cute game


// 9 Divs
const body = document.querySelector("body");

const board = document.createElement("div");
board.style.display = "grid";
board.style.gridTemplateColumns = "repeat(3, 1fr)";
board.style.backgroundColor = "gray";
board.style.gap = "5px";
board.style.width = "800px";
board.style.textAlign = "center";

const message = document.createElement("p");
message.style.fontSize = "5rem";
message.style.fontWeight = "bold";
message.style.textAlign = "center";


let winner = undefined;
let isPlayerTurn = false;

// One idea to run it:
// while (winner === undefined) {
//     ...game logic...
// }


const gameState = [
    0,1,2,
    3,4,5,
    6,7,8
];



const winningConditions = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8],// rows
    [0,3,6],
    [1,4,6],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
];

const squares = []

// Return the piece either X or O that won the game
const checkWinner = () => {
    for (const condition of winningConditions) {
        const square0 = gameState[condition[0]];
        const square1 = gameState[condition[1]];
        const square2 = gameState[condition[2]];
        if (square0 === square1 && square1 === square2) {
            return square0;
        }
    }
}

const takeComputerTurn = () => {
    const availableSpaces = gameState.filter(
        space => typeof space !== "string"
    );
    const randomIndex = Math.floor(Math.random() * availableSpaces.length);
    const randomSpace = availableSpaces[randomIndex];
    gameState[randomSpace] = "O";
    squares[randomSpace].textContent = "O";
    isPlayerTurn = true;
    winner = checkWinner();
            if (winner === "X") {
                message.textContent = "Player wins!";
                body.appendChild(message);
                return;
            } else if (winner === "O") {
                message.textContent = "Computer wins!";
    
                body.appendChild(message);
                return;
            }
}


for (let i =0; i<9; i+=1) {
    const square = document.createElement("div");
    square.style.backgroundColor = "white";
    square.style.border = "1px solid black";
    square.style.minHeight = "100px";
    square.style.width = "100%";

    square.style.display = "flex";
    square.style.justifyContent = "center";
    square.style.aspectRatio = "1/1";
    square.style.fontSize = "10rem";
    square.style.fontWeight = "bold";
    square.style.cursor = "pointer";
    square.style.textAlign = "center";
    square.style.alignItems = "center";
    square.addEventListener("click", () => {
        if (isPlayerTurn) {
            square.textContent = "X";
            gameState[i] = "X";
            winner = checkWinner();
            if (winner === "X") {
                message.textContent = "Player wins!";
                body.appendChild(message);
                return;
            } else if (winner === "O") {
                message.textContent = "Computer wins!";
                body.appendChild(message);
                return;
            }
            console.log(gameState);
            isPlayerTurn = false;
            setTimeout(() => {
                takeComputerTurn();
            }, 1000);
        }
    });
    squares.push(square);
    board.appendChild(square);
}

body.appendChild(board);
body.appendChild(message);

takeComputerTurn();

