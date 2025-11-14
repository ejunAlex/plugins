document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 15;
    const board = [];
    let currentPlayer = 'black';
    let gameOver = false;
    let gameBoardElement = document.getElementById('game-board');
    let currentPlayerElement = document.getElementById('current-player');
    let gameStatusElement = document.getElementById('game-status');
    let restartBtn = document.getElementById('restart-btn');

    // 初始化棋盘
    function initBoard() {
        gameBoardElement.innerHTML = '';
        gameBoardElement.style.width = (boardSize * 30) + 'px';
        gameBoardElement.style.height = (boardSize * 30) + 'px';

        for (let i = 0; i < boardSize; i++) {
            board[i] = [];
            for (let j = 0; j < boardSize; j++) {
                board[i][j] = null;
                
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.left = (j * 30) + 'px';
                cell.style.top = (i * 30) + 'px';
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                cell.addEventListener('click', () => handleCellClick(i, j));
                gameBoardElement.appendChild(cell);
            }
        }
    }

    // 处理点击事件
    function handleCellClick(row, col) {
        if (gameOver || board[row][col] !== null) {
            return;
        }

        // 放置棋子
        board[row][col] = currentPlayer;
        const piece = document.createElement('div');
        piece.className = `piece ${currentPlayer}`;
        piece.style.left = (col * 30 + 1) + 'px';
        piece.style.top = (row * 30 + 1) + 'px';
        piece.dataset.row = row;
        piece.dataset.col = col;
        gameBoardElement.appendChild(piece);

        // 检查胜负
        if (checkWin(row, col)) {
            gameStatusElement.textContent = `${currentPlayer === 'black' ? '黑棋' : '白棋'} 获胜！`;
            gameOver = true;
            return;
        }

        // 切换玩家
        currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
        currentPlayerElement.textContent = currentPlayer === 'black' ? '黑棋' : '白棋';
        gameStatusElement.textContent = '';
    }

    // 检查胜负
    function checkWin(row, col) {
        const directions = [
            [0, 1],   // 水平
            [1, 0],   // 垂直
            [1, 1],   // 对角线
            [1, -1]   // 反对角线
        ];

        for (let [dx, dy] of directions) {
            let count = 1; // 当前棋子
            
            // 正向计数
            for (let i = 1; i < 5; i++) {
                const newRow = row + i * dx;
                const newCol = col + i * dy;
                if (newRow >= 0 && newRow < boardSize && 
                    newCol >= 0 && newCol < boardSize && 
                    board[newRow][newCol] === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            }
            
            // 反向计数
            for (let i = 1; i < 5; i++) {
                const newRow = row - i * dx;
                const newCol = col - i * dy;
                if (newRow >= 0 && newRow < boardSize && 
                    newCol >= 0 && newCol < boardSize && 
                    board[newRow][newCol] === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            }
            
            if (count >= 5) {
                return true;
            }
        }
        
        return false;
    }

    // 重新开始游戏
    function restartGame() {
        currentPlayer = 'black';
        gameOver = false;
        currentPlayerElement.textContent = '黑棋';
        gameStatusElement.textContent = '';
        initBoard();
    }

    // 事件监听器
    restartBtn.addEventListener('click', restartGame);

    // 初始化游戏
    initBoard();
});