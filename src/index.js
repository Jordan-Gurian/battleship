import "./style.css";
import "normalize.css";
import Game from './Game';
import Interface from './Interface';
import newGame from './newGame'


// const myGame = Game();
// myGame.gameSetUp();
// myGame.startGame();

const myGame = Game();
const myUI = Interface(myGame);
newGame(myUI);

myUI.interfaceSetUp();
// myUI.createBoard(true);
// myUI.createBoard(false);

