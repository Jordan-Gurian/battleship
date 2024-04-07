export default function inGameBoxEventsCb(userInterface, currentPlayer, box, i) {
    if (currentPlayer.isTurn || userInterface.game.winner != null) {
        return
    }
    const x = Math.floor(i / 10);
    const y = i % 10;
    currentPlayer.opponent.attack(x, y);
    userInterface.updateBoard(box, currentPlayer.gameboard, i);
    box[i].classList.add('no-hover');
    if (currentPlayer.isComputer) {
        const playerBox = Array.from(document.querySelector('.board.human').children);
        const computerAttack = currentPlayer.randomAttack();
        userInterface.updateBoard(playerBox, currentPlayer.opponent.gameboard, computerAttack[0] * 10 + computerAttack[1]);
    }
    if (userInterface.game.isGameOver()) {
        const gameOver = document.querySelector('.game-over');
        if (userInterface.game.winner === userInterface.game.player) {
            gameOver.textContent = `Left board wins! Press "New Game" to play again!`;
        } else {
            gameOver.textContent = `Right board wins! Press "New Game" to play again!`;
        }
    }
}