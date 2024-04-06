export default function Interface() {

    const createBoard = function(isHuman) {
        const BOARD_LENGTH = 10;
        let container;
        if (isHuman) {
            container = document.querySelector('.board.human');
        } else {
            container = document.querySelector('.board.computer');
        }

        let box;
        for (let i = 0; i < BOARD_LENGTH**2; i++) {
            box = document.createElement('div');
            box.classList.add('board-box');
            // will need to add event listener to track attacks
            container.appendChild(box);
        }
    }

    return { createBoard }
}