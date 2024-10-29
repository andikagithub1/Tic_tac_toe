const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const handleCellClick = (index) => {
    if (gameState[index] !== '' || !isGameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    cells[index].classList.add(currentPlayer);
    checkResult();
};

const checkResult = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        Swal.fire({
            title: `Pemain ${currentPlayer} menang!`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
        isGameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        Swal.fire({
            title: 'Permainan berakhir seri!',
            icon: 'info',
            confirmButtonText: 'OK'
        });
        isGameActive = false;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const resetGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    message.innerText = '';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O');
    });
};

// Event Listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);