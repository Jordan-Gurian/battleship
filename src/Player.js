export default function Player(gameboard, isComputer = false, opponent = null, isTurn = false) {
    
    const shipLen = [2, 3, 3, 4, 5]; 

    const setOpponent = function(player) {
        this.opponent = player;
    }


    const randomAttack = function() {
        const BOARD_LENGTH = 10;
        let x;
        let y;
        while (this.isTurn) {
            x = Math.floor(Math.random() * BOARD_LENGTH);
            y = Math.floor(Math.random() * BOARD_LENGTH);
            this.attack(x, y);
        }
        return [x, y]
    }

    const attack = function(x, y) {
        if (this.opponent === null) {
            return
        }
        const madeMove = this.opponent.gameboard.receiveAttack(x, y);
        if (madeMove) {
            this.changeTurn();
            this.opponent.changeTurn();
        }
    }

    const changeTurn = function() {
        this.isTurn = !this.isTurn;
    }
    
    return { gameboard, isComputer, opponent, isTurn, shipLen, 
        setOpponent, attack, randomAttack, changeTurn }
}