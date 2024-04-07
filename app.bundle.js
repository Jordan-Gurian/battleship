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
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
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
    this.createBoard(this.game.player);
    this.createBoard(this.game.computer);
  };
  const createGameEvents = function (currentPlayer) {
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
      box[i].addEventListener('click', () => {
        if (currentPlayer.isTurn || this.game.winner != null) {
          return;
        }
        const x = Math.floor(i / 10);
        const y = i % 10;
        currentPlayer.opponent.attack(x, y);
        this.updateBoard(box, currentPlayer.gameboard, i);
        box[i].classList.add('no-hover');
        if (currentPlayer.isComputer) {
          const playerBox = Array.from(document.querySelector('.board.human').children);
          const computerAttack = currentPlayer.randomAttack();
          this.updateBoard(playerBox, currentPlayer.opponent.gameboard, computerAttack[0] * 10 + computerAttack[1]);
        }
        if (this.game.isGameOver()) {
          const gameOver = document.querySelector('.game-over');
          if (this.game.winner === this.game.player) {
            gameOver.textContent = `Left board wins! Press "New Game" to play again!`;
          } else {
            gameOver.textContent = `Right board wins! Press "New Game" to play again!`;
          }
        }
      });
      // will need to add event listener to track attacks
      container.appendChild(box[i]);
    }
  };
  const createBoard = function (currentPlayer) {
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

      // eslint-disable-next-line no-loop-func
      box[i].addEventListener('click', () => {
        if (!currentPlayer.isComputer) {
          const x = Math.floor(i / 10);
          const y = i % 10;
          if (currentPlayer.gameboard.placeShip((0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])(currentPlayer.shipLen[0]), shipDir, x, y)) {
            for (let j = 0; j < currentPlayer.shipLen[0]; j++) {
              if (shipDir === 'horz') {
                this.updateBoard(box, currentPlayer.gameboard, i + j);
              } else {
                this.updateBoard(box, currentPlayer.gameboard, i + 10 * j);
              }
            }
            currentPlayer.shipLen.shift();
          }
          if (currentPlayer.shipLen.length === 0) {
            this.createGameEvents(currentPlayer);
            this.createGameEvents(currentPlayer.opponent);
          }
        }
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
    updateBoard,
    createGameEvents
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNDLGFBQWEsQ0FBQyxXQUFXLENBQUM7RUFDekRpQyxhQUFhLENBQUNoQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtJQUMxQyxNQUFNbUIsUUFBUSxHQUFHckIsUUFBUSxDQUFDQyxhQUFhLENBQUMsWUFBWSxDQUFDO0lBQ3JEb0IsUUFBUSxDQUFDQyxXQUFXLEdBQUcsRUFBRTtJQUN6QlcsV0FBVyxDQUFDN0IsY0FBYyxDQUFDLENBQUM7RUFDaEMsQ0FBQyxDQUFDO0FBQ047Ozs7Ozs7Ozs7Ozs7Ozs7QUNQcUI7QUFDRTtBQUNHO0FBQ1U7QUFDUDs7QUFHN0I7QUFDQTtBQUNBOztBQUVBLE1BQU0rQixNQUFNLEdBQUdwRixpREFBSSxDQUFDLENBQUM7QUFDckIsTUFBTXFGLElBQUksR0FBR3ZDLHNEQUFTLENBQUNzQyxNQUFNLENBQUM7QUFDOUJILG1EQUFNLENBQUNJLElBQUksQ0FBQztBQUVaQSxJQUFJLENBQUNoQyxjQUFjLENBQUMsQ0FBQztBQUNyQjtBQUNBOzs7Ozs7Ozs7OztBQ2pCQTs7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0dhbWUuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9JbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvZXZlbnRzLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3M/ZmI1NyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3N0eWxlLmNzcz9lMzIwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vR2FtZWJvYXJkJztcbmltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbWUoKSB7XG4gICAgXG4gICAgY29uc3Qgd2lubmVyID0gbnVsbDtcbiAgICBjb25zdCBwbGF5ZXIgPSBudWxsO1xuICAgIGNvbnN0IGNvbXB1dGVyID0gbnVsbDtcblxuICAgIC8vIENyZWF0ZSBodW1hbiBhbmQgY29tcHV0ZXIgcGxheWVycyBhbmQgYm9hcmRzXG4gICAgY29uc3QgZ2FtZVNldFVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBQbGF5ZXIocGxheWVyQm9hcmQpO1xuICAgICAgICB0aGlzLmNvbXB1dGVyID0gUGxheWVyKGNvbXB1dGVyQm9hcmQsIHRydWUsIHRoaXMucGxheWVyKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc2V0T3Bwb25lbnQodGhpcy5jb21wdXRlcik7XG4gICAgICAgIHRoaXMucGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgICAgIHRoaXMuY29tcHV0ZXIuaXNUdXJuID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2lubmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZXRDb21wdXRlclNoaXBzKHRoaXMuY29tcHV0ZXIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNldENvbXB1dGVyU2hpcHMgPSBmdW5jdGlvbihjdXJyZW50UGxheWVyKSB7XG4gICAgICAgIGNvbnN0IFNISVBfTEVOR1RIUyA9IFsyLCAzLCAzLCA0LCA1XTsgXG4gICAgICAgIGNvbnN0IEJPQVJEX0xFTkdUSCA9IDEwO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBbJ2hvcnonLCAndmVydCddO1xuICAgICAgICB3aGlsZSAoU0hJUF9MRU5HVEhTLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBEaXIgPSBNYXRoLmZsb29yKDIgKiBNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9MRU5HVEgpO1xuICAgICAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX0xFTkdUSCk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKFNoaXAoU0hJUF9MRU5HVEhTWzBdKSwgZGlyZWN0aW9uW3NoaXBEaXJdLCB4LCB5KSkge1xuICAgICAgICAgICAgICAgIFNISVBfTEVOR1RIUy5zaGlmdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGlzR2FtZU92ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgICAgdGhpcy53aW5uZXIgPSB0aGlzLmNvbXB1dGVyO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvbXB1dGVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgICAgdGhpcy53aW5uZXIgPSB0aGlzLnBsYXllcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy53aW5uZXIgIT0gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiB7IHBsYXllciwgY29tcHV0ZXIsIHdpbm5lciwgZ2FtZVNldFVwLCBpc0dhbWVPdmVyLCBzZXRDb21wdXRlclNoaXBzIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gICAgXG4gICAgY29uc3Qgc2hpcHMgPSBbXTtcblxuICAgIGNvbnN0IGNyZWF0ZUJvYXJkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IEJPQVJEX0xFTkdUSCA9IDEwO1xuICAgICAgICBjb25zdCBhcnJheSA9IEFycmF5KDEwKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJPQVJEX0xFTkdUSDsgaSsrKSB7XG4gICAgICAgICAgICBhcnJheVtpXSA9IEFycmF5KDEwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNTcGFjZUZyZWUgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbihzaGlwLCBkaXJlY3Rpb24sIHgsIHkpIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGNvbnN0IHRlbXBCb2FyZCA9IHRoaXMuYm9hcmQ7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2hvcnonKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0geTsgaSA8IHkgKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBCT0FSRF9MRU5HVEggJiYgdGhpcy5pc1NwYWNlRnJlZSh4LCBpKSkge1xuICAgICAgICAgICAgICAgICAgICBjb29yZHMucHVzaChbeCwgaV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gZGVmYXVsdCB0byB2ZXJ0aWNhbCBvcmllbnRhdGlvblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpIDwgQk9BUkRfTEVOR1RIICYmIHRoaXMuaXNTcGFjZUZyZWUoaSwgeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29vcmRzLnB1c2goW2ksIHldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2hpcHMucHVzaChzaGlwKTtcbiAgICAgICAgY29vcmRzLmZvckVhY2goIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0ZW1wQm9hcmRbaXRlbVswXV1baXRlbVsxXV0gPSBzaGlwO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnbWlzcyc7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFt4XVt5XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XS5oaXQoKTtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnaGl0JztcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgYWxsU2hpcHNTdW5rID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzaGlwcy5yZWR1Y2UoKGFsbFNoaXBzLCBjdXJyZW50U2hpcCkgPT4gYWxsU2hpcHMgJiYgY3VycmVudFNoaXAuaXNTdW5rKCksIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiB7IGJvYXJkLCBwbGFjZVNoaXAsIGlzU3BhY2VGcmVlLCByZWNlaXZlQXR0YWNrLCBhbGxTaGlwc1N1bmsgfVxuXG59IiwiLy8gaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcbmltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEludGVyZmFjZShnYW1lKSB7XG4gICAgbGV0IHNoaXBEaXIgPSAnaG9yeic7XG5cbiAgICBjb25zdCB2ZXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZlcnQnKTtcblxuICAgIHZlcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHNoaXBEaXIgPSAndmVydCc7XG4gICAgfSlcblxuICAgIGNvbnN0IGhvcnpCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9yeicpO1xuXG4gICAgaG9yekJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgc2hpcERpciA9ICdob3J6JztcbiAgICB9KVxuXG4gICAgY29uc3QgaW50ZXJmYWNlU2V0VXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5nYW1lLmdhbWVTZXRVcCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZUJvYXJkKHRoaXMuZ2FtZS5wbGF5ZXIpO1xuICAgICAgICB0aGlzLmNyZWF0ZUJvYXJkKHRoaXMuZ2FtZS5jb21wdXRlcik7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlR2FtZUV2ZW50cyA9IGZ1bmN0aW9uKGN1cnJlbnRQbGF5ZXIpIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGxldCBjb250YWluZXI7XG4gICAgICAgIGNvbnN0IGJveCA9IFtdO1xuXG4gICAgICAgIGlmICghY3VycmVudFBsYXllci5pc0NvbXB1dGVyKSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQuaHVtYW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC5jb21wdXRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJPQVJEX0xFTkdUSCoqMjsgaSsrKSB7XG4gICAgICAgICAgICBib3hbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJveFtpXS5jbGFzc0xpc3QuYWRkKCdib2FyZC1ib3gnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFjdXJyZW50UGxheWVyLmlzQ29tcHV0ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkKGJveCwgY3VycmVudFBsYXllci5nYW1lYm9hcmQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBib3hbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIuaXNUdXJuIHx8IHRoaXMuZ2FtZS53aW5uZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoaSAvIDEwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gaSAlIDEwO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQbGF5ZXIub3Bwb25lbnQuYXR0YWNrKHgsIHkpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQm9hcmQoYm94LCBjdXJyZW50UGxheWVyLmdhbWVib2FyZCwgaSk7XG4gICAgICAgICAgICAgICAgYm94W2ldLmNsYXNzTGlzdC5hZGQoJ25vLWhvdmVyJyk7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIuaXNDb21wdXRlcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF5ZXJCb3ggPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC5odW1hbicpLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcHV0ZXJBdHRhY2sgPSBjdXJyZW50UGxheWVyLnJhbmRvbUF0dGFjaygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkKHBsYXllckJveCwgY3VycmVudFBsYXllci5vcHBvbmVudC5nYW1lYm9hcmQsIGNvbXB1dGVyQXR0YWNrWzBdICogMTAgKyBjb21wdXRlckF0dGFja1sxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuaXNHYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVPdmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtb3ZlcicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLndpbm5lciA9PT0gdGhpcy5nYW1lLnBsYXllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU92ZXIudGV4dENvbnRlbnQgPSBgTGVmdCBib2FyZCB3aW5zISBQcmVzcyBcIk5ldyBHYW1lXCIgdG8gcGxheSBhZ2FpbiFgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU92ZXIudGV4dENvbnRlbnQgPSBgUmlnaHQgYm9hcmQgd2lucyEgUHJlc3MgXCJOZXcgR2FtZVwiIHRvIHBsYXkgYWdhaW4hYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gd2lsbCBuZWVkIHRvIGFkZCBldmVudCBsaXN0ZW5lciB0byB0cmFjayBhdHRhY2tzXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm94W2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZUJvYXJkID0gZnVuY3Rpb24oY3VycmVudFBsYXllcikge1xuICAgICAgICBjb25zdCBCT0FSRF9MRU5HVEggPSAxMDtcbiAgICAgICAgbGV0IGNvbnRhaW5lcjtcbiAgICAgICAgY29uc3QgYm94ID0gW107XG5cbiAgICAgICAgaWYgKCFjdXJyZW50UGxheWVyLmlzQ29tcHV0ZXIpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC5odW1hbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLmNvbXB1dGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQk9BUkRfTEVOR1RIKioyOyBpKyspIHtcbiAgICAgICAgICAgIGJveFtpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYm94W2ldLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLWJveCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9vcC1mdW5jXG4gICAgICAgICAgICBib3hbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50UGxheWVyLmlzQ29tcHV0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoaSAvIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeSA9IGkgJSAxMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChTaGlwKGN1cnJlbnRQbGF5ZXIuc2hpcExlblswXSksIHNoaXBEaXIsIHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGN1cnJlbnRQbGF5ZXIuc2hpcExlblswXTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXBEaXIgPT09ICdob3J6Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkKGJveCwgY3VycmVudFBsYXllci5nYW1lYm9hcmQsIGkraik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVCb2FyZChib3gsIGN1cnJlbnRQbGF5ZXIuZ2FtZWJvYXJkLCBpICsgKDEwICogaikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQbGF5ZXIuc2hpcExlbi5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UGxheWVyLnNoaXBMZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUdhbWVFdmVudHMoY3VycmVudFBsYXllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUdhbWVFdmVudHMoY3VycmVudFBsYXllci5vcHBvbmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJveFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcblxuICAgIGNvbnN0IHVwZGF0ZUJvYXJkID0gZnVuY3Rpb24oYm94LCBnYW1lYm9hcmQsIGkpIHtcbiAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoaSAvIDEwKTtcbiAgICAgICAgY29uc3QgeSA9IGkgJSAxMDtcbiAgICAgICAgaWYgKHR5cGVvZiBnYW1lYm9hcmQuYm9hcmRbeF1beV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBib3hbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsYWNrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChnYW1lYm9hcmQuYm9hcmRbeF1beV0gPT09ICdtaXNzJykge1xuICAgICAgICAgICAgYm94W2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmF5JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChnYW1lYm9hcmQuYm9hcmRbeF1beV0gPT09ICdoaXQnKSB7XG4gICAgICAgICAgICBib3hbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyAgZ2FtZSwgY3JlYXRlQm9hcmQsIGludGVyZmFjZVNldFVwLCB1cGRhdGVCb2FyZCwgY3JlYXRlR2FtZUV2ZW50cyB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQbGF5ZXIoZ2FtZWJvYXJkLCBpc0NvbXB1dGVyID0gZmFsc2UsIG9wcG9uZW50ID0gbnVsbCwgaXNUdXJuID0gZmFsc2UpIHtcbiAgICBcbiAgICBjb25zdCBzaGlwTGVuID0gWzIsIDMsIDMsIDQsIDVdOyBcblxuICAgIGNvbnN0IHNldE9wcG9uZW50ID0gZnVuY3Rpb24ocGxheWVyKSB7XG4gICAgICAgIHRoaXMub3Bwb25lbnQgPSBwbGF5ZXI7XG4gICAgfVxuXG5cbiAgICBjb25zdCByYW5kb21BdHRhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcbiAgICAgICAgd2hpbGUgKHRoaXMuaXNUdXJuKSB7XG4gICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQk9BUkRfTEVOR1RIKTtcbiAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9MRU5HVEgpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2soeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt4LCB5XVxuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjayA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgaWYgKHRoaXMub3Bwb25lbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hZGVNb3ZlID0gdGhpcy5vcHBvbmVudC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICAgICAgaWYgKG1hZGVNb3ZlKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVR1cm4oKTtcbiAgICAgICAgICAgIHRoaXMub3Bwb25lbnQuY2hhbmdlVHVybigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlVHVybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmlzVHVybiA9ICF0aGlzLmlzVHVybjtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHsgZ2FtZWJvYXJkLCBpc0NvbXB1dGVyLCBvcHBvbmVudCwgaXNUdXJuLCBzaGlwTGVuLCBcbiAgICAgICAgc2V0T3Bwb25lbnQsIGF0dGFjaywgcmFuZG9tQXR0YWNrLCBjaGFuZ2VUdXJuIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaGlwKGxlbmd0aCkge1xuICAgIGlmIChsZW5ndGggPiA1KSB7IFxuICAgICAgICB0aGlzLmxlbmd0aCA9IDU7XG4gICAgfVxuXG4gICAgaWYgKGxlbmd0aCA8IDIpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSAyO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBoaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3VuaygpKSB7XG4gICAgICAgICAgICB0aGlzLm51bUhpdHMgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5udW1IaXRzID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgbGVuZ3RoLCBudW1IaXRzOiAwLCBoaXQsIGlzU3VuayB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXZlbnRzKG15SW50ZXJmYWNlKSB7XG4gICAgY29uc3QgbmV3R2FtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctZ2FtZScpO1xuICAgIG5ld0dhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGdhbWVPdmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtb3ZlcicpO1xuICAgICAgICBnYW1lT3Zlci50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICBteUludGVyZmFjZS5pbnRlcmZhY2VTZXRVcCgpO1xuICAgIH0pXG59IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBcIm5vcm1hbGl6ZS5jc3NcIjtcbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5pbXBvcnQgSW50ZXJmYWNlIGZyb20gJy4vSW50ZXJmYWNlJztcbmltcG9ydCBldmVudHMgZnJvbSAnLi9ldmVudHMnXG5cblxuLy8gY29uc3QgbXlHYW1lID0gR2FtZSgpO1xuLy8gbXlHYW1lLmdhbWVTZXRVcCgpO1xuLy8gbXlHYW1lLnN0YXJ0R2FtZSgpO1xuXG5jb25zdCBteUdhbWUgPSBHYW1lKCk7XG5jb25zdCBteVVJID0gSW50ZXJmYWNlKG15R2FtZSk7XG5ldmVudHMobXlVSSk7XG5cbm15VUkuaW50ZXJmYWNlU2V0VXAoKTtcbi8vIG15VUkuY3JlYXRlQm9hcmQodHJ1ZSk7XG4vLyBteVVJLmNyZWF0ZUJvYXJkKGZhbHNlKTtcblxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbIlBsYXllciIsIkdhbWVib2FyZCIsIlNoaXAiLCJHYW1lIiwid2lubmVyIiwicGxheWVyIiwiY29tcHV0ZXIiLCJnYW1lU2V0VXAiLCJwbGF5ZXJCb2FyZCIsImNvbXB1dGVyQm9hcmQiLCJzZXRPcHBvbmVudCIsImlzVHVybiIsInNldENvbXB1dGVyU2hpcHMiLCJjdXJyZW50UGxheWVyIiwiU0hJUF9MRU5HVEhTIiwiQk9BUkRfTEVOR1RIIiwiZGlyZWN0aW9uIiwibGVuZ3RoIiwic2hpcERpciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIngiLCJ5IiwiZ2FtZWJvYXJkIiwicGxhY2VTaGlwIiwic2hpZnQiLCJpc0dhbWVPdmVyIiwiYWxsU2hpcHNTdW5rIiwic2hpcHMiLCJjcmVhdGVCb2FyZCIsImFycmF5IiwiQXJyYXkiLCJpIiwiaXNTcGFjZUZyZWUiLCJib2FyZCIsInVuZGVmaW5lZCIsInNoaXAiLCJ0ZW1wQm9hcmQiLCJjb29yZHMiLCJwdXNoIiwiZm9yRWFjaCIsIml0ZW0iLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwicmVkdWNlIiwiYWxsU2hpcHMiLCJjdXJyZW50U2hpcCIsImlzU3VuayIsIkludGVyZmFjZSIsImdhbWUiLCJ2ZXJ0QnV0dG9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhvcnpCdXR0b24iLCJpbnRlcmZhY2VTZXRVcCIsImNyZWF0ZUdhbWVFdmVudHMiLCJjb250YWluZXIiLCJib3giLCJpc0NvbXB1dGVyIiwiaW5uZXJIVE1MIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInVwZGF0ZUJvYXJkIiwib3Bwb25lbnQiLCJhdHRhY2siLCJwbGF5ZXJCb3giLCJmcm9tIiwiY2hpbGRyZW4iLCJjb21wdXRlckF0dGFjayIsInJhbmRvbUF0dGFjayIsImdhbWVPdmVyIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsInNoaXBMZW4iLCJqIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhcmd1bWVudHMiLCJtYWRlTW92ZSIsImNoYW5nZVR1cm4iLCJudW1IaXRzIiwiZXZlbnRzIiwibXlJbnRlcmZhY2UiLCJuZXdHYW1lQnV0dG9uIiwibXlHYW1lIiwibXlVSSJdLCJzb3VyY2VSb290IjoiIn0=