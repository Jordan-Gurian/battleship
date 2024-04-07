// import Game from './Game';
import preGameBoxEventsCb from './preGameBoxEventsCb';
import preGameHoverCb from './preGameHoverCb'

export default function Interface(game) {
    let shipDir = 'horz';

    const vertButton = document.querySelector('.vert');
    const horzButton = document.querySelector('.horz');

    vertButton.addEventListener('click', () => {
        shipDir = 'vert';
        vertButton.classList.add('fake-hover');
        horzButton.classList.remove('fake-hover');
    })

    horzButton.addEventListener('click', () => {
        shipDir = 'horz';
        vertButton.classList.remove('fake-hover');
        horzButton.classList.add('fake-hover');
    })

    const interfaceSetUp = function() {
        this.game.gameSetUp();
        this.createBoard(this.game.player, preGameBoxEventsCb, preGameHoverCb);
        this.createBoard(this.game.computer, preGameBoxEventsCb, preGameHoverCb);
    }

    const createBoard = function(currentPlayer, clickCb, mouseoverCb=null) {
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
                clickCb(this, currentPlayer, box, i, shipDir)
            });

            if (mouseoverCb != null) {
                box[i].addEventListener('mouseover', () => {
                    mouseoverCb(currentPlayer, box, i, shipDir);
                })
            }


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
