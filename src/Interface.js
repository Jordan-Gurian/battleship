import Game from './Game';

export default function Interface() {

    // const box = [[[], [], [], [], [] , [], [], [], [], []],
    //             [[], [], [], [], [] , [], [], [], [], []]];

    const interfaceSetUp = function() {
        const myGame = Game();
        myGame.gameSetUp();
        this.createBoard(true, myGame.player.gameboard.board);
        this.createBoard(false, myGame.computer.gameboard.board);
        // myGame.startGame();
        const newGameButton = document.querySelector('.new-game');
        newGameButton.addEventListener('click', () => {
            myGame.gameSetUp()
            this.createBoard(true);
            this.createBoard(false);
        })
    }

    const createBoard = function(isHuman, board) {
        const BOARD_LENGTH = 10;
        let container;
        const box = [[], [], [], [], [] , [], [], [], [], []];

        if (isHuman) {
            container = document.querySelector('.board.human');
        } else {
            container = document.querySelector('.board.computer');
        }
        container.innerHTML = '';

        for (let i = 0; i < BOARD_LENGTH; i++) {
            for (let j = 0; j < BOARD_LENGTH; j++) {
                box[i][j] = document.createElement('div');
                box[i][j].classList.add('board-box');
                // this.updateBoard(box[i][j], board, i, j);
                box[i][j].addEventListener('click', () => {
                    this.updateBoard(box, board, i, j)
                });
                // will need to add event listener to track attacks
                container.appendChild(box[i][j]);
            }
        }
    }

    const updateBoard = function(box, board, x, y) {
        if (typeof board[x][y] === 'object') {
            box[x][y].textContent = 'S';
        }
        else if (board[x][y] === undefined) {
            box[x][y].textContent = 'M';
        }
        else if (board[x][y] === 'hit') {
            box[x][y].textContent = 'H';
        }
    }

    return {  createBoard, interfaceSetUp, updateBoard }
}