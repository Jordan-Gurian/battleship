import Ship from './Ship';
import inGameBoxEventsCb from './inGameBoxEventsCb';

export default function preGameBoxEventsCb(userInterface, currentPlayer, box, i, shipDir) {
    if (!currentPlayer.isComputer) {
        const x = Math.floor(i / 10);
        const y = i % 10;
        if (currentPlayer.gameboard.placeShip(Ship(currentPlayer.shipLen[0]), shipDir, x, y)) {
            for (let j = 0; j < currentPlayer.shipLen[0]; j++) {
                if (shipDir === 'horz') {
                    userInterface.updateBoard(box, currentPlayer.gameboard, i+j);
                } else {
                    userInterface.updateBoard(box, currentPlayer.gameboard, i + (10 * j));
                }
            }
            currentPlayer.shipLen.shift();
        }
        if (currentPlayer.shipLen.length === 0) {
            userInterface.createBoard(currentPlayer, inGameBoxEventsCb);
            userInterface.createBoard(currentPlayer.opponent, inGameBoxEventsCb);
        }
    }
}