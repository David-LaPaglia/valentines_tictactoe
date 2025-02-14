// Constants
const PLAYER = {
    HUMAN: '❤️',
    COMPUTER: '💘',
    EMPTY: null
  };
  
  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  
  const VALENTINE_MESSAGES = [
    "You make my heart skip a beat! 💓",
    "Be mine! 💝",
    "Love is in the air! 💕",
    "XOXO 💖",
    "Sweet victory! 🌹"
  ];
  
  class ValentinesTicTacToe {
    constructor() {
      this.board = Array(9).fill(PLAYER.EMPTY);
      this.isGameActive = true;
      this.currentPlayer = PLAYER.HUMAN;
      this.moveCount = 0;
      
      this.initializeUI();
      this.createGameBoard();
      this.updateStatusMessage('Your turn, sweetheart! 💝');
    }
  
    initializeUI() {
      // Create and style game container
      this.container = document.createElement('div');
      this.container.style.maxWidth = '800px';
      this.container.style.margin = '0 auto';
      this.container.style.fontFamily = 'Arial, sans-serif';
      this.container.style.backgroundColor = '#fff0f3';
      this.container.style.padding = '20px';
      this.container.style.borderRadius = '15px';
      this.container.style.boxShadow = '0 0 20px rgba(255, 182, 193, 0.5)';
  
      // Create title
      const title = document.createElement('h1');
      title.textContent = "Valentine's Tic-Tac-Toe 💝";
      title.style.textAlign = 'center';
      title.style.color = '#ff4d6d';
      title.style.fontSize = '3rem';
      title.style.marginBottom = '20px';
  
      // Create status message
      this.statusMessage = document.createElement('p');
      this.statusMessage.style.fontSize = '2rem';
      this.statusMessage.style.textAlign = 'center';
      this.statusMessage.style.fontWeight = 'bold';
      this.statusMessage.style.margin = '20px 0';
      this.statusMessage.style.color = '#ff758f';
  
      // Create game board container
      this.gameBoard = document.createElement('div');
      this.gameBoard.style.display = 'grid';
      this.gameBoard.style.gridTemplateColumns = 'repeat(3, 1fr)';
      this.gameBoard.style.gap = '10px';
      this.gameBoard.style.backgroundColor = '#ffb3c1';
      this.gameBoard.style.padding = '10px';
      this.gameBoard.style.borderRadius = '10px';
  
      // Create reset button
      this.resetButton = document.createElement('button');
      this.resetButton.textContent = 'New Love Game 💕';
      this.resetButton.style.display = 'block';
      this.resetButton.style.margin = '20px auto';
      this.resetButton.style.padding = '15px 30px';
      this.resetButton.style.fontSize = '1.2rem';
      this.resetButton.style.backgroundColor = '#ff4d6d';
      this.resetButton.style.color = 'white';
      this.resetButton.style.border = 'none';
      this.resetButton.style.borderRadius = '25px';
      this.resetButton.style.cursor = 'pointer';
      this.resetButton.style.transition = 'transform 0.2s, background-color 0.2s';
      
      this.resetButton.addEventListener('mouseover', () => {
        this.resetButton.style.backgroundColor = '#ff758f';
        this.resetButton.style.transform = 'scale(1.05)';
      });
      
      this.resetButton.addEventListener('mouseout', () => {
        this.resetButton.style.backgroundColor = '#ff4d6d';
        this.resetButton.style.transform = 'scale(1)';
      });
      
      this.resetButton.addEventListener('click', () => this.resetGame());
  
      // Append elements to container
      this.container.appendChild(title);
      this.container.appendChild(this.statusMessage);
      this.container.appendChild(this.gameBoard);
      this.container.appendChild(this.resetButton);
      document.body.appendChild(this.container);
  
      // Set page background
      document.body.style.backgroundColor = '#ffe5e5';
      document.body.style.margin = '0';
      document.body.style.padding = '20px';
    }
  
    createGameBoard() {
      this.cells = Array(9).fill(null).map((_, index) => {
        const cell = document.createElement('div');
        cell.style.backgroundColor = 'white';
        cell.style.aspectRatio = '1';
        cell.style.display = 'flex';
        cell.style.justifyContent = 'center';
        cell.style.alignItems = 'center';
        cell.style.fontSize = '3rem';
        cell.style.cursor = 'pointer';
        cell.style.borderRadius = '10px';
        cell.style.transition = 'all 0.3s';
        cell.style.border = '2px solid #ff758f';
  
        cell.addEventListener('click', () => this.handleCellClick(index));
        cell.addEventListener('mouseover', () => {
          if (this.isValidMove(index)) {
            cell.style.backgroundColor = '#fff0f3';
            cell.style.transform = 'scale(1.05)';
          }
        });
        cell.addEventListener('mouseout', () => {
          cell.style.backgroundColor = 'white';
          cell.style.transform = 'scale(1)';
        });
  
        this.gameBoard.appendChild(cell);
        return cell;
      });
    }
  
    handleCellClick(index) {
      if (!this.isValidMove(index) || !this.isGameActive) return;
  
      this.makeMove(index, PLAYER.HUMAN);
      
      if (this.checkWinner()) {
        this.endGame(`${this.getRandomMessage()} You win! 💝`);
        this.endGame('Will you be my valentine!? 💝');
        return;
      }
  
      if (this.isBoardFull()) {
        this.endGame("It's a tie! Share the love! 💕");
        return;
      }
  
      this.updateStatusMessage("Cupid is thinking... 💘");
      setTimeout(() => this.computerMove(), 800);
    }
  
    computerMove() {
      if (!this.isGameActive) return;
  
      const bestMove = this.findBestMove();
      this.makeMove(bestMove, PLAYER.COMPUTER);
  
      if (this.checkWinner()) {
        this.endGame('Cupid wins! Better luck next time! 💘');
        return;
      }
  
      if (this.isBoardFull()) {
        this.endGame("It's a tie! Share the love! 💕");
        return;
      }
  
      this.updateStatusMessage('Your turn, sweetheart! 💝');
    }
  
    getRandomMessage() {
      return VALENTINE_MESSAGES[Math.floor(Math.random() * VALENTINE_MESSAGES.length)];
    }
  
    findBestMove() {
      // Same AI logic as before
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
  
      if (this.isValidMove(4)) return 4;
  
      const corners = [0, 2, 6, 8];
      const availableCorners = corners.filter(corner => this.isValidMove(corner));
      if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
      }
  
      const availableMoves = this.board.map((cell, index) => cell === PLAYER.EMPTY ? index : null).filter(cell => cell !== null);
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
  
    makeMove(index, player) {
      this.board[index] = player;
      this.cells[index].textContent = player;
      this.cells[index].style.transform = 'scale(1.1)';
      setTimeout(() => {
        this.cells[index].style.transform = 'scale(1)';
      }, 200);
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
      
      // Add floating hearts animation
      this.addFloatingHearts();
    }
  
    addFloatingHearts() {
      for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💝';
        heart.style.position = 'fixed';
        heart.style.fontSize = '24px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animation = `float ${Math.random() * 3 + 2}s linear infinite`;
        heart.style.opacity = '0';
        
        const keyframes = `
          @keyframes float {
            0% {
              transform: translateY(100vh);
              opacity: 1;
            }
            100% {
              transform: translateY(-20vh);
              opacity: 0;
            }
          }
        `;
        
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        document.body.appendChild(heart);
        
        setTimeout(() => {
          heart.remove();
          style.remove();
        }, 5000);
      }
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
      this.updateStatusMessage('Your turn, sweetheart! 💝');
    }
  }
  
  // Initialize the game
  new ValentinesTicTacToe();