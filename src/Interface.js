// import Game from './Game';
import Ship from './Ship';

export default function Interface(game) {
    let shipDir = 'horz';

    const vertButton = document.querySelector('.vert');

    vertButton.addEventListener('click', () => {
        shipDir = 'vert';
    })

    const horzButton = document.querySelector('.horz');

    horzButton.addEventListener('click', () => {
        shipDir = 'horz';
    })

    const interfaceSetUp = function() {
        this.game.gameSetUp();
        this.createBoard(this.game.player);
        this.createBoard(this.game.computer);
    }

    const createGameEvents = function(currentPlayer) {
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
                this.updateBoard(box, currentPlayer.gameboard, i);
            }
            
            box[i].addEventListener('click', () => {
                if (currentPlayer.isTurn || this.game.winner != null) {
                    return
                }
                const x = Math.floor(i / 10);
                const y = i % 10;
                currentPlayer.opponent.attack(x, y);
                this.updateBoard(box, currentPlayer.gameboard, i);
                box[i].classList.add('no-hover');
                if (currentPlayer.isComputer) {
                    const playerBox = Array.from(document.querySelector('.board.human').children);
                    const computerAttack = currentPlayer.randomAttack();
                    this.updateBoard(playerBox, currentPlayer.opponent.gameboard, computerAttack[0] * 10 + computerAttack[1]);
                }
                if (this.game.isGameOver()) {
                    const gameOver = document.querySelector('.game-over');
                    if (this.game.winner === this.game.player) {
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

    const createBoard = function(currentPlayer) {
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
            
            // eslint-disable-next-line no-loop-func
            box[i].addEventListener('click', () => {
                if (!currentPlayer.isComputer) {
                    const x = Math.floor(i / 10);
                    const y = i % 10;
                    if (currentPlayer.gameboard.placeShip(Ship(currentPlayer.shipLen[0]), shipDir, x, y)) {
                        for (let j = 0; j < currentPlayer.shipLen[0]; j++) {
                            if (shipDir === 'horz') {
                                this.updateBoard(box, currentPlayer.gameboard, i+j);
                            } else {
                                this.updateBoard(box, currentPlayer.gameboard, i + (10 * j));
                            }
                        }
                        currentPlayer.shipLen.shift();
                    }
                    if (currentPlayer.shipLen.length === 0) {
                        this.createGameEvents(currentPlayer);
                        this.createGameEvents(currentPlayer.opponent);

                    }
                }
            });
            container.appendChild(box[i]);
        }
    }

    

    const updateBoard = function(box, gameboard, i) {
        const x = Math.floor(i / 10);
        const y = i % 10;
        if (typeof gameboard.board[x][y] === 'object') {
            box[i].style.backgroundColor = 'black';
        }
        else if (gameboard.board[x][y] === 'miss') {
            box[i].style.backgroundColor = 'gray';
        }
        else if (gameboard.board[x][y] === 'hit') {
            box[i].style.backgroundColor = 'red';
        }
    }

    return {  game, createBoard, interfaceSetUp, updateBoard, createGameEvents }
}
