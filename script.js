// script.js

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetBtn');
const message = document.getElementById('message');

let board = ['', '', '', '', '', '', '', '', '']; // Représente l'état du plateau
let currentPlayer = 'X'; // Le joueur qui commence
let gameOver = false;

// Fonction pour vérifier les conditions de victoire
const checkWinner = () => {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return board.includes('') ? null : 'tie'; 
};

const updateBoard = () => {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
};

const handleClick = (e) => {
    const index = e.target.id;
    
    // Si la case est déjà remplie ou si le jeu est terminé, on ne fait rien
    if (board[index] !== '' || gameOver) return;

    board[index] = currentPlayer;
    updateBoard();

    const winner = checkWinner();
    if (winner) {
        if (winner === 'tie') {
            message.textContent = 'Match nul!';
        } else {
            message.textContent = `${winner} a gagné!`;
        }
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Changer de joueur
        message.textContent = `C'est au tour de ${currentPlayer}`;
    }
};

// Fonction pour réinitialiser le jeu
const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    message.textContent = `C'est au tour de ${currentPlayer}`;
    updateBoard();
};

// Attacher les événements aux cases
cells.forEach(cell => cell.addEventListener('click', handleClick));

// Réinitialiser le jeu lorsque le bouton est cliqué
resetButton.addEventListener('click', resetGame);

// Initialiser le message
message.textContent = `C'est au tour de ${currentPlayer}`;
