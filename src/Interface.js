import Game from './Game';

export default function Interface() {

    const interfaceSetUp = function() {
        const myGame = Game();
        myGame.gameSetUp();
        this.createBoard(myGame, myGame.player);
        this.createBoard(myGame, myGame.computer);
        // myGame.startGame();
        const newGameButton = document.querySelector('.new-game');
        newGameButton.addEventListener('click', () => {
            const gameOver = document.querySelector('.game-over');
            gameOver.textContent = '';
            const newGame = Game();
            newGame.gameSetUp();
            newGame.gameSetUp()
            this.createBoard(newGame, newGame.player);
            this.createBoard(newGame, newGame.computer);
        })
    }

    const createBoard = function(game, currentPlayer) {
        const BOARD_LENGTH = 10;
        let container;
        const box = [];

        if (!currentPlayer.isComputer) {
            container = document.querySelector('.board.human');
        } else {
            container = document.querySelector('.board.computer');
        }
        container.innerHTML = '';

        for (let i = 0; i < BOARD_LENGTH**2; i++) {
            box[i] = document.createElement('div');
            box[i].classList.add('board-box');
            
            if (!currentPlayer.isComputer) {
                this.updateBoard(game, box, currentPlayer.gameboard, i);
            }
            
            box[i].addEventListener('click', () => {
                if (currentPlayer.isTurn || game.winner != null) {
                    return
                }
                const x = Math.floor(i / 10);
                const y = i % 10;
                currentPlayer.opponent.attack(x, y);
                this.updateBoard(game, box, currentPlayer.gameboard, i);
                if (currentPlayer.isComputer) {
                    const playerBox = Array.from(document.querySelector('.board.human').children);
                    const computerAttack = currentPlayer.randomAttack();
                    this.updateBoard(game, playerBox, currentPlayer.opponent.gameboard, computerAttack[0] * 10 + computerAttack[1]);
                }
                if (game.isGameOver()) {
                    const gameOver = document.querySelector('.game-over');
                    if (game.winner === game.player) {
                        gameOver.textContent = `Left board wins! Press "New Game" to play again!`;
                    } else {
                        gameOver.textContent = `Right board wins! Press "New Game" to play again!`;
                    }
                }
            });
            // will need to add event listener to track attacks
            container.appendChild(box[i]);
        }
    }

    const updateBoard = function(game, box, gameboard, i) {
        const x = Math.floor(i / 10);
        const y = i % 10;
        if (typeof gameboard.board[x][y] === 'object') {
            box[i].textContent = 'S';
        }
        else if (gameboard.board[x][y] === 'miss') {
            box[i].textContent = 'M';
        }
        else if (gameboard.board[x][y] === 'hit') {
            box[i].textContent = 'H';
        }
    }

    return {  createBoard, interfaceSetUp, updateBoard }
}
