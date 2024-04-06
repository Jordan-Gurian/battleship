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
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ "./src/Game.js");

function Interface() {
  // const box = [[[], [], [], [], [] , [], [], [], [], []],
  //             [[], [], [], [], [] , [], [], [], [], []]];

  const interfaceSetUp = function () {
    const myGame = (0,_Game__WEBPACK_IMPORTED_MODULE_0__["default"])();
    myGame.gameSetUp();
    this.createBoard(true, myGame.player.gameboard.board);
    this.createBoard(false, myGame.computer.gameboard.board);
    // myGame.startGame();
    const newGameButton = document.querySelector('.new-game');
    newGameButton.addEventListener('click', () => {
      myGame.gameSetUp();
      this.createBoard(true);
      this.createBoard(false);
    });
  };
  const createBoard = function (isHuman, board) {
    const BOARD_LENGTH = 10;
    let container;
    const box = [[], [], [], [], [], [], [], [], [], []];
    if (isHuman) {
      container = document.querySelector('.board.human');
    } else {
      container = document.querySelector('.board.computer');
    }
    container.innerHTML = '';
    for (let i = 0; i < BOARD_LENGTH; i++) {
      for (let j = 0; j < BOARD_LENGTH; j++) {
        box[i][j] = document.createElement('div');
        box[i][j].classList.add('board-box');
        // this.updateBoard(box[i][j], board, i, j);
        box[i][j].addEventListener('click', () => {
          this.updateBoard(box, board, i, j);
        });
        // will need to add event listener to track attacks
        container.appendChild(box[i][j]);
      }
    }
  };
  const updateBoard = function (box, board, x, y) {
    if (typeof board[x][y] === 'object') {
      box[x][y].textContent = 'S';
    } else if (board[x][y] === undefined) {
      box[x][y].textContent = 'M';
    } else if (board[x][y] === 'hit') {
      box[x][y].textContent = 'H';
    }
  };
  return {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQ0ksTUFBTSxDQUFDLENBQUMsRUFBRTtNQUNoQixJQUFJLENBQUN1QixPQUFPLElBQUksQ0FBQztJQUNyQjtFQUNKLENBQUM7RUFFRCxNQUFNdkIsTUFBTSxHQUFHLFNBQUFBLENBQUEsRUFBVztJQUN0QixJQUFJLElBQUksQ0FBQ3VCLE9BQU8sSUFBSSxJQUFJLENBQUMxRCxNQUFNLEVBQUU7TUFDN0IsT0FBTyxJQUFJO0lBQ2Y7SUFDQSxPQUFPLEtBQUs7RUFDaEIsQ0FBQztFQUVELE9BQU87SUFBRUEsTUFBTTtJQUFFMEQsT0FBTyxFQUFFLENBQUM7SUFBRTNCLEdBQUc7SUFBRUk7RUFBTyxDQUFDO0FBQzlDOzs7Ozs7Ozs7Ozs7Ozs7QUN2QnFCO0FBQ0U7QUFDRztBQUNVOztBQUdwQztBQUNBO0FBQ0E7O0FBRUEsTUFBTXdCLElBQUksR0FBR3ZCLHNEQUFTLENBQUMsQ0FBQztBQUV4QnVCLElBQUksQ0FBQ3RCLGNBQWMsQ0FBQyxDQUFDO0FBQ3JCO0FBQ0E7Ozs7Ozs7Ozs7O0FDZEE7Ozs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9HYW1lLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvSW50ZXJmYWNlLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvc3R5bGUuY3NzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vR2FtZWJvYXJkJztcbmltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbWUoKSB7XG4gICAgXG4gICAgY29uc3Qgd2lubmVyID0gbnVsbDtcbiAgICBjb25zdCBwbGF5ZXIgPSBudWxsO1xuICAgIGNvbnN0IGNvbXB1dGVyID0gbnVsbDtcblxuICAgIC8vIENyZWF0ZSBodW1hbiBhbmQgY29tcHV0ZXIgcGxheWVycyBhbmQgYm9hcmRzXG4gICAgY29uc3QgZ2FtZVNldFVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBQbGF5ZXIocGxheWVyQm9hcmQpO1xuICAgICAgICB0aGlzLmNvbXB1dGVyID0gUGxheWVyKGNvbXB1dGVyQm9hcmQsIHRydWUsIHRoaXMucGxheWVyKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc2V0T3Bwb25lbnQodGhpcy5jb21wdXRlcik7XG5cbiAgICAgICAgLy8gUGxhY2Ugc2hpcHMsIGhhcmRjb2RlZCBmb3Igbm93XG4gICAgICAgIGNvbnN0IFNISVBfTEVOR1RIUyA9IFsyLCAzLCAzLCA0LCA1XTtcbiAgICAgICAgY29uc3QgcGxheWVyQ29vcmRzID1bWzAsMF0sIFsyLDJdLCBbMywzXSwgWzQsNF0sIFs2LDZdXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFNISVBfTEVOR1RIUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChTaGlwKFNISVBfTEVOR1RIU1tpXSksICdob3J6JywgcGxheWVyQ29vcmRzW2ldWzBdLCBwbGF5ZXJDb29yZHNbaV1bMV0pO1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwKFNoaXAoU0hJUF9MRU5HVEhTW2ldKSwgJ2hvcnonLCBwbGF5ZXJDb29yZHNbaV1bMF0sIHBsYXllckNvb3Jkc1tpXVsxXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcbiAgICBjb25zdCBzdGFydEdhbWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuY2hhbmdlVHVybigpO1xuICAgICAgICB3aGlsZSAoIXRoaXMucGxheWVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSAmJiAhdGhpcy5jb21wdXRlci5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5pc1R1cm4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYXR0YWNrKHgsIHkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXB1dGVyLnJhbmRvbUF0dGFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVjbGFyZVdpbm5lcigpO1xuICAgIH1cblxuICAgIGNvbnN0IGRlY2xhcmVXaW5uZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgICAgdGhpcy53aW5uZXIgPSB0aGlzLmNvbXB1dGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53aW5uZXIgPSB0aGlzLnBsYXllcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IHBsYXllciwgY29tcHV0ZXIsIHdpbm5lciwgZ2FtZVNldFVwLCBzdGFydEdhbWUsIGRlY2xhcmVXaW5uZXIgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcbiAgICBcbiAgICBjb25zdCBzaGlwcyA9IFtdO1xuXG4gICAgY29uc3QgY3JlYXRlQm9hcmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gQXJyYXkoMTApO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQk9BUkRfTEVOR1RIOyBpKyspIHtcbiAgICAgICAgICAgIGFycmF5W2ldID0gQXJyYXkoMTApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG5cbiAgICBjb25zdCBpc1NwYWNlRnJlZSA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbeF1beV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcblxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uKHNoaXAsIGRpcmVjdGlvbiwgeCwgeSkge1xuICAgICAgICBjb25zdCBCT0FSRF9MRU5HVEggPSAxMDtcbiAgICAgICAgY29uc3QgdGVtcEJvYXJkID0gdGhpcy5ib2FyZDtcbiAgICAgICAgY29uc3QgY29vcmRzID0gW107XG4gICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnaG9yeicpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB5OyBpIDwgeSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IEJPQVJEX0xFTkdUSCAmJiB0aGlzLmlzU3BhY2VGcmVlKHgsIGkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvb3Jkcy5wdXNoKFt4LCBpXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gZGVmYXVsdCB0byB2ZXJ0aWNhbCBvcmllbnRhdGlvblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpIDwgQk9BUkRfTEVOR1RIICYmIHRoaXMuaXNTcGFjZUZyZWUoaSwgeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29vcmRzLnB1c2goW2ksIHldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgIGNvb3Jkcy5mb3JFYWNoKCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGVtcEJvYXJkW2l0ZW1bMF1dW2l0ZW1bMV1dID0gc2hpcDtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt4XVt5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ21pc3MnO1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbeF1beV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0KCk7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ2hpdCc7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2hpcHMucmVkdWNlKChhbGxTaGlwcywgY3VycmVudFNoaXApID0+IGFsbFNoaXBzICYmIGN1cnJlbnRTaGlwLmlzU3VuaygpLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBib2FyZCwgcGxhY2VTaGlwLCBpc1NwYWNlRnJlZSwgcmVjZWl2ZUF0dGFjaywgYWxsU2hpcHNTdW5rIH1cblxufSIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEludGVyZmFjZSgpIHtcblxuICAgIC8vIGNvbnN0IGJveCA9IFtbW10sIFtdLCBbXSwgW10sIFtdICwgW10sIFtdLCBbXSwgW10sIFtdXSxcbiAgICAvLyAgICAgICAgICAgICBbW10sIFtdLCBbXSwgW10sIFtdICwgW10sIFtdLCBbXSwgW10sIFtdXV07XG5cbiAgICBjb25zdCBpbnRlcmZhY2VTZXRVcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBteUdhbWUgPSBHYW1lKCk7XG4gICAgICAgIG15R2FtZS5nYW1lU2V0VXAoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVCb2FyZCh0cnVlLCBteUdhbWUucGxheWVyLmdhbWVib2FyZC5ib2FyZCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQm9hcmQoZmFsc2UsIG15R2FtZS5jb21wdXRlci5nYW1lYm9hcmQuYm9hcmQpO1xuICAgICAgICAvLyBteUdhbWUuc3RhcnRHYW1lKCk7XG4gICAgICAgIGNvbnN0IG5ld0dhbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWdhbWUnKTtcbiAgICAgICAgbmV3R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG15R2FtZS5nYW1lU2V0VXAoKVxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCb2FyZCh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQm9hcmQoZmFsc2UpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZUJvYXJkID0gZnVuY3Rpb24oaXNIdW1hbiwgYm9hcmQpIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGxldCBjb250YWluZXI7XG4gICAgICAgIGNvbnN0IGJveCA9IFtbXSwgW10sIFtdLCBbXSwgW10gLCBbXSwgW10sIFtdLCBbXSwgW11dO1xuXG4gICAgICAgIGlmIChpc0h1bWFuKSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQuaHVtYW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC5jb21wdXRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJPQVJEX0xFTkdUSDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IEJPQVJEX0xFTkdUSDsgaisrKSB7XG4gICAgICAgICAgICAgICAgYm94W2ldW2pdID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYm94W2ldW2pdLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLWJveCcpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMudXBkYXRlQm9hcmQoYm94W2ldW2pdLCBib2FyZCwgaSwgaik7XG4gICAgICAgICAgICAgICAgYm94W2ldW2pdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkKGJveCwgYm9hcmQsIGksIGopXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gd2lsbCBuZWVkIHRvIGFkZCBldmVudCBsaXN0ZW5lciB0byB0cmFjayBhdHRhY2tzXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJveFtpXVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGVCb2FyZCA9IGZ1bmN0aW9uKGJveCwgYm9hcmQsIHgsIHkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFt4XVt5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGJveFt4XVt5XS50ZXh0Q29udGVudCA9ICdTJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChib2FyZFt4XVt5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBib3hbeF1beV0udGV4dENvbnRlbnQgPSAnTSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYm9hcmRbeF1beV0gPT09ICdoaXQnKSB7XG4gICAgICAgICAgICBib3hbeF1beV0udGV4dENvbnRlbnQgPSAnSCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyAgY3JlYXRlQm9hcmQsIGludGVyZmFjZVNldFVwLCB1cGRhdGVCb2FyZCB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGxheWVyKGdhbWVib2FyZCwgaXNDb21wdXRlciA9IGZhbHNlLCBvcHBvbmVudCA9IG51bGwsIGlzVHVybiA9IGZhbHNlKSB7XG4gICAgXG4gICAgY29uc3Qgc2V0T3Bwb25lbnQgPSBmdW5jdGlvbihwbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5vcHBvbmVudCA9IHBsYXllcjtcbiAgICB9XG5cblxuICAgIGNvbnN0IHJhbmRvbUF0dGFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBCT0FSRF9MRU5HVEggPSAxMDtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGxldCB5O1xuICAgICAgICB3aGlsZSAodGhpcy5pc1R1cm4pIHtcbiAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9MRU5HVEgpO1xuICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX0xFTkdUSCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjayh4LCB5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjayA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgaWYgKHRoaXMub3Bwb25lbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hZGVNb3ZlID0gdGhpcy5vcHBvbmVudC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICAgICAgaWYgKG1hZGVNb3ZlKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVR1cm4oKTtcbiAgICAgICAgICAgIHRoaXMub3Bwb25lbnQuY2hhbmdlVHVybigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlVHVybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmlzVHVybiA9ICF0aGlzLmlzVHVybjtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHsgZ2FtZWJvYXJkLCBpc0NvbXB1dGVyLCBvcHBvbmVudCwgaXNUdXJuLCBcbiAgICAgICAgc2V0T3Bwb25lbnQsIGF0dGFjaywgcmFuZG9tQXR0YWNrLCBjaGFuZ2VUdXJuIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaGlwKGxlbmd0aCkge1xuICAgIGlmIChsZW5ndGggPiA1KSB7IFxuICAgICAgICB0aGlzLmxlbmd0aCA9IDU7XG4gICAgfVxuXG4gICAgaWYgKGxlbmd0aCA8IDIpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSAyO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBoaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3VuaygpKSB7XG4gICAgICAgICAgICB0aGlzLm51bUhpdHMgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5udW1IaXRzID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgbGVuZ3RoLCBudW1IaXRzOiAwLCBoaXQsIGlzU3VuayB9XG59IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBcIm5vcm1hbGl6ZS5jc3NcIjtcbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5pbXBvcnQgSW50ZXJmYWNlIGZyb20gJy4vSW50ZXJmYWNlJztcblxuXG4vLyBjb25zdCBteUdhbWUgPSBHYW1lKCk7XG4vLyBteUdhbWUuZ2FtZVNldFVwKCk7XG4vLyBteUdhbWUuc3RhcnRHYW1lKCk7XG5cbmNvbnN0IG15VUkgPSBJbnRlcmZhY2UoKTtcblxubXlVSS5pbnRlcmZhY2VTZXRVcCgpO1xuLy8gbXlVSS5jcmVhdGVCb2FyZCh0cnVlKTtcbi8vIG15VUkuY3JlYXRlQm9hcmQoZmFsc2UpO1xuXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiUGxheWVyIiwiR2FtZWJvYXJkIiwiU2hpcCIsIkdhbWUiLCJ3aW5uZXIiLCJwbGF5ZXIiLCJjb21wdXRlciIsImdhbWVTZXRVcCIsInBsYXllckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsInNldE9wcG9uZW50IiwiU0hJUF9MRU5HVEhTIiwicGxheWVyQ29vcmRzIiwiaSIsImxlbmd0aCIsImdhbWVib2FyZCIsInBsYWNlU2hpcCIsInN0YXJ0R2FtZSIsImNoYW5nZVR1cm4iLCJhbGxTaGlwc1N1bmsiLCJpc1R1cm4iLCJ4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwieSIsImF0dGFjayIsInJhbmRvbUF0dGFjayIsImRlY2xhcmVXaW5uZXIiLCJzaGlwcyIsImNyZWF0ZUJvYXJkIiwiQk9BUkRfTEVOR1RIIiwiYXJyYXkiLCJBcnJheSIsImlzU3BhY2VGcmVlIiwiYm9hcmQiLCJ1bmRlZmluZWQiLCJzaGlwIiwiZGlyZWN0aW9uIiwidGVtcEJvYXJkIiwiY29vcmRzIiwicHVzaCIsImZvckVhY2giLCJpdGVtIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsInJlZHVjZSIsImFsbFNoaXBzIiwiY3VycmVudFNoaXAiLCJpc1N1bmsiLCJJbnRlcmZhY2UiLCJpbnRlcmZhY2VTZXRVcCIsIm15R2FtZSIsIm5ld0dhbWVCdXR0b24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiaXNIdW1hbiIsImNvbnRhaW5lciIsImJveCIsImlubmVySFRNTCIsImoiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwidXBkYXRlQm9hcmQiLCJhcHBlbmRDaGlsZCIsInRleHRDb250ZW50IiwiaXNDb21wdXRlciIsImFyZ3VtZW50cyIsIm9wcG9uZW50IiwibWFkZU1vdmUiLCJudW1IaXRzIiwibXlVSSJdLCJzb3VyY2VSb290IjoiIn0=