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
/* harmony import */ var _preGameBoxEventsCb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preGameBoxEventsCb */ "./src/preGameBoxEventsCb.js");
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
    this.createBoard(this.game.player, _preGameBoxEventsCb__WEBPACK_IMPORTED_MODULE_1__["default"]);
    this.createBoard(this.game.computer, _preGameBoxEventsCb__WEBPACK_IMPORTED_MODULE_1__["default"]);
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
    ///
    for (let i = 0; i < BOARD_LENGTH ** 2; i++) {
      box[i] = document.createElement('div');
      box[i].classList.add('board-box');
      if (!currentPlayer.isComputer) {
        this.updateBoard(box, currentPlayer.gameboard, i);
      }

      // eslint-disable-next-line no-loop-func
      box[i].addEventListener('click', () => {
        callback(this, currentPlayer, box, i);
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


function preGameBoxEventsCb(userInterface, currentPlayer, box, i) {
  const shipDir = 'horz';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUNqQixhQUFhLEVBQUVzRSwwREFBaUIsQ0FBQztNQUMzREMsYUFBYSxDQUFDdEQsV0FBVyxDQUFDakIsYUFBYSxDQUFDMEQsUUFBUSxFQUFFWSwwREFBaUIsQ0FBQztJQUN4RTtFQUNKO0FBQ0o7Ozs7Ozs7Ozs7O0FDdkJBOzs7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvR2FtZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL1NoaXAuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9pbkdhbWVCb3hFdmVudHNDYi5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvcHJlR2FtZUJveEV2ZW50c0NiLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvc3R5bGUuY3NzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vR2FtZWJvYXJkJztcbmltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbWUoKSB7XG4gICAgXG4gICAgY29uc3Qgd2lubmVyID0gbnVsbDtcbiAgICBjb25zdCBwbGF5ZXIgPSBudWxsO1xuICAgIGNvbnN0IGNvbXB1dGVyID0gbnVsbDtcblxuICAgIC8vIENyZWF0ZSBodW1hbiBhbmQgY29tcHV0ZXIgcGxheWVycyBhbmQgYm9hcmRzXG4gICAgY29uc3QgZ2FtZVNldFVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBQbGF5ZXIocGxheWVyQm9hcmQpO1xuICAgICAgICB0aGlzLmNvbXB1dGVyID0gUGxheWVyKGNvbXB1dGVyQm9hcmQsIHRydWUsIHRoaXMucGxheWVyKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc2V0T3Bwb25lbnQodGhpcy5jb21wdXRlcik7XG4gICAgICAgIHRoaXMucGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgICAgIHRoaXMuY29tcHV0ZXIuaXNUdXJuID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2lubmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZXRDb21wdXRlclNoaXBzKHRoaXMuY29tcHV0ZXIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNldENvbXB1dGVyU2hpcHMgPSBmdW5jdGlvbihjdXJyZW50UGxheWVyKSB7XG4gICAgICAgIGNvbnN0IFNISVBfTEVOR1RIUyA9IFsyLCAzLCAzLCA0LCA1XTsgXG4gICAgICAgIGNvbnN0IEJPQVJEX0xFTkdUSCA9IDEwO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBbJ2hvcnonLCAndmVydCddO1xuICAgICAgICB3aGlsZSAoU0hJUF9MRU5HVEhTLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBEaXIgPSBNYXRoLmZsb29yKDIgKiBNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9MRU5HVEgpO1xuICAgICAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX0xFTkdUSCk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKFNoaXAoU0hJUF9MRU5HVEhTWzBdKSwgZGlyZWN0aW9uW3NoaXBEaXJdLCB4LCB5KSkge1xuICAgICAgICAgICAgICAgIFNISVBfTEVOR1RIUy5zaGlmdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGlzR2FtZU92ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgICAgdGhpcy53aW5uZXIgPSB0aGlzLmNvbXB1dGVyO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvbXB1dGVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgICAgdGhpcy53aW5uZXIgPSB0aGlzLnBsYXllcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy53aW5uZXIgIT0gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiB7IHBsYXllciwgY29tcHV0ZXIsIHdpbm5lciwgZ2FtZVNldFVwLCBpc0dhbWVPdmVyLCBzZXRDb21wdXRlclNoaXBzIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gICAgXG4gICAgY29uc3Qgc2hpcHMgPSBbXTtcblxuICAgIGNvbnN0IGNyZWF0ZUJvYXJkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IEJPQVJEX0xFTkdUSCA9IDEwO1xuICAgICAgICBjb25zdCBhcnJheSA9IEFycmF5KDEwKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJPQVJEX0xFTkdUSDsgaSsrKSB7XG4gICAgICAgICAgICBhcnJheVtpXSA9IEFycmF5KDEwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNTcGFjZUZyZWUgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbihzaGlwLCBkaXJlY3Rpb24sIHgsIHkpIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGNvbnN0IHRlbXBCb2FyZCA9IHRoaXMuYm9hcmQ7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2hvcnonKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0geTsgaSA8IHkgKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBCT0FSRF9MRU5HVEggJiYgdGhpcy5pc1NwYWNlRnJlZSh4LCBpKSkge1xuICAgICAgICAgICAgICAgICAgICBjb29yZHMucHVzaChbeCwgaV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gZGVmYXVsdCB0byB2ZXJ0aWNhbCBvcmllbnRhdGlvblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpIDwgQk9BUkRfTEVOR1RIICYmIHRoaXMuaXNTcGFjZUZyZWUoaSwgeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29vcmRzLnB1c2goW2ksIHldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2hpcHMucHVzaChzaGlwKTtcbiAgICAgICAgY29vcmRzLmZvckVhY2goIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0ZW1wQm9hcmRbaXRlbVswXV1baXRlbVsxXV0gPSBzaGlwO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnbWlzcyc7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFt4XVt5XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XS5oaXQoKTtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnaGl0JztcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgYWxsU2hpcHNTdW5rID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzaGlwcy5yZWR1Y2UoKGFsbFNoaXBzLCBjdXJyZW50U2hpcCkgPT4gYWxsU2hpcHMgJiYgY3VycmVudFNoaXAuaXNTdW5rKCksIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiB7IGJvYXJkLCBwbGFjZVNoaXAsIGlzU3BhY2VGcmVlLCByZWNlaXZlQXR0YWNrLCBhbGxTaGlwc1N1bmsgfVxuXG59IiwiLy8gaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcbmltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5pbXBvcnQgcHJlR2FtZUJveEV2ZW50c0NiIGZyb20gJy4vcHJlR2FtZUJveEV2ZW50c0NiJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW50ZXJmYWNlKGdhbWUpIHtcbiAgICBsZXQgc2hpcERpciA9ICdob3J6JztcblxuICAgIGNvbnN0IHZlcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmVydCcpO1xuXG4gICAgdmVydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgc2hpcERpciA9ICd2ZXJ0JztcbiAgICB9KVxuXG4gICAgY29uc3QgaG9yekJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3J6Jyk7XG5cbiAgICBob3J6QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBzaGlwRGlyID0gJ2hvcnonO1xuICAgIH0pXG5cbiAgICBjb25zdCBpbnRlcmZhY2VTZXRVcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmdhbWUuZ2FtZVNldFVwKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQm9hcmQodGhpcy5nYW1lLnBsYXllciwgcHJlR2FtZUJveEV2ZW50c0NiKTtcbiAgICAgICAgdGhpcy5jcmVhdGVCb2FyZCh0aGlzLmdhbWUuY29tcHV0ZXIsIHByZUdhbWVCb3hFdmVudHNDYik7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlQm9hcmQgPSBmdW5jdGlvbihjdXJyZW50UGxheWVyLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBCT0FSRF9MRU5HVEggPSAxMDtcbiAgICAgICAgbGV0IGNvbnRhaW5lcjtcbiAgICAgICAgY29uc3QgYm94ID0gW107XG5cbiAgICAgICAgaWYgKCFjdXJyZW50UGxheWVyLmlzQ29tcHV0ZXIpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC5odW1hbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLmNvbXB1dGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuLy8vXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQk9BUkRfTEVOR1RIKioyOyBpKyspIHtcbiAgICAgICAgICAgIGJveFtpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYm94W2ldLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLWJveCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRQbGF5ZXIuaXNDb21wdXRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQm9hcmQoYm94LCBjdXJyZW50UGxheWVyLmdhbWVib2FyZCwgaSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb29wLWZ1bmNcbiAgICAgICAgICAgIGJveFtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLCBjdXJyZW50UGxheWVyLCBib3gsIGkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib3hbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlQm9hcmQgPSBmdW5jdGlvbihib3gsIGdhbWVib2FyZCwgaSkge1xuICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihpIC8gMTApO1xuICAgICAgICBjb25zdCB5ID0gaSAlIDEwO1xuICAgICAgICBpZiAodHlwZW9mIGdhbWVib2FyZC5ib2FyZFt4XVt5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGJveFtpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmxhY2snO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGdhbWVib2FyZC5ib2FyZFt4XVt5XSA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICBib3hbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyYXknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGdhbWVib2FyZC5ib2FyZFt4XVt5XSA9PT0gJ2hpdCcpIHtcbiAgICAgICAgICAgIGJveFtpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7ICBnYW1lLCBjcmVhdGVCb2FyZCwgaW50ZXJmYWNlU2V0VXAsIHVwZGF0ZUJvYXJkIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBsYXllcihnYW1lYm9hcmQsIGlzQ29tcHV0ZXIgPSBmYWxzZSwgb3Bwb25lbnQgPSBudWxsLCBpc1R1cm4gPSBmYWxzZSkge1xuICAgIFxuICAgIGNvbnN0IHNoaXBMZW4gPSBbMiwgMywgMywgNCwgNV07IFxuXG4gICAgY29uc3Qgc2V0T3Bwb25lbnQgPSBmdW5jdGlvbihwbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5vcHBvbmVudCA9IHBsYXllcjtcbiAgICB9XG5cblxuICAgIGNvbnN0IHJhbmRvbUF0dGFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBCT0FSRF9MRU5HVEggPSAxMDtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGxldCB5O1xuICAgICAgICB3aGlsZSAodGhpcy5pc1R1cm4pIHtcbiAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9MRU5HVEgpO1xuICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX0xFTkdUSCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjayh4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3gsIHldXG4gICAgfVxuXG4gICAgY29uc3QgYXR0YWNrID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICBpZiAodGhpcy5vcHBvbmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWFkZU1vdmUgPSB0aGlzLm9wcG9uZW50LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgICAgICBpZiAobWFkZU1vdmUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVHVybigpO1xuICAgICAgICAgICAgdGhpcy5vcHBvbmVudC5jaGFuZ2VUdXJuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VUdXJuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuaXNUdXJuID0gIXRoaXMuaXNUdXJuO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4geyBnYW1lYm9hcmQsIGlzQ29tcHV0ZXIsIG9wcG9uZW50LCBpc1R1cm4sIHNoaXBMZW4sIFxuICAgICAgICBzZXRPcHBvbmVudCwgYXR0YWNrLCByYW5kb21BdHRhY2ssIGNoYW5nZVR1cm4gfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNoaXAobGVuZ3RoKSB7XG4gICAgaWYgKGxlbmd0aCA+IDUpIHsgXG4gICAgICAgIHRoaXMubGVuZ3RoID0gNTtcbiAgICB9XG5cbiAgICBpZiAobGVuZ3RoIDwgMikge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDI7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGhpdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIHRoaXMubnVtSGl0cyArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm51bUhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBsZW5ndGgsIG51bUhpdHM6IDAsIGhpdCwgaXNTdW5rIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBldmVudHMobXlJbnRlcmZhY2UpIHtcbiAgICBjb25zdCBuZXdHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1nYW1lJyk7XG4gICAgbmV3R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FtZU92ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1vdmVyJyk7XG4gICAgICAgIGdhbWVPdmVyLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIG15SW50ZXJmYWNlLmludGVyZmFjZVNldFVwKCk7XG4gICAgfSlcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbkdhbWVCb3hFdmVudHNDYih1c2VySW50ZXJmYWNlLCBjdXJyZW50UGxheWVyLCBib3gsIGkpIHtcbiAgICBpZiAoY3VycmVudFBsYXllci5pc1R1cm4gfHwgdXNlckludGVyZmFjZS5nYW1lLndpbm5lciAhPSBudWxsKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihpIC8gMTApO1xuICAgIGNvbnN0IHkgPSBpICUgMTA7XG4gICAgY3VycmVudFBsYXllci5vcHBvbmVudC5hdHRhY2soeCwgeSk7XG4gICAgdXNlckludGVyZmFjZS51cGRhdGVCb2FyZChib3gsIGN1cnJlbnRQbGF5ZXIuZ2FtZWJvYXJkLCBpKTtcbiAgICBib3hbaV0uY2xhc3NMaXN0LmFkZCgnbm8taG92ZXInKTtcbiAgICBpZiAoY3VycmVudFBsYXllci5pc0NvbXB1dGVyKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckJveCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLmh1bWFuJykuY2hpbGRyZW4pO1xuICAgICAgICBjb25zdCBjb21wdXRlckF0dGFjayA9IGN1cnJlbnRQbGF5ZXIucmFuZG9tQXR0YWNrKCk7XG4gICAgICAgIHVzZXJJbnRlcmZhY2UudXBkYXRlQm9hcmQocGxheWVyQm94LCBjdXJyZW50UGxheWVyLm9wcG9uZW50LmdhbWVib2FyZCwgY29tcHV0ZXJBdHRhY2tbMF0gKiAxMCArIGNvbXB1dGVyQXR0YWNrWzFdKTtcbiAgICB9XG4gICAgaWYgKHVzZXJJbnRlcmZhY2UuZ2FtZS5pc0dhbWVPdmVyKCkpIHtcbiAgICAgICAgY29uc3QgZ2FtZU92ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1vdmVyJyk7XG4gICAgICAgIGlmICh1c2VySW50ZXJmYWNlLmdhbWUud2lubmVyID09PSB1c2VySW50ZXJmYWNlLmdhbWUucGxheWVyKSB7XG4gICAgICAgICAgICBnYW1lT3Zlci50ZXh0Q29udGVudCA9IGBMZWZ0IGJvYXJkIHdpbnMhIFByZXNzIFwiTmV3IEdhbWVcIiB0byBwbGF5IGFnYWluIWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lT3Zlci50ZXh0Q29udGVudCA9IGBSaWdodCBib2FyZCB3aW5zISBQcmVzcyBcIk5ldyBHYW1lXCIgdG8gcGxheSBhZ2FpbiFgO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgXCJub3JtYWxpemUuY3NzXCI7XG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnO1xuaW1wb3J0IEludGVyZmFjZSBmcm9tICcuL0ludGVyZmFjZSc7XG5pbXBvcnQgZXZlbnRzIGZyb20gJy4vZXZlbnRzJ1xuXG5cbi8vIGNvbnN0IG15R2FtZSA9IEdhbWUoKTtcbi8vIG15R2FtZS5nYW1lU2V0VXAoKTtcbi8vIG15R2FtZS5zdGFydEdhbWUoKTtcblxuY29uc3QgbXlHYW1lID0gR2FtZSgpO1xuY29uc3QgbXlVSSA9IEludGVyZmFjZShteUdhbWUpO1xuZXZlbnRzKG15VUkpO1xuXG5teVVJLmludGVyZmFjZVNldFVwKCk7XG4vLyBteVVJLmNyZWF0ZUJvYXJkKHRydWUpO1xuLy8gbXlVSS5jcmVhdGVCb2FyZChmYWxzZSk7XG5cbiIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5pbXBvcnQgaW5HYW1lQm94RXZlbnRzQ2IgZnJvbSAnLi9pbkdhbWVCb3hFdmVudHNDYic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZUdhbWVCb3hFdmVudHNDYih1c2VySW50ZXJmYWNlLCBjdXJyZW50UGxheWVyLCBib3gsIGkpIHtcbiAgICBjb25zdCBzaGlwRGlyID0gJ2hvcnonO1xuICAgIGlmICghY3VycmVudFBsYXllci5pc0NvbXB1dGVyKSB7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKGkgLyAxMCk7XG4gICAgICAgIGNvbnN0IHkgPSBpICUgMTA7XG4gICAgICAgIGlmIChjdXJyZW50UGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoU2hpcChjdXJyZW50UGxheWVyLnNoaXBMZW5bMF0pLCBzaGlwRGlyLCB4LCB5KSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjdXJyZW50UGxheWVyLnNoaXBMZW5bMF07IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChzaGlwRGlyID09PSAnaG9yeicpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlckludGVyZmFjZS51cGRhdGVCb2FyZChib3gsIGN1cnJlbnRQbGF5ZXIuZ2FtZWJvYXJkLCBpK2opO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJbnRlcmZhY2UudXBkYXRlQm9hcmQoYm94LCBjdXJyZW50UGxheWVyLmdhbWVib2FyZCwgaSArICgxMCAqIGopKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50UGxheWVyLnNoaXBMZW4uc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudFBsYXllci5zaGlwTGVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdXNlckludGVyZmFjZS5jcmVhdGVCb2FyZChjdXJyZW50UGxheWVyLCBpbkdhbWVCb3hFdmVudHNDYik7XG4gICAgICAgICAgICB1c2VySW50ZXJmYWNlLmNyZWF0ZUJvYXJkKGN1cnJlbnRQbGF5ZXIub3Bwb25lbnQsIGluR2FtZUJveEV2ZW50c0NiKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiUGxheWVyIiwiR2FtZWJvYXJkIiwiU2hpcCIsIkdhbWUiLCJ3aW5uZXIiLCJwbGF5ZXIiLCJjb21wdXRlciIsImdhbWVTZXRVcCIsInBsYXllckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsInNldE9wcG9uZW50IiwiaXNUdXJuIiwic2V0Q29tcHV0ZXJTaGlwcyIsImN1cnJlbnRQbGF5ZXIiLCJTSElQX0xFTkdUSFMiLCJCT0FSRF9MRU5HVEgiLCJkaXJlY3Rpb24iLCJsZW5ndGgiLCJzaGlwRGlyIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwieCIsInkiLCJnYW1lYm9hcmQiLCJwbGFjZVNoaXAiLCJzaGlmdCIsImlzR2FtZU92ZXIiLCJhbGxTaGlwc1N1bmsiLCJzaGlwcyIsImNyZWF0ZUJvYXJkIiwiYXJyYXkiLCJBcnJheSIsImkiLCJpc1NwYWNlRnJlZSIsImJvYXJkIiwidW5kZWZpbmVkIiwic2hpcCIsInRlbXBCb2FyZCIsImNvb3JkcyIsInB1c2giLCJmb3JFYWNoIiwiaXRlbSIsInJlY2VpdmVBdHRhY2siLCJoaXQiLCJyZWR1Y2UiLCJhbGxTaGlwcyIsImN1cnJlbnRTaGlwIiwiaXNTdW5rIiwicHJlR2FtZUJveEV2ZW50c0NiIiwiSW50ZXJmYWNlIiwiZ2FtZSIsInZlcnRCdXR0b24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiaG9yekJ1dHRvbiIsImludGVyZmFjZVNldFVwIiwiY2FsbGJhY2siLCJjb250YWluZXIiLCJib3giLCJpc0NvbXB1dGVyIiwiaW5uZXJIVE1MIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInVwZGF0ZUJvYXJkIiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImFyZ3VtZW50cyIsIm9wcG9uZW50Iiwic2hpcExlbiIsInJhbmRvbUF0dGFjayIsImF0dGFjayIsIm1hZGVNb3ZlIiwiY2hhbmdlVHVybiIsIm51bUhpdHMiLCJldmVudHMiLCJteUludGVyZmFjZSIsIm5ld0dhbWVCdXR0b24iLCJnYW1lT3ZlciIsInRleHRDb250ZW50IiwiaW5HYW1lQm94RXZlbnRzQ2IiLCJ1c2VySW50ZXJmYWNlIiwicGxheWVyQm94IiwiZnJvbSIsImNoaWxkcmVuIiwiY29tcHV0ZXJBdHRhY2siLCJteUdhbWUiLCJteVVJIiwiaiJdLCJzb3VyY2VSb290IjoiIn0=