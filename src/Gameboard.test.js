import Gameboard from './Gameboard';
import Ship from './Ship';

test('confirm board size', () => {
    const myGameboard = Gameboard();
    expect(myGameboard.board.length).toBe(10);  
});

test('place ship at coordinates', () => {
    const myShip = Ship(2);
    const myGameboard = Gameboard();
    myGameboard.placeShip(myShip, 'horz', 1, 1);
    expect(myGameboard.board[1][1]).toBe(myShip);
    expect(myGameboard.board[1][2]).toBe(myShip);
    expect(myGameboard.board[2][1]).toBe(undefined);    
});

test('stop ship from being placed on another ship', () => {
    const myShip = Ship(2);
    const secondShip = Ship(4);
    const myGameboard = Gameboard();
    myGameboard.placeShip(myShip, 'horz', 1, 1);
    myGameboard.placeShip(secondShip, 'vert', 0, 1);
    expect(myGameboard.board[0][1]).toBe(undefined);
    expect(myGameboard.board[1][1]).toBe(myShip);
    expect(myGameboard.board[2][1]).toBe(undefined);    
});

test('stop ship from being placed off board', () => {
    const myShip = Ship(2);
    const secondShip = Ship(4);
    const myGameboard = Gameboard();
    myGameboard.placeShip(myShip, 'horz', 1, 9);
    myGameboard.placeShip(secondShip, 'vert', 8, 1);
    expect(myGameboard.board[1][9]).toBe(undefined);
    expect(myGameboard.board[8][1]).toBe(undefined);
    expect(myGameboard.board[9][1]).toBe(undefined);    
});

test('hit ship', () => {
    const myShip = Ship(2);
    const myGameboard = Gameboard();
    myGameboard.placeShip(myShip, 'horz', 0, 0);
    myGameboard.receiveAttack(0, 0);
    expect(myShip.numHits).toBe(1);
});

test('miss ship', () => {
    const myShip = Ship(2);
    const myGameboard = Gameboard();
    myGameboard.placeShip(myShip, 'horz', 0, 0);
    myGameboard.receiveAttack(5, 0);
    expect(myGameboard.board[5][0]).toBe('miss');
});

test('all ships sunk', () => {
    const myShip = Ship(2);
    const myGameboard = Gameboard();
    myGameboard.placeShip(myShip, 'horz', 0, 0);
    myGameboard.receiveAttack(0, 0);
    myGameboard.receiveAttack(0, 1);
    expect(myGameboard.allShipsSunk()).toBe(true);
});

test('not all ships sunk', () => {
    const myShip = Ship(2);
    const secondShip = Ship(4);
    const myGameboard = Gameboard();
    myGameboard.placeShip(myShip, 'horz', 0, 0);
    myGameboard.placeShip(secondShip, 'vert', 5, 4);
    myGameboard.receiveAttack(0, 0);
    expect(myGameboard.allShipsSunk()).toBe(false);
});