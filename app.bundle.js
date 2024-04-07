"use strict";
(self["webpackChunkwebpack_template"] = self["webpackChunkwebpack_template"] || []).push([[524],{

/***/ 576:
/***/ (() => {


;// CONCATENATED MODULE: ./src/Player.js
function Player(gameboard) {
  let isComputer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let opponent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let isTurn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  const shipLen = [2, 3, 3, 4, 5];
  const setOpponent = function (player) {
    this.opponent = player;
  };
  const randomAttack = function () {
    const BOARD_LENGTH = 10;
    let x;
    let y;
    while (this.isTurn) {
      x = Math.floor(Math.random() * BOARD_LENGTH);
      y = Math.floor(Math.random() * BOARD_LENGTH);
      this.attack(x, y);
    }
    return [x, y];
  };
  const attack = function (x, y) {
    if (this.opponent === null) {
      return;
    }
    const madeMove = this.opponent.gameboard.receiveAttack(x, y);
    if (madeMove) {
      this.changeTurn();
      this.opponent.changeTurn();
    }
  };
  const changeTurn = function () {
    this.isTurn = !this.isTurn;
  };
  return {
    gameboard,
    isComputer,
    opponent,
    isTurn,
    shipLen,
    setOpponent,
    attack,
    randomAttack,
    changeTurn
  };
}
;// CONCATENATED MODULE: ./src/Gameboard.js
function Gameboard() {
  const ships = [];
  const createBoard = function () {
    const BOARD_LENGTH = 10;
    const array = Array(10);
    for (let i = 0; i < BOARD_LENGTH; i++) {
      array[i] = Array(10);
    }
    return array;
  };
  const isSpaceFree = function (x, y) {
    if (this.board[x][y] === undefined) {
      return true;
    }
    return false;
  };
  const board = createBoard();
  const placeShip = function (ship, direction, x, y) {
    const BOARD_LENGTH = 10;
    const tempBoard = this.board;
    const coords = [];
    if (x < 0 || y < 0) {
      return false;
    }
    if (direction === 'horz') {
      for (let i = y; i < y + ship.length; i++) {
        if (i < BOARD_LENGTH && this.isSpaceFree(x, i)) {
          coords.push([x, i]);
        } else {
          return false;
        }
      }
    } else {
      // default to vertical orientation
      for (let i = x; i < x + ship.length; i++) {
        if (i < BOARD_LENGTH && this.isSpaceFree(i, y)) {
          coords.push([i, y]);
        } else {
          return false;
        }
      }
    }
    ships.push(ship);
    coords.forEach(item => {
      tempBoard[item[0]][item[1]] = ship;
    });
    return true;
  };
  const receiveAttack = function (x, y) {
    if (this.board[x][y] === undefined) {
      this.board[x][y] = 'miss';
      return true;
    }
    if (typeof this.board[x][y] === "object") {
      this.board[x][y].hit();
      this.board[x][y] = 'hit';
      return true;
    }
    return false;
  };
  const allShipsSunk = function () {
    return ships.reduce((allShips, currentShip) => allShips && currentShip.isSunk(), true);
  };
  return {
    board,
    placeShip,
    isSpaceFree,
    receiveAttack,
    allShipsSunk
  };
}
;// CONCATENATED MODULE: ./src/Ship.js
function Ship(length) {
  if (length > 5) {
    this.length = 5;
  }
  if (length < 2) {
    this.length = 2;
  }
  const hit = function () {
    if (!this.isSunk()) {
      this.numHits += 1;
    }
  };
  const isSunk = function () {
    if (this.numHits >= this.length) {
      return true;
    }
    return false;
  };
  return {
    length,
    numHits: 0,
    hit,
    isSunk
  };
}
;// CONCATENATED MODULE: ./src/Game.js



function Game() {
  const winner = null;
  const player = null;
  const computer = null;

  // Create human and computer players and boards
  const gameSetUp = function () {
    const playerBoard = Gameboard();
    const computerBoard = Gameboard();
    this.player = Player(playerBoard);
    this.computer = Player(computerBoard, true, this.player);
    this.player.setOpponent(this.computer);
    this.player.isTurn = true;
    this.computer.isTurn = false;
    this.winner = null;
    this.setComputerShips(this.computer);
  };
  const setComputerShips = function (currentPlayer) {
    const SHIP_LENGTHS = [2, 3, 3, 4, 5];
    const BOARD_LENGTH = 10;
    const direction = ['horz', 'vert'];
    while (SHIP_LENGTHS.length > 0) {
      const shipDir = Math.floor(2 * Math.random());
      const x = Math.floor(Math.random() * BOARD_LENGTH);
      const y = Math.floor(Math.random() * BOARD_LENGTH);
      if (currentPlayer.gameboard.placeShip(Ship(SHIP_LENGTHS[0]), direction[shipDir], x, y)) {
        SHIP_LENGTHS.shift();
      }
      ;
    }
  };
  const isGameOver = function () {
    if (this.player.gameboard.allShipsSunk()) {
      this.winner = this.computer;
    } else if (this.computer.gameboard.allShipsSunk()) {
      this.winner = this.player;
    }
    return this.winner != null;
  };
  return {
    player,
    computer,
    winner,
    gameSetUp,
    isGameOver,
    setComputerShips
  };
}
;// CONCATENATED MODULE: ./src/inGameBoxEventsCb.js
function inGameBoxEventsCb(userInterface, currentPlayer, box, i) {
  if (currentPlayer.isTurn || userInterface.game.winner != null) {
    return;
  }
  const x = Math.floor(i / 10);
  const y = i % 10;
  currentPlayer.opponent.attack(x, y);
  userInterface.updateBoard(box, currentPlayer.gameboard, i);
  box[i].classList.add('no-hover');
  if (currentPlayer.isComputer) {
    const playerBox = Array.from(document.querySelector('.board.human').children);
    const computerAttack = currentPlayer.randomAttack();
    userInterface.updateBoard(playerBox, currentPlayer.opponent.gameboard, computerAttack[0] * 10 + computerAttack[1]);
  }
  if (userInterface.game.isGameOver()) {
    const gameOver = document.querySelector('.game-over');
    if (userInterface.game.winner === userInterface.game.player) {
      gameOver.textContent = `Left board wins! Press "New Game" to play again!`;
    } else {
      gameOver.textContent = `Right board wins! Press "New Game" to play again!`;
    }
  }
}
;// CONCATENATED MODULE: ./src/preGameBoxEventsCb.js


function preGameBoxEventsCb(userInterface, currentPlayer, box, i, shipDir) {
  if (!currentPlayer.isComputer) {
    const x = Math.floor(i / 10);
    const y = i % 10;
    if (currentPlayer.gameboard.placeShip(Ship(currentPlayer.shipLen[0]), shipDir, x, y)) {
      for (let j = 0; j < currentPlayer.shipLen[0]; j++) {
        if (shipDir === 'horz') {
          userInterface.updateBoard(box, currentPlayer.gameboard, i + j);
        } else {
          userInterface.updateBoard(box, currentPlayer.gameboard, i + 10 * j);
        }
      }
      currentPlayer.shipLen.shift();
    }
    if (currentPlayer.shipLen.length === 0) {
      userInterface.createBoard(currentPlayer, inGameBoxEventsCb);
      userInterface.createBoard(currentPlayer.opponent, inGameBoxEventsCb);
    }
  }
}
;// CONCATENATED MODULE: ./src/preGameHoverCb.js
function preGameHoverCb(currentPlayer, box, i, shipDir) {
  if (!currentPlayer.isComputer) {
    const shipInds = [];
    for (let j = 0; j < currentPlayer.shipLen[0]; j++) {
      if (shipDir === 'horz') {
        shipInds.push(i + j);
      } else {
        shipInds.push(i + 10 * j);
        box[i + 10 * j].classList.add('fake-hover');
      }
    }
    for (let j = 0; j < box.length; j++) {
      if (shipInds.includes(j)) {
        box[j].classList.add('fake-hover');
      } else {
        box[j].classList.remove('fake-hover');
      }
    }
  }
}
;// CONCATENATED MODULE: ./src/Interface.js
// import Game from './Game';


function Interface(game) {
  let shipDir = 'horz';
  const vertButton = document.querySelector('.vert');
  const horzButton = document.querySelector('.horz');
  vertButton.addEventListener('click', () => {
    shipDir = 'vert';
    vertButton.classList.add('fake-hover');
    horzButton.classList.remove('fake-hover');
  });
  horzButton.addEventListener('click', () => {
    shipDir = 'horz';
    vertButton.classList.remove('fake-hover');
    horzButton.classList.add('fake-hover');
  });
  const interfaceSetUp = function () {
    this.game.gameSetUp();
    this.createBoard(this.game.player, preGameBoxEventsCb, preGameHoverCb);
    this.createBoard(this.game.computer, preGameBoxEventsCb, preGameHoverCb);
  };
  const createBoard = function (currentPlayer, clickCb) {
    let mouseoverCb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    const BOARD_LENGTH = 10;
    let container;
    const box = [];
    if (!currentPlayer.isComputer) {
      container = document.querySelector('.board.human');
    } else {
      container = document.querySelector('.board.computer');
    }
    container.innerHTML = '';
    for (let i = 0; i < BOARD_LENGTH ** 2; i++) {
      box[i] = document.createElement('div');
      box[i].classList.add('board-box');
      if (!currentPlayer.isComputer) {
        this.updateBoard(box, currentPlayer.gameboard, i);
      }

      // eslint-disable-next-line no-loop-func
      box[i].addEventListener('click', () => {
        clickCb(this, currentPlayer, box, i, shipDir);
      });
      if (mouseoverCb != null) {
        box[i].addEventListener('mouseover', () => {
          mouseoverCb(currentPlayer, box, i, shipDir);
        });
      }
      container.appendChild(box[i]);
    }
  };
  const updateBoard = function (box, gameboard, i) {
    const x = Math.floor(i / 10);
    const y = i % 10;
    if (typeof gameboard.board[x][y] === 'object') {
      box[i].style.backgroundColor = 'black';
    } else if (gameboard.board[x][y] === 'miss') {
      box[i].style.backgroundColor = 'gray';
    } else if (gameboard.board[x][y] === 'hit') {
      box[i].style.backgroundColor = 'red';
    }
  };
  return {
    game,
    createBoard,
    interfaceSetUp,
    updateBoard
  };
}
;// CONCATENATED MODULE: ./src/newGame.js
function events(myInterface) {
  const newGameButton = document.querySelector('.new-game');
  newGameButton.addEventListener('click', () => {
    const gameOver = document.querySelector('.game-over');
    gameOver.textContent = '';
    myInterface.interfaceSetUp();
  });
}
;// CONCATENATED MODULE: ./src/index.js






// const myGame = Game();
// myGame.gameSetUp();
// myGame.startGame();

const myGame = Game();
const myUI = Interface(myGame);
events(myUI);
myUI.interfaceSetUp();
// myUI.createBoard(true);
// myUI.createBoard(false);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(576));
/******/ }
]);