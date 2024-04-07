export default function Gameboard() {
    
    const ships = [];

    const createBoard = function() {
        const BOARD_LENGTH = 10;
        const array = Array(10);

        for (let i = 0; i < BOARD_LENGTH; i++) {
            array[i] = Array(10);
        }
        return array;
    }

    const isSpaceFree = function(x, y) {
        if (this.board[x][y] === undefined) {
            return true;
        }
        return false;
    }

    const board = createBoard();

    const placeShip = function(ship, direction, x, y) {
        const BOARD_LENGTH = 10;
        const tempBoard = this.board;
        const coords = [];
        if (x < 0 || y < 0) {
            return false
        }

        if (direction === 'horz') {
            for (let i = y; i < y + ship.length; i++) {
                if (i < BOARD_LENGTH && this.isSpaceFree(x, i)) {
                    coords.push([x, i]);
                } else {
                    return false
                }
            }
        } else { // default to vertical orientation
            for (let i = x; i < x + ship.length; i++) {
                if (i < BOARD_LENGTH && this.isSpaceFree(i, y)) {
                    coords.push([i, y]);
                } else {
                    return false
                }
            }
        }
        ships.push(ship);
        coords.forEach( (item) => {
            tempBoard[item[0]][item[1]] = ship;
        })
        return true
    }

    const receiveAttack = function(x, y) {
        if (this.board[x][y] === undefined) {
            this.board[x][y] = 'miss';
            return true
        }
        if (typeof this.board[x][y] === "object") {
            this.board[x][y].hit();
            this.board[x][y] = 'hit';
            return true
        }
        return false
    }

    const allShipsSunk = function() {
        return ships.reduce((allShips, currentShip) => allShips && currentShip.isSunk(), true);
    }

    return { board, placeShip, isSpaceFree, receiveAttack, allShipsSunk }

}