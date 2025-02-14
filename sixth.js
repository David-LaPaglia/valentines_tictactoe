// Constants
const PLAYER = {
    HUMAN: 'X',
    COMPUTER: 'O',
    EMPTY: null
  };
  
  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  
  class TicTacToe {
    constructor() {
      this.board = Array(9).fill(PLAYER.EMPTY);
      this.isGameActive = true;
      this.currentPlayer = PLAYER.HUMAN;
      this.moveCount = 0;
      
      this.initializeUI();
      this.createGameBoard();
      this.updateStatusMessage('Your turn!');
    }
  
    initializeUI() {
      // Create and style game container
      this.container = document.createElement('div');
      this.container.style.maxWidth = '800px';
      this.container.style.margin = '0 auto';
      this.container.style.fontFamily = 'Arial, sans-serif';
  
      // Create status message
      this.statusMessage = document.createElement('p');
      this.statusMessage.style.fontSize = '2rem';
      this.statusMessage.style.textAlign = 'center';
      this.statusMessage.style.fontWeight = 'bold';
      this.statusMessage.style.margin = '20px 0';
  
      // Create game board container
      this.gameBoard = document.createElement('div');
      this.gameBoard.style.display = 'grid';
      this.gameBoard.style.gridTemplateColumns = 'repeat(3, 1fr)';
      this.gameBoard.style.gap = '10px';
      this.gameBoard.style.backgroundColor = '#2c3e50';
      this.gameBoard.style.padding = '10px';
      this.gameBoard.style.borderRadius = '10px';
  
      // Create reset button
      this.resetButton = document.createElement('button');
      this.resetButton.textContent = 'New Game';
      this.resetButton.style.display = 'block';
      this.resetButton.style.margin = '20px auto';
      this.resetButton.style.padding = '10px 20px';
      this.resetButton.style.fontSize = '1.2rem';
      this.resetButton.style.backgroundColor = '#3498db';
      this.resetButton.style.color = 'white';
      this.resetButton.style.border = 'none';
      this.resetButton.style.borderRadius = '5px';
      this.resetButton.style.cursor = 'pointer';
      this.resetButton.addEventListener('click', () => this.resetGame());
  
      // Append elements to container
      this.container.appendChild(this.statusMessage);
      this.container.appendChild(this.gameBoard);
      this.container.appendChild(this.resetButton);
      document.body.appendChild(this.container);
    }
  
    createGameBoard() {
      this.cells = Array(9).fill(null).map((_, index) => {
        const cell = document.createElement('div');
        cell.style.backgroundColor = 'white';
        cell.style.aspectRatio = '1';
        cell.style.display = 'flex';
        cell.style.justifyContent = 'center';
        cell.style.alignItems = 'center';
        cell.style.fontSize = '4rem';
        cell.style.fontWeight = 'bold';
        cell.style.cursor = 'pointer';
        cell.style.borderRadius = '5px';
        cell.style.transition = 'background-color 0.3s';
  
        cell.addEventListener('click', () => this.handleCellClick(index));
        cell.addEventListener('mouseover', () => {
          if (this.isValidMove(index)) {
            cell.style.backgroundColor = '#ecf0f1';
          }
        });
        cell.addEventListener('mouseout', () => {
          cell.style.backgroundColor = 'white';
        });
  
        this.gameBoard.appendChild(cell);
        return cell;
      });
    }
  
    handleCellClick(index) {
      if (!this.isValidMove(index) || !this.isGameActive) return;
  
      this.makeMove(index, PLAYER.HUMAN);
      
      if (this.checkWinner()) {
        this.endGame(`You win! 🎉`);
        return;
      }
  
      if (this.isBoardFull()) {
        this.endGame("It's a draw! 🤝");
        return;
      }
  
      this.updateStatusMessage("Computer's turn...");
      setTimeout(() => this.computerMove(), 800);
    }
  
    computerMove() {
      if (!this.isGameActive) return;
  
      const bestMove = this.findBestMove();
      this.makeMove(bestMove, PLAYER.COMPUTER);
  
      if (this.checkWinner()) {
        this.endGame('Computer wins! 🤖');
        return;
      }
  
      if (this.isBoardFull()) {
        this.endGame("It's a draw! 🤝");
        return;
      }
  
      this.updateStatusMessage('Your turn!');
    }
  
    findBestMove() {
      // Simple AI: Block player's winning move or take winning move if available
      // Check for winning move
      for (let i = 0; i < 9; i++) {
        if (this.isValidMove(i)) {
          this.board[i] = PLAYER.COMPUTER;
          if (this.checkWinner()) {
            this.board[i] = PLAYER.EMPTY;
            return i;
          }
          this.board[i] = PLAYER.EMPTY;
        }
      }
  
      // Check for blocking move
      for (let i = 0; i < 9; i++) {
        if (this.isValidMove(i)) {
          this.board[i] = PLAYER.HUMAN;
          if (this.checkWinner()) {
            this.board[i] = PLAYER.EMPTY;
            return i;
          }
          this.board[i] = PLAYER.EMPTY;
        }
      }
  
      // Take center if available
      if (this.isValidMove(4)) return 4;
  
      // Take corners if available
      const corners = [0, 2, 6, 8];
      const availableCorners = corners.filter(corner => this.isValidMove(corner));
      if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
      }
  
      // Take any available space
      const availableMoves = this.board.map((cell, index) => cell === PLAYER.EMPTY ? index : null).filter(cell => cell !== null);
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
  
    makeMove(index, player) {
      this.board[index] = player;
      this.cells[index].textContent = player;
      this.cells[index].style.color = player === PLAYER.HUMAN ? '#e74c3c' : '#2980b9';
      this.moveCount++;
    }
  
    checkWinner() {
      return WINNING_COMBINATIONS.some(combination => {
        const [a, b, c] = combination;
        return this.board[a] &&
               this.board[a] === this.board[b] &&
               this.board[a] === this.board[c];
      });
    }
  
    isValidMove(index) {
      return this.board[index] === PLAYER.EMPTY;
    }
  
    isBoardFull() {
      return this.moveCount === 9;
    }
  
    updateStatusMessage(message) {
      this.statusMessage.textContent = message;
    }
  
    endGame(message) {
      this.isGameActive = false;
      this.updateStatusMessage(message);
      this.cells.forEach(cell => cell.style.cursor = 'not-allowed');
    }
  
    resetGame() {
      this.board = Array(9).fill(PLAYER.EMPTY);
      this.isGameActive = true;
      this.moveCount = 0;
      this.cells.forEach(cell => {
        cell.textContent = '';
        cell.style.cursor = 'pointer';
        cell.style.backgroundColor = 'white';
      });
      this.updateStatusMessage('Your turn!');
    }
  }
  
  // Initialize the game
  new TicTacToe();