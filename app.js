let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function makeMove(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].textContent = currentPlayer;
        checkWinner();
        if (gameActive) {  // Only switch players if the game is still active
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            document.getElementById('status').textContent = `Player ${gameBoard[a]} wins!`;
            drawWinningLine(i); // Call the function to draw the line
            gameActive = false;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        document.getElementById('status').textContent = 'It\'s a draw!';
        gameActive = false;
    }
}

function drawWinningLine(winningIndex) {
    const line = document.getElementById('line');
    const gameBoard = document.getElementById('gameBoard');
    
    const positions = [
        { top: '15%', left: '0', width: '100%', transform: 'none' }, // top row
        { top: '50%', left: '0', width: '100%', transform: 'none' }, // middle row
        { top: '85%', left: '0', width: '100%', transform: 'none' }, // bottom row
        { top: '0', left: '15%', width: '100%', transform: 'rotate(90deg)' }, // left column
        { top: '0', left: '50%', width: '100%', transform: 'rotate(90deg)' }, // middle column
        { top: '0', left: '85%', width: '100%', transform: 'rotate(90deg)' }, // right column
        { top: '0', left: '0', width: '100%', transform: 'rotate(45deg)' }, // diagonal top-left to bottom-right
        { top: '0', left: '0', width: '100%', transform: 'rotate(-45deg)' }  // diagonal bottom-left to top-right
    ];

    const position = positions[winningIndex];
    line.style.top = position.top;
    line.style.left = position.left;
    line.style.width = position.width;
    line.style.transform = position.transform;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('status').textContent = 'Player X\'s turn';
    document.getElementById('line').style.width = '0'; // Hide the winning line
}
