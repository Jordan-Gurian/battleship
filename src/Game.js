import Player from './Player'
import Gameboard from './Gameboard';
import Ship from './Ship';

export default function Game() {
    
    const winner = null;
    const player = null;
    const computer = null;

    // Create human and computer players and boards
    const gameSetUp = function() {
        const playerBoard = Gameboard();
        const computerBoard = Gameboard();
        this.player = Player(playerBoard);
        this.computer = Player(computerBoard, true, this.player);
        this.player.setOpponent(this.computer);
        this.player.isTurn = true;
        this.computer.isTurn = false;
        this.winner = null;
        this.setComputerShips(this.computer);
    }

    const setComputerShips = function(currentPlayer) {
        const SHIP_LENGTHS = [2, 3, 3, 4, 5]; 
        const BOARD_LENGTH = 10;
        const direction = ['horz', 'vert'];
        while (SHIP_LENGTHS.length > 0) {
            const shipDir = Math.floor(2 * Math.random());
            const x = Math.floor(Math.random() * BOARD_LENGTH);
            const y = Math.floor(Math.random() * BOARD_LENGTH);
            if (currentPlayer.gameboard.placeShip(Ship(SHIP_LENGTHS[0]), direction[shipDir], x, y)) {
                SHIP_LENGTHS.shift();
            };
        }
    }

    const isGameOver = function() {
        if (this.player.gameboard.allShipsSunk()) {
            this.winner = this.computer;
        } 
        else if (this.computer.gameboard.allShipsSunk()) {
            this.winner = this.player;
        }
        return this.winner != null
    }

    return { player, computer, winner, gameSetUp, isGameOver, setComputerShips }
}