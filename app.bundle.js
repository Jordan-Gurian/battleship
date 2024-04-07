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

    // Place ships, hardcoded for now
    const SHIP_LENGTHS = [2, 3, 3, 4, 5];
    const playerCoords = [[0, 0], [2, 2], [3, 3], [4, 4], [6, 6]];
    for (let i = 0; i < SHIP_LENGTHS.length; i++) {
      this.player.gameboard.placeShip((0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(SHIP_LENGTHS[i]), 'horz', playerCoords[i][0], playerCoords[i][1]);
      this.computer.gameboard.placeShip((0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(SHIP_LENGTHS[i]), 'horz', playerCoords[i][0], playerCoords[i][1]);
    }
  };

  // const startGame = function() {
  //     this.player.changeTurn();
  //     while (!this.player.gameboard.allShipsSunk() && !this.computer.gameboard.allShipsSunk()) {
  //         if (this.player.isTurn) {
  //             const x = Math.floor(Math.random() * 10);
  //             const y = Math.floor(Math.random() * 10);
  //             this.player.attack(x, y);
  //         } else {
  //             this.computer.randomAttack();
  //         }
  //     }
  //     this.declareWinner();
  // }

  const isGameOver = function () {
    if (this.player.gameboard.allShipsSunk()) {
      this.winner = this.computer;
    } else if (this.computer.gameboard.allShipsSunk()) {
      this.winner = this.computer;
    }
    return winner != null;
  };
  return {
    player,
    computer,
    winner,
    gameSetUp,
    isGameOver
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
  const interfaceSetUp = function () {
    const myGame = (0,_Game__WEBPACK_IMPORTED_MODULE_0__["default"])();
    myGame.gameSetUp();
    this.createBoard(myGame, myGame.player);
    this.createBoard(myGame, myGame.computer);
    // myGame.startGame();
    const newGameButton = document.querySelector('.new-game');
    newGameButton.addEventListener('click', () => {
      myGame.gameSetUp();
      this.createBoard(myGame, myGame.player);
      this.createBoard(myGame, myGame.computer);
    });
  };
  const createBoard = function (game, currentPlayer) {
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
        this.updateBoard(game, box, currentPlayer.gameboard, i);
      }
      box[i].addEventListener('click', () => {
        if (currentPlayer.isTurn) {
          return;
        }
        const x = Math.floor(i / 10);
        const y = i % 10;
        currentPlayer.opponent.attack(x, y);
        this.updateBoard(game, box, currentPlayer.gameboard, i);
        if (currentPlayer.isComputer) {
          const playerBox = Array.from(document.querySelector('.board.human').children);
          const computerAttack = currentPlayer.randomAttack();
          this.updateBoard(game, playerBox, currentPlayer.opponent.gameboard, computerAttack[0] * 10 + computerAttack[1]);
        }
      });
      // will need to add event listener to track attacks
      container.appendChild(box[i]);
    }
  };
  const updateBoard = function (game, box, gameboard, i) {
    const x = Math.floor(i / 10);
    const y = i % 10;
    if (typeof gameboard.board[x][y] === 'object') {
      box[i].textContent = 'S';
    } else if (gameboard.board[x][y] === 'miss') {
      box[i].textContent = 'M';
    } else if (gameboard.board[x][y] === 'hit') {
      box[i].textContent = 'H';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSUEsQ0FBQ2EsTUFBTSxFQUFFO0VBQ2pDLElBQUlBLE1BQU0sR0FBRyxDQUFDLEVBQUU7SUFDWixJQUFJLENBQUNBLE1BQU0sR0FBRyxDQUFDO0VBQ25CO0VBRUEsSUFBSUEsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUNaLElBQUksQ0FBQ0EsTUFBTSxHQUFHLENBQUM7RUFDbkI7RUFFQSxNQUFNdUIsR0FBRyxHQUFHLFNBQUFBLENBQUEsRUFBVztJQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDSSxNQUFNLENBQUMsQ0FBQyxFQUFFO01BQ2hCLElBQUksQ0FBQ2lDLE9BQU8sSUFBSSxDQUFDO0lBQ3JCO0VBQ0osQ0FBQztFQUVELE1BQU1qQyxNQUFNLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3RCLElBQUksSUFBSSxDQUFDaUMsT0FBTyxJQUFJLElBQUksQ0FBQzVELE1BQU0sRUFBRTtNQUM3QixPQUFPLElBQUk7SUFDZjtJQUNBLE9BQU8sS0FBSztFQUNoQixDQUFDO0VBRUQsT0FBTztJQUFFQSxNQUFNO0lBQUU0RCxPQUFPLEVBQUUsQ0FBQztJQUFFckMsR0FBRztJQUFFSTtFQUFPLENBQUM7QUFDOUM7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCcUI7QUFDRTtBQUNHO0FBQ1U7O0FBR3BDO0FBQ0E7QUFDQTs7QUFFQSxNQUFNa0MsSUFBSSxHQUFHakMsc0RBQVMsQ0FBQyxDQUFDO0FBRXhCaUMsSUFBSSxDQUFDaEMsY0FBYyxDQUFDLENBQUM7QUFDckI7QUFDQTs7Ozs7Ozs7Ozs7QUNkQTs7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0dhbWUuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9JbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3MiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9zdHlsZS5jc3MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcidcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9HYW1lYm9hcmQnO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gR2FtZSgpIHtcbiAgICBcbiAgICBjb25zdCB3aW5uZXIgPSBudWxsO1xuICAgIGNvbnN0IHBsYXllciA9IG51bGw7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBudWxsO1xuXG4gICAgLy8gQ3JlYXRlIGh1bWFuIGFuZCBjb21wdXRlciBwbGF5ZXJzIGFuZCBib2FyZHNcbiAgICBjb25zdCBnYW1lU2V0VXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgICAgICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuICAgICAgICB0aGlzLnBsYXllciA9IFBsYXllcihwbGF5ZXJCb2FyZCk7XG4gICAgICAgIHRoaXMuY29tcHV0ZXIgPSBQbGF5ZXIoY29tcHV0ZXJCb2FyZCwgdHJ1ZSwgdGhpcy5wbGF5ZXIpO1xuICAgICAgICB0aGlzLnBsYXllci5zZXRPcHBvbmVudCh0aGlzLmNvbXB1dGVyKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb21wdXRlci5pc1R1cm4gPSBmYWxzZTtcblxuICAgICAgICAvLyBQbGFjZSBzaGlwcywgaGFyZGNvZGVkIGZvciBub3dcbiAgICAgICAgY29uc3QgU0hJUF9MRU5HVEhTID0gWzIsIDMsIDMsIDQsIDVdO1xuICAgICAgICBjb25zdCBwbGF5ZXJDb29yZHMgPVtbMCwwXSwgWzIsMl0sIFszLDNdLCBbNCw0XSwgWzYsNl1dO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU0hJUF9MRU5HVEhTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKFNoaXAoU0hJUF9MRU5HVEhTW2ldKSwgJ2hvcnonLCBwbGF5ZXJDb29yZHNbaV1bMF0sIHBsYXllckNvb3Jkc1tpXVsxXSk7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXAoU2hpcChTSElQX0xFTkdUSFNbaV0pLCAnaG9yeicsIHBsYXllckNvb3Jkc1tpXVswXSwgcGxheWVyQ29vcmRzW2ldWzFdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuICAgIC8vIGNvbnN0IHN0YXJ0R2FtZSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICB0aGlzLnBsYXllci5jaGFuZ2VUdXJuKCk7XG4gICAgLy8gICAgIHdoaWxlICghdGhpcy5wbGF5ZXIuZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpICYmICF0aGlzLmNvbXB1dGVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIC8vICAgICAgICAgaWYgKHRoaXMucGxheWVyLmlzVHVybikge1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgLy8gICAgICAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnBsYXllci5hdHRhY2soeCwgeSk7XG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgIHRoaXMuY29tcHV0ZXIucmFuZG9tQXR0YWNrKCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgdGhpcy5kZWNsYXJlV2lubmVyKCk7XG4gICAgLy8gfVxuXG4gICAgY29uc3QgaXNHYW1lT3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgICAgICB0aGlzLndpbm5lciA9IHRoaXMuY29tcHV0ZXI7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKCh0aGlzLmNvbXB1dGVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkpIHtcbiAgICAgICAgICAgIHRoaXMud2lubmVyID0gdGhpcy5jb21wdXRlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2lubmVyICE9IG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4geyBwbGF5ZXIsIGNvbXB1dGVyLCB3aW5uZXIsIGdhbWVTZXRVcCwgaXNHYW1lT3ZlciB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuICAgIFxuICAgIGNvbnN0IHNoaXBzID0gW107XG5cbiAgICBjb25zdCBjcmVhdGVCb2FyZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBCT0FSRF9MRU5HVEggPSAxMDtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBBcnJheSgxMCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBCT0FSRF9MRU5HVEg7IGkrKykge1xuICAgICAgICAgICAgYXJyYXlbaV0gPSBBcnJheSgxMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cblxuICAgIGNvbnN0IGlzU3BhY2VGcmVlID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt4XVt5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgYm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuXG4gICAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24oc2hpcCwgZGlyZWN0aW9uLCB4LCB5KSB7XG4gICAgICAgIGNvbnN0IEJPQVJEX0xFTkdUSCA9IDEwO1xuICAgICAgICBjb25zdCB0ZW1wQm9hcmQgPSB0aGlzLmJvYXJkO1xuICAgICAgICBjb25zdCBjb29yZHMgPSBbXTtcbiAgICAgICAgaWYgKHggPCAwIHx8IHkgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdob3J6Jykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHk7IGkgPCB5ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpIDwgQk9BUkRfTEVOR1RIICYmIHRoaXMuaXNTcGFjZUZyZWUoeCwgaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29vcmRzLnB1c2goW3gsIGldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBkZWZhdWx0IHRvIHZlcnRpY2FsIG9yaWVudGF0aW9uXG4gICAgICAgICAgICBmb3IgKGxldCBpID0geDsgaSA8IHggKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBCT0FSRF9MRU5HVEggJiYgdGhpcy5pc1NwYWNlRnJlZShpLCB5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb29yZHMucHVzaChbaSwgeV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2hpcHMucHVzaChzaGlwKTtcbiAgICAgICAgY29vcmRzLmZvckVhY2goIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0ZW1wQm9hcmRbaXRlbVswXV1baXRlbVsxXV0gPSBzaGlwO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnbWlzcyc7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFt4XVt5XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XS5oaXQoKTtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnaGl0JztcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgYWxsU2hpcHNTdW5rID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzaGlwcy5yZWR1Y2UoKGFsbFNoaXBzLCBjdXJyZW50U2hpcCkgPT4gYWxsU2hpcHMgJiYgY3VycmVudFNoaXAuaXNTdW5rKCksIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiB7IGJvYXJkLCBwbGFjZVNoaXAsIGlzU3BhY2VGcmVlLCByZWNlaXZlQXR0YWNrLCBhbGxTaGlwc1N1bmsgfVxuXG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW50ZXJmYWNlKCkge1xuXG4gICAgY29uc3QgaW50ZXJmYWNlU2V0VXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbXlHYW1lID0gR2FtZSgpO1xuICAgICAgICBteUdhbWUuZ2FtZVNldFVwKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQm9hcmQobXlHYW1lLCBteUdhbWUucGxheWVyKTtcbiAgICAgICAgdGhpcy5jcmVhdGVCb2FyZChteUdhbWUsIG15R2FtZS5jb21wdXRlcik7XG4gICAgICAgIC8vIG15R2FtZS5zdGFydEdhbWUoKTtcbiAgICAgICAgY29uc3QgbmV3R2FtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctZ2FtZScpO1xuICAgICAgICBuZXdHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbXlHYW1lLmdhbWVTZXRVcCgpXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJvYXJkKG15R2FtZSwgbXlHYW1lLnBsYXllcik7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJvYXJkKG15R2FtZSwgbXlHYW1lLmNvbXB1dGVyKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVCb2FyZCA9IGZ1bmN0aW9uKGdhbWUsIGN1cnJlbnRQbGF5ZXIpIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGxldCBjb250YWluZXI7XG4gICAgICAgIGNvbnN0IGJveCA9IFtdO1xuXG4gICAgICAgIGlmICghY3VycmVudFBsYXllci5pc0NvbXB1dGVyKSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQuaHVtYW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC5jb21wdXRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJPQVJEX0xFTkdUSCoqMjsgaSsrKSB7XG4gICAgICAgICAgICBib3hbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJveFtpXS5jbGFzc0xpc3QuYWRkKCdib2FyZC1ib3gnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFjdXJyZW50UGxheWVyLmlzQ29tcHV0ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkKGdhbWUsIGJveCwgY3VycmVudFBsYXllci5nYW1lYm9hcmQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBib3hbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihpIC8gMTApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBpICUgMTA7XG4gICAgICAgICAgICAgICAgY3VycmVudFBsYXllci5vcHBvbmVudC5hdHRhY2soeCwgeSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVCb2FyZChnYW1lLCBib3gsIGN1cnJlbnRQbGF5ZXIuZ2FtZWJvYXJkLCBpKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBsYXllci5pc0NvbXB1dGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYXllckJveCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLmh1bWFuJykuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wdXRlckF0dGFjayA9IGN1cnJlbnRQbGF5ZXIucmFuZG9tQXR0YWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQm9hcmQoZ2FtZSwgcGxheWVyQm94LCBjdXJyZW50UGxheWVyLm9wcG9uZW50LmdhbWVib2FyZCwgY29tcHV0ZXJBdHRhY2tbMF0gKiAxMCArIGNvbXB1dGVyQXR0YWNrWzFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIHdpbGwgbmVlZCB0byBhZGQgZXZlbnQgbGlzdGVuZXIgdG8gdHJhY2sgYXR0YWNrc1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJveFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGVCb2FyZCA9IGZ1bmN0aW9uKGdhbWUsIGJveCwgZ2FtZWJvYXJkLCBpKSB7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKGkgLyAxMCk7XG4gICAgICAgIGNvbnN0IHkgPSBpICUgMTA7XG4gICAgICAgIGlmICh0eXBlb2YgZ2FtZWJvYXJkLmJvYXJkW3hdW3ldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgYm94W2ldLnRleHRDb250ZW50ID0gJ1MnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGdhbWVib2FyZC5ib2FyZFt4XVt5XSA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICBib3hbaV0udGV4dENvbnRlbnQgPSAnTSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmJvYXJkW3hdW3ldID09PSAnaGl0Jykge1xuICAgICAgICAgICAgYm94W2ldLnRleHRDb250ZW50ID0gJ0gnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgIGNyZWF0ZUJvYXJkLCBpbnRlcmZhY2VTZXRVcCwgdXBkYXRlQm9hcmQgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGxheWVyKGdhbWVib2FyZCwgaXNDb21wdXRlciA9IGZhbHNlLCBvcHBvbmVudCA9IG51bGwsIGlzVHVybiA9IGZhbHNlKSB7XG4gICAgXG4gICAgY29uc3Qgc2V0T3Bwb25lbnQgPSBmdW5jdGlvbihwbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5vcHBvbmVudCA9IHBsYXllcjtcbiAgICB9XG5cblxuICAgIGNvbnN0IHJhbmRvbUF0dGFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBCT0FSRF9MRU5HVEggPSAxMDtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGxldCB5O1xuICAgICAgICB3aGlsZSAodGhpcy5pc1R1cm4pIHtcbiAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9MRU5HVEgpO1xuICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX0xFTkdUSCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjayh4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3gsIHldXG4gICAgfVxuXG4gICAgY29uc3QgYXR0YWNrID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICBpZiAodGhpcy5vcHBvbmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWFkZU1vdmUgPSB0aGlzLm9wcG9uZW50LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgICAgICBpZiAobWFkZU1vdmUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVHVybigpO1xuICAgICAgICAgICAgdGhpcy5vcHBvbmVudC5jaGFuZ2VUdXJuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VUdXJuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuaXNUdXJuID0gIXRoaXMuaXNUdXJuO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4geyBnYW1lYm9hcmQsIGlzQ29tcHV0ZXIsIG9wcG9uZW50LCBpc1R1cm4sIFxuICAgICAgICBzZXRPcHBvbmVudCwgYXR0YWNrLCByYW5kb21BdHRhY2ssIGNoYW5nZVR1cm4gfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNoaXAobGVuZ3RoKSB7XG4gICAgaWYgKGxlbmd0aCA+IDUpIHsgXG4gICAgICAgIHRoaXMubGVuZ3RoID0gNTtcbiAgICB9XG5cbiAgICBpZiAobGVuZ3RoIDwgMikge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDI7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGhpdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIHRoaXMubnVtSGl0cyArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm51bUhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBsZW5ndGgsIG51bUhpdHM6IDAsIGhpdCwgaXNTdW5rIH1cbn0iLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IFwibm9ybWFsaXplLmNzc1wiO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcbmltcG9ydCBJbnRlcmZhY2UgZnJvbSAnLi9JbnRlcmZhY2UnO1xuXG5cbi8vIGNvbnN0IG15R2FtZSA9IEdhbWUoKTtcbi8vIG15R2FtZS5nYW1lU2V0VXAoKTtcbi8vIG15R2FtZS5zdGFydEdhbWUoKTtcblxuY29uc3QgbXlVSSA9IEludGVyZmFjZSgpO1xuXG5teVVJLmludGVyZmFjZVNldFVwKCk7XG4vLyBteVVJLmNyZWF0ZUJvYXJkKHRydWUpO1xuLy8gbXlVSS5jcmVhdGVCb2FyZChmYWxzZSk7XG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJQbGF5ZXIiLCJHYW1lYm9hcmQiLCJTaGlwIiwiR2FtZSIsIndpbm5lciIsInBsYXllciIsImNvbXB1dGVyIiwiZ2FtZVNldFVwIiwicGxheWVyQm9hcmQiLCJjb21wdXRlckJvYXJkIiwic2V0T3Bwb25lbnQiLCJpc1R1cm4iLCJTSElQX0xFTkdUSFMiLCJwbGF5ZXJDb29yZHMiLCJpIiwibGVuZ3RoIiwiZ2FtZWJvYXJkIiwicGxhY2VTaGlwIiwiaXNHYW1lT3ZlciIsImFsbFNoaXBzU3VuayIsInNoaXBzIiwiY3JlYXRlQm9hcmQiLCJCT0FSRF9MRU5HVEgiLCJhcnJheSIsIkFycmF5IiwiaXNTcGFjZUZyZWUiLCJ4IiwieSIsImJvYXJkIiwidW5kZWZpbmVkIiwic2hpcCIsImRpcmVjdGlvbiIsInRlbXBCb2FyZCIsImNvb3JkcyIsInB1c2giLCJmb3JFYWNoIiwiaXRlbSIsInJlY2VpdmVBdHRhY2siLCJoaXQiLCJyZWR1Y2UiLCJhbGxTaGlwcyIsImN1cnJlbnRTaGlwIiwiaXNTdW5rIiwiSW50ZXJmYWNlIiwiaW50ZXJmYWNlU2V0VXAiLCJteUdhbWUiLCJuZXdHYW1lQnV0dG9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImdhbWUiLCJjdXJyZW50UGxheWVyIiwiY29udGFpbmVyIiwiYm94IiwiaXNDb21wdXRlciIsImlubmVySFRNTCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ1cGRhdGVCb2FyZCIsIk1hdGgiLCJmbG9vciIsIm9wcG9uZW50IiwiYXR0YWNrIiwicGxheWVyQm94IiwiZnJvbSIsImNoaWxkcmVuIiwiY29tcHV0ZXJBdHRhY2siLCJyYW5kb21BdHRhY2siLCJhcHBlbmRDaGlsZCIsInRleHRDb250ZW50IiwiYXJndW1lbnRzIiwicmFuZG9tIiwibWFkZU1vdmUiLCJjaGFuZ2VUdXJuIiwibnVtSGl0cyIsIm15VUkiXSwic291cmNlUm9vdCI6IiJ9