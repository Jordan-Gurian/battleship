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

    // Place ships, hardcoded for now
    const SHIP_LENGTHS = [2, 3, 3, 4, 5];
    const playerCoords = [[0, 0], [2, 2], [3, 3], [4, 4], [6, 6]];
    for (let i = 0; i < SHIP_LENGTHS.length; i++) {
      this.player.gameboard.placeShip((0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(SHIP_LENGTHS[i]), 'horz', playerCoords[i][0], playerCoords[i][1]);
      this.computer.gameboard.placeShip((0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(SHIP_LENGTHS[i]), 'horz', playerCoords[i][0], playerCoords[i][1]);
    }
  };
  const startGame = function () {
    this.player.changeTurn();
    while (!this.player.gameboard.allShipsSunk() && !this.computer.gameboard.allShipsSunk()) {
      if (this.player.isTurn) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        this.player.attack(x, y);
      } else {
        this.computer.randomAttack();
      }
    }
    this.declareWinner();
  };
  const declareWinner = function () {
    if (this.player.gameboard.allShipsSunk()) {
      this.winner = this.computer;
    } else {
      this.winner = this.player;
    }
  };
  return {
    player,
    computer,
    winner,
    gameSetUp,
    startGame,
    declareWinner
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
      return;
    }
    if (direction === 'horz') {
      for (let i = y; i < y + ship.length; i++) {
        if (i < BOARD_LENGTH && this.isSpaceFree(x, i)) {
          coords.push([x, i]);
        } else {
          return;
        }
      }
    } else {
      // default to vertical orientation
      for (let i = x; i < x + ship.length; i++) {
        if (i < BOARD_LENGTH && this.isSpaceFree(i, y)) {
          coords.push([i, y]);
        } else {
          return;
        }
      }
    }
    ships.push(ship);
    coords.forEach(item => {
      tempBoard[item[0]][item[1]] = ship;
    });
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
function Interface() {
  const createBoard = function (isHuman) {
    const BOARD_LENGTH = 10;
    let container;
    if (isHuman) {
      container = document.querySelector('.board.human');
    } else {
      container = document.querySelector('.board.computer');
    }
    let box;
    for (let i = 0; i < BOARD_LENGTH ** 2; i++) {
      box = document.createElement('div');
      box.classList.add('board-box');
      // will need to add event listener to track attacks
      container.appendChild(box);
    }
  };
  return {
    createBoard
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





// const myGame = Game();
// myGame.gameSetUp();
// myGame.startGame();

const myUI = (0,_Interface__WEBPACK_IMPORTED_MODULE_3__["default"])();
myUI.createBoard(true);
myUI.createBoard(false);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7O0FDbkNlLFNBQVNoQixJQUFJQSxDQUFDWSxNQUFNLEVBQUU7RUFDakMsSUFBSUEsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUNaLElBQUksQ0FBQ0EsTUFBTSxHQUFHLENBQUM7RUFDbkI7RUFFQSxJQUFJQSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQ1osSUFBSSxDQUFDQSxNQUFNLEdBQUcsQ0FBQztFQUNuQjtFQUVBLE1BQU0rQixHQUFHLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUNJLE1BQU0sQ0FBQyxDQUFDLEVBQUU7TUFDaEIsSUFBSSxDQUFDZSxPQUFPLElBQUksQ0FBQztJQUNyQjtFQUNKLENBQUM7RUFFRCxNQUFNZixNQUFNLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3RCLElBQUksSUFBSSxDQUFDZSxPQUFPLElBQUksSUFBSSxDQUFDbEQsTUFBTSxFQUFFO01BQzdCLE9BQU8sSUFBSTtJQUNmO0lBQ0EsT0FBTyxLQUFLO0VBQ2hCLENBQUM7RUFFRCxPQUFPO0lBQUVBLE1BQU07SUFBRWtELE9BQU8sRUFBRSxDQUFDO0lBQUVuQixHQUFHO0lBQUVJO0VBQU8sQ0FBQztBQUM5Qzs7Ozs7Ozs7Ozs7Ozs7O0FDdkJxQjtBQUNFO0FBQ0c7QUFDVTs7QUFHcEM7QUFDQTtBQUNBOztBQUVBLE1BQU1nQixJQUFJLEdBQUdmLHNEQUFTLENBQUMsQ0FBQztBQUV4QmUsSUFBSSxDQUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQztBQUN0Qm1DLElBQUksQ0FBQ25DLFdBQVcsQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7Ozs7O0FDYnZCOzs7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvR2FtZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL1NoaXAuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3N0eWxlLmNzcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJ1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL0dhbWVib2FyZCc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lKCkge1xuICAgIFxuICAgIGNvbnN0IHdpbm5lciA9IG51bGw7XG4gICAgY29uc3QgcGxheWVyID0gbnVsbDtcbiAgICBjb25zdCBjb21wdXRlciA9IG51bGw7XG5cbiAgICAvLyBDcmVhdGUgaHVtYW4gYW5kIGNvbXB1dGVyIHBsYXllcnMgYW5kIGJvYXJkc1xuICAgIGNvbnN0IGdhbWVTZXRVcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuICAgICAgICBjb25zdCBjb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKCk7XG4gICAgICAgIHRoaXMucGxheWVyID0gUGxheWVyKHBsYXllckJvYXJkKTtcbiAgICAgICAgdGhpcy5jb21wdXRlciA9IFBsYXllcihjb21wdXRlckJvYXJkLCB0cnVlLCB0aGlzLnBsYXllcik7XG4gICAgICAgIHRoaXMucGxheWVyLnNldE9wcG9uZW50KHRoaXMuY29tcHV0ZXIpO1xuXG4gICAgICAgIC8vIFBsYWNlIHNoaXBzLCBoYXJkY29kZWQgZm9yIG5vd1xuICAgICAgICBjb25zdCBTSElQX0xFTkdUSFMgPSBbMiwgMywgMywgNCwgNV07XG4gICAgICAgIGNvbnN0IHBsYXllckNvb3JkcyA9W1swLDBdLCBbMiwyXSwgWzMsM10sIFs0LDRdLCBbNiw2XV07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTSElQX0xFTkdUSFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoU2hpcChTSElQX0xFTkdUSFNbaV0pLCAnaG9yeicsIHBsYXllckNvb3Jkc1tpXVswXSwgcGxheWVyQ29vcmRzW2ldWzFdKTtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChTaGlwKFNISVBfTEVOR1RIU1tpXSksICdob3J6JywgcGxheWVyQ29vcmRzW2ldWzBdLCBwbGF5ZXJDb29yZHNbaV1bMV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgXG4gICAgY29uc3Qgc3RhcnRHYW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICAgICAgd2hpbGUgKCF0aGlzLnBsYXllci5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkgJiYgIXRoaXMuY29tcHV0ZXIuZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIuaXNUdXJuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmF0dGFjayh4LCB5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wdXRlci5yYW5kb21BdHRhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlY2xhcmVXaW5uZXIoKTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWNsYXJlV2lubmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnBsYXllci5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICAgIHRoaXMud2lubmVyID0gdGhpcy5jb21wdXRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud2lubmVyID0gdGhpcy5wbGF5ZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyBwbGF5ZXIsIGNvbXB1dGVyLCB3aW5uZXIsIGdhbWVTZXRVcCwgc3RhcnRHYW1lLCBkZWNsYXJlV2lubmVyIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gICAgXG4gICAgY29uc3Qgc2hpcHMgPSBbXTtcblxuICAgIGNvbnN0IGNyZWF0ZUJvYXJkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IEJPQVJEX0xFTkdUSCA9IDEwO1xuICAgICAgICBjb25zdCBhcnJheSA9IEFycmF5KDEwKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJPQVJEX0xFTkdUSDsgaSsrKSB7XG4gICAgICAgICAgICBhcnJheVtpXSA9IEFycmF5KDEwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNTcGFjZUZyZWUgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbihzaGlwLCBkaXJlY3Rpb24sIHgsIHkpIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGNvbnN0IHRlbXBCb2FyZCA9IHRoaXMuYm9hcmQ7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDApIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2hvcnonKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0geTsgaSA8IHkgKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBCT0FSRF9MRU5HVEggJiYgdGhpcy5pc1NwYWNlRnJlZSh4LCBpKSkge1xuICAgICAgICAgICAgICAgICAgICBjb29yZHMucHVzaChbeCwgaV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7IC8vIGRlZmF1bHQgdG8gdmVydGljYWwgb3JpZW50YXRpb25cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB4OyBpIDwgeCArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IEJPQVJEX0xFTkdUSCAmJiB0aGlzLmlzU3BhY2VGcmVlKGksIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvb3Jkcy5wdXNoKFtpLCB5XSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzaGlwcy5wdXNoKHNoaXApO1xuICAgICAgICBjb29yZHMuZm9yRWFjaCggKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRlbXBCb2FyZFtpdGVtWzBdXVtpdGVtWzFdXSA9IHNoaXA7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbeF1beV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9ICdtaXNzJztcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3hdW3ldID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpO1xuICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9ICdoaXQnO1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBhbGxTaGlwc1N1bmsgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNoaXBzLnJlZHVjZSgoYWxsU2hpcHMsIGN1cnJlbnRTaGlwKSA9PiBhbGxTaGlwcyAmJiBjdXJyZW50U2hpcC5pc1N1bmsoKSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYm9hcmQsIHBsYWNlU2hpcCwgaXNTcGFjZUZyZWUsIHJlY2VpdmVBdHRhY2ssIGFsbFNoaXBzU3VuayB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJbnRlcmZhY2UoKSB7XG5cbiAgICBjb25zdCBjcmVhdGVCb2FyZCA9IGZ1bmN0aW9uKGlzSHVtYW4pIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGxldCBjb250YWluZXI7XG4gICAgICAgIGlmIChpc0h1bWFuKSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQuaHVtYW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC5jb21wdXRlcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJveDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBCT0FSRF9MRU5HVEgqKjI7IGkrKykge1xuICAgICAgICAgICAgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnYm9hcmQtYm94Jyk7XG4gICAgICAgICAgICAvLyB3aWxsIG5lZWQgdG8gYWRkIGV2ZW50IGxpc3RlbmVyIHRvIHRyYWNrIGF0dGFja3NcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib3gpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgY3JlYXRlQm9hcmQgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBsYXllcihnYW1lYm9hcmQsIGlzQ29tcHV0ZXIgPSBmYWxzZSwgb3Bwb25lbnQgPSBudWxsLCBpc1R1cm4gPSBmYWxzZSkge1xuICAgIFxuICAgIGNvbnN0IHNldE9wcG9uZW50ID0gZnVuY3Rpb24ocGxheWVyKSB7XG4gICAgICAgIHRoaXMub3Bwb25lbnQgPSBwbGF5ZXI7XG4gICAgfVxuXG5cbiAgICBjb25zdCByYW5kb21BdHRhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcbiAgICAgICAgd2hpbGUgKHRoaXMuaXNUdXJuKSB7XG4gICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQk9BUkRfTEVOR1RIKTtcbiAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9MRU5HVEgpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2soeCwgeSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIGlmICh0aGlzLm9wcG9uZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtYWRlTW92ZSA9IHRoaXMub3Bwb25lbnQuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgICAgIGlmIChtYWRlTW92ZSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUdXJuKCk7XG4gICAgICAgICAgICB0aGlzLm9wcG9uZW50LmNoYW5nZVR1cm4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZVR1cm4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5pc1R1cm4gPSAhdGhpcy5pc1R1cm47XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7IGdhbWVib2FyZCwgaXNDb21wdXRlciwgb3Bwb25lbnQsIGlzVHVybiwgXG4gICAgICAgIHNldE9wcG9uZW50LCBhdHRhY2ssIHJhbmRvbUF0dGFjaywgY2hhbmdlVHVybiB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2hpcChsZW5ndGgpIHtcbiAgICBpZiAobGVuZ3RoID4gNSkgeyBcbiAgICAgICAgdGhpcy5sZW5ndGggPSA1O1xuICAgIH1cblxuICAgIGlmIChsZW5ndGggPCAyKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gMjtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgaGl0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N1bmsoKSkge1xuICAgICAgICAgICAgdGhpcy5udW1IaXRzICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtSGl0cyA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB7IGxlbmd0aCwgbnVtSGl0czogMCwgaGl0LCBpc1N1bmsgfVxufSIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgXCJub3JtYWxpemUuY3NzXCI7XG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnO1xuaW1wb3J0IEludGVyZmFjZSBmcm9tICcuL0ludGVyZmFjZSc7XG5cblxuLy8gY29uc3QgbXlHYW1lID0gR2FtZSgpO1xuLy8gbXlHYW1lLmdhbWVTZXRVcCgpO1xuLy8gbXlHYW1lLnN0YXJ0R2FtZSgpO1xuXG5jb25zdCBteVVJID0gSW50ZXJmYWNlKCk7XG5cbm15VUkuY3JlYXRlQm9hcmQodHJ1ZSk7XG5teVVJLmNyZWF0ZUJvYXJkKGZhbHNlKTtcblxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbIlBsYXllciIsIkdhbWVib2FyZCIsIlNoaXAiLCJHYW1lIiwid2lubmVyIiwicGxheWVyIiwiY29tcHV0ZXIiLCJnYW1lU2V0VXAiLCJwbGF5ZXJCb2FyZCIsImNvbXB1dGVyQm9hcmQiLCJzZXRPcHBvbmVudCIsIlNISVBfTEVOR1RIUyIsInBsYXllckNvb3JkcyIsImkiLCJsZW5ndGgiLCJnYW1lYm9hcmQiLCJwbGFjZVNoaXAiLCJzdGFydEdhbWUiLCJjaGFuZ2VUdXJuIiwiYWxsU2hpcHNTdW5rIiwiaXNUdXJuIiwieCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInkiLCJhdHRhY2siLCJyYW5kb21BdHRhY2siLCJkZWNsYXJlV2lubmVyIiwic2hpcHMiLCJjcmVhdGVCb2FyZCIsIkJPQVJEX0xFTkdUSCIsImFycmF5IiwiQXJyYXkiLCJpc1NwYWNlRnJlZSIsImJvYXJkIiwidW5kZWZpbmVkIiwic2hpcCIsImRpcmVjdGlvbiIsInRlbXBCb2FyZCIsImNvb3JkcyIsInB1c2giLCJmb3JFYWNoIiwiaXRlbSIsInJlY2VpdmVBdHRhY2siLCJoaXQiLCJyZWR1Y2UiLCJhbGxTaGlwcyIsImN1cnJlbnRTaGlwIiwiaXNTdW5rIiwiSW50ZXJmYWNlIiwiaXNIdW1hbiIsImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJveCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsImlzQ29tcHV0ZXIiLCJhcmd1bWVudHMiLCJvcHBvbmVudCIsIm1hZGVNb3ZlIiwibnVtSGl0cyIsIm15VUkiXSwic291cmNlUm9vdCI6IiJ9