export default function Player(board, isComputer = false, opponent = null, isTurn = true) {
    
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
    }

    const attack = function(x, y) {
        const madeMove = this.opponent.board.receiveAttack(x, y);
        if (madeMove) {
            this.changeTurn();
        }
    }

    const changeTurn = function() {
        this.isTurn = !this.isTurn;
    }
    
    return { board, isComputer, opponent, isTurn, 
        setOpponent, attack, randomAttack, changeTurn }
}