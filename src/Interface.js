// import Game from './Game';
import preGameBoxEventsCb from './preGameBoxEventsCb';

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
        this.createBoard(this.game.player, preGameBoxEventsCb);
        this.createBoard(this.game.computer, preGameBoxEventsCb);
    }

    const createBoard = function(currentPlayer, callback) {
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

            // eslint-disable-next-line no-loop-func
            box[i].addEventListener('click', () => {
                callback(this, currentPlayer, box, i, shipDir)
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

    return {  game, createBoard, interfaceSetUp, updateBoard }
}
