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

        // Place ships, hardcoded for now
        const SHIP_LENGTHS = [2, 3, 3, 4, 5];
        const playerCoords =[[0,0], [2,2], [3,3], [4,4], [6,6]];

        for (let i = 0; i < SHIP_LENGTHS.length; i++) {
            this.player.gameboard.placeShip(Ship(SHIP_LENGTHS[i]), 'horz', playerCoords[i][0], playerCoords[i][1]);
            this.computer.gameboard.placeShip(Ship(SHIP_LENGTHS[i]), 'horz', playerCoords[i][0], playerCoords[i][1]);
        }
    }

    
    const startGame = function() {
        this.player.changeTurn();
        while (!this.player.gameboard.allShipsSunk() && !this.computer.gameboard.allShipsSunk()) {
            if (this.player.isTurn) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                this.player.attack(x, y);
            } else {
                this.computer.randomAttack();
            }
        }
        this.declareWinner();
    }

    const declareWinner = function() {
        if (this.player.gameboard.allShipsSunk()) {
            this.winner = this.computer;
        } else {
            this.winner = this.player;
        }
    }

    return { player, computer, winner, gameSetUp, startGame, declareWinner }
}