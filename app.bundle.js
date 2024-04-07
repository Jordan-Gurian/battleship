"use strict";
(self["webpackChunkwebpack_template"] = self["webpackChunkwebpack_template"] || []).push([["app"],{

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");



function Game() {
  const winner = null;
  const player = null;
  const computer = null;

  // Create human and computer players and boards
  const gameSetUp = function () {
    const playerBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
    const computerBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
    this.player = (0,_Player__WEBPACK_IMPORTED_MODULE_0__["default"])(playerBoard);
    this.computer = (0,_Player__WEBPACK_IMPORTED_MODULE_0__["default"])(computerBoard, true, this.player);
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
      if (currentPlayer.gameboard.placeShip((0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(SHIP_LENGTHS[0]), direction[shipDir], x, y)) {
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

/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
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

/***/ }),

/***/ "./src/Interface.js":
/*!**************************!*\
  !*** ./src/Interface.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Interface)
/* harmony export */ });
/* harmony import */ var _preGameBoxEventsCb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./preGameBoxEventsCb */ "./src/preGameBoxEventsCb.js");
// import Game from './Game';

function Interface(game) {
  let shipDir = 'horz';
  const vertButton = document.querySelector('.vert');
  vertButton.addEventListener('click', () => {
    shipDir = 'vert';
  });
  const horzButton = document.querySelector('.horz');
  horzButton.addEventListener('click', () => {
    shipDir = 'horz';
  });
  const interfaceSetUp = function () {
    this.game.gameSetUp();
    this.createBoard(this.game.player, _preGameBoxEventsCb__WEBPACK_IMPORTED_MODULE_0__["default"]);
    this.createBoard(this.game.computer, _preGameBoxEventsCb__WEBPACK_IMPORTED_MODULE_0__["default"]);
  };
  const createBoard = function (currentPlayer, callback) {
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
        callback(this, currentPlayer, box, i, shipDir);
      });
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

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
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

/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
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

/***/ }),

/***/ "./src/events.js":
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ events)
/* harmony export */ });
function events(myInterface) {
  const newGameButton = document.querySelector('.new-game');
  newGameButton.addEventListener('click', () => {
    const gameOver = document.querySelector('.game-over');
    gameOver.textContent = '';
    myInterface.interfaceSetUp();
  });
}

/***/ }),

/***/ "./src/inGameBoxEventsCb.js":
/*!**********************************!*\
  !*** ./src/inGameBoxEventsCb.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ inGameBoxEventsCb)
/* harmony export */ });
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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Game */ "./src/Game.js");
/* harmony import */ var _Interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Interface */ "./src/Interface.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./events */ "./src/events.js");






// const myGame = Game();
// myGame.gameSetUp();
// myGame.startGame();

const myGame = (0,_Game__WEBPACK_IMPORTED_MODULE_2__["default"])();
const myUI = (0,_Interface__WEBPACK_IMPORTED_MODULE_3__["default"])(myGame);
(0,_events__WEBPACK_IMPORTED_MODULE_4__["default"])(myUI);
myUI.interfaceSetUp();
// myUI.createBoard(true);
// myUI.createBoard(false);

/***/ }),

/***/ "./src/preGameBoxEventsCb.js":
/*!***********************************!*\
  !*** ./src/preGameBoxEventsCb.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ preGameBoxEventsCb)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
/* harmony import */ var _inGameBoxEventsCb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inGameBoxEventsCb */ "./src/inGameBoxEventsCb.js");


function preGameBoxEventsCb(userInterface, currentPlayer, box, i, shipDir) {
  if (!currentPlayer.isComputer) {
    const x = Math.floor(i / 10);
    const y = i % 10;
    if (currentPlayer.gameboard.placeShip((0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])(currentPlayer.shipLen[0]), shipDir, x, y)) {
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
      userInterface.createBoard(currentPlayer, _inGameBoxEventsCb__WEBPACK_IMPORTED_MODULE_1__["default"]);
      userInterface.createBoard(currentPlayer.opponent, _inGameBoxEventsCb__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
  }
}

/***/ }),

/***/ "./node_modules/normalize.css/normalize.css":
/*!**************************************************!*\
  !*** ./node_modules/normalize.css/normalize.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c0UsMERBQWlCLENBQUM7TUFDM0RDLGFBQWEsQ0FBQ3RELFdBQVcsQ0FBQ2pCLGFBQWEsQ0FBQzBELFFBQVEsRUFBRVksMERBQWlCLENBQUM7SUFDeEU7RUFDSjtBQUNKOzs7Ozs7Ozs7OztBQ3RCQTs7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0dhbWUuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9JbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvZXZlbnRzLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvaW5HYW1lQm94RXZlbnRzQ2IuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3ByZUdhbWVCb3hFdmVudHNDYi5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcz9mYjU3Iiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvc3R5bGUuY3NzP2UzMjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcidcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9HYW1lYm9hcmQnO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gR2FtZSgpIHtcbiAgICBcbiAgICBjb25zdCB3aW5uZXIgPSBudWxsO1xuICAgIGNvbnN0IHBsYXllciA9IG51bGw7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBudWxsO1xuXG4gICAgLy8gQ3JlYXRlIGh1bWFuIGFuZCBjb21wdXRlciBwbGF5ZXJzIGFuZCBib2FyZHNcbiAgICBjb25zdCBnYW1lU2V0VXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgICAgICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuICAgICAgICB0aGlzLnBsYXllciA9IFBsYXllcihwbGF5ZXJCb2FyZCk7XG4gICAgICAgIHRoaXMuY29tcHV0ZXIgPSBQbGF5ZXIoY29tcHV0ZXJCb2FyZCwgdHJ1ZSwgdGhpcy5wbGF5ZXIpO1xuICAgICAgICB0aGlzLnBsYXllci5zZXRPcHBvbmVudCh0aGlzLmNvbXB1dGVyKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb21wdXRlci5pc1R1cm4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy53aW5uZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnNldENvbXB1dGVyU2hpcHModGhpcy5jb21wdXRlcik7XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0Q29tcHV0ZXJTaGlwcyA9IGZ1bmN0aW9uKGN1cnJlbnRQbGF5ZXIpIHtcbiAgICAgICAgY29uc3QgU0hJUF9MRU5HVEhTID0gWzIsIDMsIDMsIDQsIDVdOyBcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IFsnaG9yeicsICd2ZXJ0J107XG4gICAgICAgIHdoaWxlIChTSElQX0xFTkdUSFMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgc2hpcERpciA9IE1hdGguZmxvb3IoMiAqIE1hdGgucmFuZG9tKCkpO1xuICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX0xFTkdUSCk7XG4gICAgICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQk9BUkRfTEVOR1RIKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoU2hpcChTSElQX0xFTkdUSFNbMF0pLCBkaXJlY3Rpb25bc2hpcERpcl0sIHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgU0hJUF9MRU5HVEhTLnNoaWZ0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNHYW1lT3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgICAgICB0aGlzLndpbm5lciA9IHRoaXMuY29tcHV0ZXI7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29tcHV0ZXIuZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgICAgICB0aGlzLndpbm5lciA9IHRoaXMucGxheWVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLndpbm5lciAhPSBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgcGxheWVyLCBjb21wdXRlciwgd2lubmVyLCBnYW1lU2V0VXAsIGlzR2FtZU92ZXIsIHNldENvbXB1dGVyU2hpcHMgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcbiAgICBcbiAgICBjb25zdCBzaGlwcyA9IFtdO1xuXG4gICAgY29uc3QgY3JlYXRlQm9hcmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gQXJyYXkoMTApO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQk9BUkRfTEVOR1RIOyBpKyspIHtcbiAgICAgICAgICAgIGFycmF5W2ldID0gQXJyYXkoMTApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG5cbiAgICBjb25zdCBpc1NwYWNlRnJlZSA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbeF1beV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcblxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uKHNoaXAsIGRpcmVjdGlvbiwgeCwgeSkge1xuICAgICAgICBjb25zdCBCT0FSRF9MRU5HVEggPSAxMDtcbiAgICAgICAgY29uc3QgdGVtcEJvYXJkID0gdGhpcy5ib2FyZDtcbiAgICAgICAgY29uc3QgY29vcmRzID0gW107XG4gICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnaG9yeicpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB5OyBpIDwgeSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IEJPQVJEX0xFTkdUSCAmJiB0aGlzLmlzU3BhY2VGcmVlKHgsIGkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvb3Jkcy5wdXNoKFt4LCBpXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBkZWZhdWx0IHRvIHZlcnRpY2FsIG9yaWVudGF0aW9uXG4gICAgICAgICAgICBmb3IgKGxldCBpID0geDsgaSA8IHggKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBCT0FSRF9MRU5HVEggJiYgdGhpcy5pc1NwYWNlRnJlZShpLCB5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb29yZHMucHVzaChbaSwgeV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzaGlwcy5wdXNoKHNoaXApO1xuICAgICAgICBjb29yZHMuZm9yRWFjaCggKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRlbXBCb2FyZFtpdGVtWzBdXVtpdGVtWzFdXSA9IHNoaXA7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbeF1beV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9ICdtaXNzJztcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3hdW3ldID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpO1xuICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9ICdoaXQnO1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBhbGxTaGlwc1N1bmsgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNoaXBzLnJlZHVjZSgoYWxsU2hpcHMsIGN1cnJlbnRTaGlwKSA9PiBhbGxTaGlwcyAmJiBjdXJyZW50U2hpcC5pc1N1bmsoKSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYm9hcmQsIHBsYWNlU2hpcCwgaXNTcGFjZUZyZWUsIHJlY2VpdmVBdHRhY2ssIGFsbFNoaXBzU3VuayB9XG5cbn0iLCIvLyBpbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnO1xuaW1wb3J0IHByZUdhbWVCb3hFdmVudHNDYiBmcm9tICcuL3ByZUdhbWVCb3hFdmVudHNDYic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEludGVyZmFjZShnYW1lKSB7XG4gICAgbGV0IHNoaXBEaXIgPSAnaG9yeic7XG5cbiAgICBjb25zdCB2ZXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZlcnQnKTtcblxuICAgIHZlcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHNoaXBEaXIgPSAndmVydCc7XG4gICAgfSlcblxuICAgIGNvbnN0IGhvcnpCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9yeicpO1xuXG4gICAgaG9yekJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgc2hpcERpciA9ICdob3J6JztcbiAgICB9KVxuXG4gICAgY29uc3QgaW50ZXJmYWNlU2V0VXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5nYW1lLmdhbWVTZXRVcCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZUJvYXJkKHRoaXMuZ2FtZS5wbGF5ZXIsIHByZUdhbWVCb3hFdmVudHNDYik7XG4gICAgICAgIHRoaXMuY3JlYXRlQm9hcmQodGhpcy5nYW1lLmNvbXB1dGVyLCBwcmVHYW1lQm94RXZlbnRzQ2IpO1xuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZUJvYXJkID0gZnVuY3Rpb24oY3VycmVudFBsYXllciwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGxldCBjb250YWluZXI7XG4gICAgICAgIGNvbnN0IGJveCA9IFtdO1xuXG4gICAgICAgIGlmICghY3VycmVudFBsYXllci5pc0NvbXB1dGVyKSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQuaHVtYW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC5jb21wdXRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJPQVJEX0xFTkdUSCoqMjsgaSsrKSB7XG4gICAgICAgICAgICBib3hbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJveFtpXS5jbGFzc0xpc3QuYWRkKCdib2FyZC1ib3gnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFjdXJyZW50UGxheWVyLmlzQ29tcHV0ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkKGJveCwgY3VycmVudFBsYXllci5nYW1lYm9hcmQsIGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9vcC1mdW5jXG4gICAgICAgICAgICBib3hbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcywgY3VycmVudFBsYXllciwgYm94LCBpLCBzaGlwRGlyKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm94W2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHVwZGF0ZUJvYXJkID0gZnVuY3Rpb24oYm94LCBnYW1lYm9hcmQsIGkpIHtcbiAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoaSAvIDEwKTtcbiAgICAgICAgY29uc3QgeSA9IGkgJSAxMDtcbiAgICAgICAgaWYgKHR5cGVvZiBnYW1lYm9hcmQuYm9hcmRbeF1beV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBib3hbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsYWNrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChnYW1lYm9hcmQuYm9hcmRbeF1beV0gPT09ICdtaXNzJykge1xuICAgICAgICAgICAgYm94W2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmF5JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChnYW1lYm9hcmQuYm9hcmRbeF1beV0gPT09ICdoaXQnKSB7XG4gICAgICAgICAgICBib3hbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyAgZ2FtZSwgY3JlYXRlQm9hcmQsIGludGVyZmFjZVNldFVwLCB1cGRhdGVCb2FyZCB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQbGF5ZXIoZ2FtZWJvYXJkLCBpc0NvbXB1dGVyID0gZmFsc2UsIG9wcG9uZW50ID0gbnVsbCwgaXNUdXJuID0gZmFsc2UpIHtcbiAgICBcbiAgICBjb25zdCBzaGlwTGVuID0gWzIsIDMsIDMsIDQsIDVdOyBcblxuICAgIGNvbnN0IHNldE9wcG9uZW50ID0gZnVuY3Rpb24ocGxheWVyKSB7XG4gICAgICAgIHRoaXMub3Bwb25lbnQgPSBwbGF5ZXI7XG4gICAgfVxuXG5cbiAgICBjb25zdCByYW5kb21BdHRhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcbiAgICAgICAgd2hpbGUgKHRoaXMuaXNUdXJuKSB7XG4gICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQk9BUkRfTEVOR1RIKTtcbiAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9MRU5HVEgpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2soeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt4LCB5XVxuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjayA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgaWYgKHRoaXMub3Bwb25lbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hZGVNb3ZlID0gdGhpcy5vcHBvbmVudC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICAgICAgaWYgKG1hZGVNb3ZlKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVR1cm4oKTtcbiAgICAgICAgICAgIHRoaXMub3Bwb25lbnQuY2hhbmdlVHVybigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlVHVybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmlzVHVybiA9ICF0aGlzLmlzVHVybjtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHsgZ2FtZWJvYXJkLCBpc0NvbXB1dGVyLCBvcHBvbmVudCwgaXNUdXJuLCBzaGlwTGVuLCBcbiAgICAgICAgc2V0T3Bwb25lbnQsIGF0dGFjaywgcmFuZG9tQXR0YWNrLCBjaGFuZ2VUdXJuIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaGlwKGxlbmd0aCkge1xuICAgIGlmIChsZW5ndGggPiA1KSB7IFxuICAgICAgICB0aGlzLmxlbmd0aCA9IDU7XG4gICAgfVxuXG4gICAgaWYgKGxlbmd0aCA8IDIpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSAyO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBoaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3VuaygpKSB7XG4gICAgICAgICAgICB0aGlzLm51bUhpdHMgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5udW1IaXRzID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgbGVuZ3RoLCBudW1IaXRzOiAwLCBoaXQsIGlzU3VuayB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXZlbnRzKG15SW50ZXJmYWNlKSB7XG4gICAgY29uc3QgbmV3R2FtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctZ2FtZScpO1xuICAgIG5ld0dhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGdhbWVPdmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtb3ZlcicpO1xuICAgICAgICBnYW1lT3Zlci50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICBteUludGVyZmFjZS5pbnRlcmZhY2VTZXRVcCgpO1xuICAgIH0pXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5HYW1lQm94RXZlbnRzQ2IodXNlckludGVyZmFjZSwgY3VycmVudFBsYXllciwgYm94LCBpKSB7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIuaXNUdXJuIHx8IHVzZXJJbnRlcmZhY2UuZ2FtZS53aW5uZXIgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgeCA9IE1hdGguZmxvb3IoaSAvIDEwKTtcbiAgICBjb25zdCB5ID0gaSAlIDEwO1xuICAgIGN1cnJlbnRQbGF5ZXIub3Bwb25lbnQuYXR0YWNrKHgsIHkpO1xuICAgIHVzZXJJbnRlcmZhY2UudXBkYXRlQm9hcmQoYm94LCBjdXJyZW50UGxheWVyLmdhbWVib2FyZCwgaSk7XG4gICAgYm94W2ldLmNsYXNzTGlzdC5hZGQoJ25vLWhvdmVyJyk7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIuaXNDb21wdXRlcikge1xuICAgICAgICBjb25zdCBwbGF5ZXJCb3ggPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC5odW1hbicpLmNoaWxkcmVuKTtcbiAgICAgICAgY29uc3QgY29tcHV0ZXJBdHRhY2sgPSBjdXJyZW50UGxheWVyLnJhbmRvbUF0dGFjaygpO1xuICAgICAgICB1c2VySW50ZXJmYWNlLnVwZGF0ZUJvYXJkKHBsYXllckJveCwgY3VycmVudFBsYXllci5vcHBvbmVudC5nYW1lYm9hcmQsIGNvbXB1dGVyQXR0YWNrWzBdICogMTAgKyBjb21wdXRlckF0dGFja1sxXSk7XG4gICAgfVxuICAgIGlmICh1c2VySW50ZXJmYWNlLmdhbWUuaXNHYW1lT3ZlcigpKSB7XG4gICAgICAgIGNvbnN0IGdhbWVPdmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtb3ZlcicpO1xuICAgICAgICBpZiAodXNlckludGVyZmFjZS5nYW1lLndpbm5lciA9PT0gdXNlckludGVyZmFjZS5nYW1lLnBsYXllcikge1xuICAgICAgICAgICAgZ2FtZU92ZXIudGV4dENvbnRlbnQgPSBgTGVmdCBib2FyZCB3aW5zISBQcmVzcyBcIk5ldyBHYW1lXCIgdG8gcGxheSBhZ2FpbiFgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2FtZU92ZXIudGV4dENvbnRlbnQgPSBgUmlnaHQgYm9hcmQgd2lucyEgUHJlc3MgXCJOZXcgR2FtZVwiIHRvIHBsYXkgYWdhaW4hYDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IFwibm9ybWFsaXplLmNzc1wiO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcbmltcG9ydCBJbnRlcmZhY2UgZnJvbSAnLi9JbnRlcmZhY2UnO1xuaW1wb3J0IGV2ZW50cyBmcm9tICcuL2V2ZW50cydcblxuXG4vLyBjb25zdCBteUdhbWUgPSBHYW1lKCk7XG4vLyBteUdhbWUuZ2FtZVNldFVwKCk7XG4vLyBteUdhbWUuc3RhcnRHYW1lKCk7XG5cbmNvbnN0IG15R2FtZSA9IEdhbWUoKTtcbmNvbnN0IG15VUkgPSBJbnRlcmZhY2UobXlHYW1lKTtcbmV2ZW50cyhteVVJKTtcblxubXlVSS5pbnRlcmZhY2VTZXRVcCgpO1xuLy8gbXlVSS5jcmVhdGVCb2FyZCh0cnVlKTtcbi8vIG15VUkuY3JlYXRlQm9hcmQoZmFsc2UpO1xuXG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xuaW1wb3J0IGluR2FtZUJveEV2ZW50c0NiIGZyb20gJy4vaW5HYW1lQm94RXZlbnRzQ2InO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmVHYW1lQm94RXZlbnRzQ2IodXNlckludGVyZmFjZSwgY3VycmVudFBsYXllciwgYm94LCBpLCBzaGlwRGlyKSB7XG4gICAgaWYgKCFjdXJyZW50UGxheWVyLmlzQ29tcHV0ZXIpIHtcbiAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoaSAvIDEwKTtcbiAgICAgICAgY29uc3QgeSA9IGkgJSAxMDtcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChTaGlwKGN1cnJlbnRQbGF5ZXIuc2hpcExlblswXSksIHNoaXBEaXIsIHgsIHkpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGN1cnJlbnRQbGF5ZXIuc2hpcExlblswXTsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNoaXBEaXIgPT09ICdob3J6Jykge1xuICAgICAgICAgICAgICAgICAgICB1c2VySW50ZXJmYWNlLnVwZGF0ZUJvYXJkKGJveCwgY3VycmVudFBsYXllci5nYW1lYm9hcmQsIGkraik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlckludGVyZmFjZS51cGRhdGVCb2FyZChib3gsIGN1cnJlbnRQbGF5ZXIuZ2FtZWJvYXJkLCBpICsgKDEwICogaikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRQbGF5ZXIuc2hpcExlbi5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50UGxheWVyLnNoaXBMZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB1c2VySW50ZXJmYWNlLmNyZWF0ZUJvYXJkKGN1cnJlbnRQbGF5ZXIsIGluR2FtZUJveEV2ZW50c0NiKTtcbiAgICAgICAgICAgIHVzZXJJbnRlcmZhY2UuY3JlYXRlQm9hcmQoY3VycmVudFBsYXllci5vcHBvbmVudCwgaW5HYW1lQm94RXZlbnRzQ2IpO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJQbGF5ZXIiLCJHYW1lYm9hcmQiLCJTaGlwIiwiR2FtZSIsIndpbm5lciIsInBsYXllciIsImNvbXB1dGVyIiwiZ2FtZVNldFVwIiwicGxheWVyQm9hcmQiLCJjb21wdXRlckJvYXJkIiwic2V0T3Bwb25lbnQiLCJpc1R1cm4iLCJzZXRDb21wdXRlclNoaXBzIiwiY3VycmVudFBsYXllciIsIlNISVBfTEVOR1RIUyIsIkJPQVJEX0xFTkdUSCIsImRpcmVjdGlvbiIsImxlbmd0aCIsInNoaXBEaXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ4IiwieSIsImdhbWVib2FyZCIsInBsYWNlU2hpcCIsInNoaWZ0IiwiaXNHYW1lT3ZlciIsImFsbFNoaXBzU3VuayIsInNoaXBzIiwiY3JlYXRlQm9hcmQiLCJhcnJheSIsIkFycmF5IiwiaSIsImlzU3BhY2VGcmVlIiwiYm9hcmQiLCJ1bmRlZmluZWQiLCJzaGlwIiwidGVtcEJvYXJkIiwiY29vcmRzIiwicHVzaCIsImZvckVhY2giLCJpdGVtIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsInJlZHVjZSIsImFsbFNoaXBzIiwiY3VycmVudFNoaXAiLCJpc1N1bmsiLCJwcmVHYW1lQm94RXZlbnRzQ2IiLCJJbnRlcmZhY2UiLCJnYW1lIiwidmVydEJ1dHRvbiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJob3J6QnV0dG9uIiwiaW50ZXJmYWNlU2V0VXAiLCJjYWxsYmFjayIsImNvbnRhaW5lciIsImJveCIsImlzQ29tcHV0ZXIiLCJpbm5lckhUTUwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwidXBkYXRlQm9hcmQiLCJhcHBlbmRDaGlsZCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYXJndW1lbnRzIiwib3Bwb25lbnQiLCJzaGlwTGVuIiwicmFuZG9tQXR0YWNrIiwiYXR0YWNrIiwibWFkZU1vdmUiLCJjaGFuZ2VUdXJuIiwibnVtSGl0cyIsImV2ZW50cyIsIm15SW50ZXJmYWNlIiwibmV3R2FtZUJ1dHRvbiIsImdhbWVPdmVyIiwidGV4dENvbnRlbnQiLCJpbkdhbWVCb3hFdmVudHNDYiIsInVzZXJJbnRlcmZhY2UiLCJwbGF5ZXJCb3giLCJmcm9tIiwiY2hpbGRyZW4iLCJjb21wdXRlckF0dGFjayIsIm15R2FtZSIsIm15VUkiLCJqIl0sInNvdXJjZVJvb3QiOiIifQ==