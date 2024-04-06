import Game from './Game';

test('ship at hardcoded coordinate', () => {
    const myGame = Game();
    myGame.gameSetUp();
    expect(myGame.player.opponent).toBe(myGame.computer);
    expect(myGame.computer.opponent).toBe(myGame.player);
    expect(myGame.player.gameboard.board[3][3]).toBeInstanceOf(Object);
    expect(myGame.computer.gameboard.board[0][0]).toBeInstanceOf(Object);
})

test('winner gets declared', () => {
    const myGame = Game();
    myGame.gameSetUp();
    myGame.startGame();
    expect(myGame.winner).not.toBe(null);
})