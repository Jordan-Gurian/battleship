import "./style.css";
import "normalize.css";
import Game from './Game';
import Interface from './Interface';
import events from './events'


// const myGame = Game();
// myGame.gameSetUp();
// myGame.startGame();

const myGame = Game();
const myUI = Interface(myGame);
events(myUI);

myUI.interfaceSetUp();
// myUI.createBoard(true);
// myUI.createBoard(false);

