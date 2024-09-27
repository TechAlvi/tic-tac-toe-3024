const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.querySelector('.game-status');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;
let gameActive = true;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    if (cell.textContent === '' && gameActive) {
        cell.textContent = currentClass;
        if (checkWin(currentClass)) {
            gameStatus.textContent = `${currentClass} Wins!`;
            gameActive = false;
        } else if (isDraw()) {
            gameStatus.textContent = 'Draw!';
            gameActive = false;
        } else {
            isXTurn = !isXTurn;
            gameStatus.textContent = `${isXTurn ? 'X' : 'O'}'s Turn`;
        }
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    isXTurn = true;
    gameActive = true;
    gameStatus.textContent = 'X\'s Turn';
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

gameStatus.textContent = 'X\'s Turn';
