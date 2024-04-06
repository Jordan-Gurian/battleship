import Player from './Player'
import Gameboard from './Gameboard';
import Ship from './Ship';

test('has gameboard', () => {
    const myGameboard = Gameboard();
    const myPlayer = Player(myGameboard);
    expect(myPlayer).toMatchObject({ board: myGameboard })
})

test('set opponent', () => {
    const myGameboard = Gameboard();
    const oppGameboard = Gameboard();
    const myPlayer = Player(myGameboard);
    const oppPlayer = Player(oppGameboard);
    myPlayer.setOpponent(oppPlayer);
    expect(myPlayer).toMatchObject({ opponent: oppPlayer })
})

test('attack opponent', () => {
    const myGameboard = Gameboard();
    const oppGameboard = Gameboard();
    const aShip = Ship(4);
    oppGameboard.placeShip(aShip, 'vert', 0, 0)
    const myPlayer = Player(myGameboard);
    const oppPlayer = Player(oppGameboard);
    myPlayer.setOpponent(oppPlayer);
    myPlayer.attack(0, 0);
    expect(aShip.numHits).toBe(1)
})

test('prevent attack to previously attacked location', () => {
    const myGameboard = Gameboard();
    const oppGameboard = Gameboard();
    const aShip = Ship(4);
    oppGameboard.placeShip(aShip, 'vert', 0, 0)
    const myPlayer = Player(myGameboard);
    const oppPlayer = Player(oppGameboard);
    myPlayer.setOpponent(oppPlayer);
    myPlayer.attack(0, 0);
    myPlayer.attack(0, 0);
    expect(aShip.numHits).toBe(1);
})

test('computer makes attack', () => {
    const myGameboard = Gameboard();
    const oppGameboard = Gameboard();
    const aShip = Ship(4);
    myGameboard.placeShip(aShip, 'vert', 0, 0)
    const myPlayer = Player(myGameboard);
    const oppPlayer = Player(oppGameboard, true, myPlayer, true);
    oppPlayer.randomAttack();
    expect(oppPlayer.isTurn).toBe(false);
})