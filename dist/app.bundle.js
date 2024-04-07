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
/* harmony import */ var _preGameHoverCb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preGameHoverCb */ "./src/preGameHoverCb.js");
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
    this.createBoard(this.game.player, _preGameBoxEventsCb__WEBPACK_IMPORTED_MODULE_0__["default"], _preGameHoverCb__WEBPACK_IMPORTED_MODULE_1__["default"]);
    this.createBoard(this.game.computer, _preGameBoxEventsCb__WEBPACK_IMPORTED_MODULE_0__["default"], _preGameHoverCb__WEBPACK_IMPORTED_MODULE_1__["default"]);
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
/* harmony import */ var _newGame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./newGame */ "./src/newGame.js");






// const myGame = Game();
// myGame.gameSetUp();
// myGame.startGame();

const myGame = (0,_Game__WEBPACK_IMPORTED_MODULE_2__["default"])();
const myUI = (0,_Interface__WEBPACK_IMPORTED_MODULE_3__["default"])(myGame);
(0,_newGame__WEBPACK_IMPORTED_MODULE_4__["default"])(myUI);
myUI.interfaceSetUp();
// myUI.createBoard(true);
// myUI.createBoard(false);

/***/ }),

/***/ "./src/newGame.js":
/*!************************!*\
  !*** ./src/newGame.js ***!
  \************************/
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

/***/ "./src/preGameHoverCb.js":
/*!*******************************!*\
  !*** ./src/preGameHoverCb.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ preGameHoverCb)
/* harmony export */ });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNQLENBQUMsR0FBRzhELENBQUMsQ0FBQztNQUN4QixDQUFDLE1BQU07UUFDSEMsUUFBUSxDQUFDeEQsSUFBSSxDQUFDUCxDQUFDLEdBQUksRUFBRSxHQUFHOEQsQ0FBRSxDQUFDO1FBQzNCN0IsR0FBRyxDQUFDakMsQ0FBQyxHQUFJLEVBQUUsR0FBRzhELENBQUUsQ0FBQyxDQUFDckMsU0FBUyxDQUFDQyxHQUFHLENBQUMsWUFBWSxDQUFDO01BQ2pEO0lBQ0o7SUFDQSxLQUFLLElBQUlvQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUc3QixHQUFHLENBQUNqRCxNQUFNLEVBQUU4RSxDQUFDLEVBQUUsRUFBRTtNQUNqQyxJQUFJQyxRQUFRLENBQUNDLFFBQVEsQ0FBQ0YsQ0FBQyxDQUFDLEVBQUU7UUFDdEI3QixHQUFHLENBQUM2QixDQUFDLENBQUMsQ0FBQ3JDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztNQUN0QyxDQUFDLE1BQU07UUFDSE8sR0FBRyxDQUFDNkIsQ0FBQyxDQUFDLENBQUNyQyxTQUFTLENBQUNFLE1BQU0sQ0FBQyxZQUFZLENBQUM7TUFDekM7SUFDSjtFQUNKO0FBQ0o7Ozs7Ozs7Ozs7O0FDbkJBOzs7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvR2FtZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL1NoaXAuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9pbkdhbWVCb3hFdmVudHNDYi5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvbmV3R2FtZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3ByZUdhbWVCb3hFdmVudHNDYi5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3ByZUdhbWVIb3ZlckNiLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvc3R5bGUuY3NzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vR2FtZWJvYXJkJztcbmltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbWUoKSB7XG4gICAgXG4gICAgY29uc3Qgd2lubmVyID0gbnVsbDtcbiAgICBjb25zdCBwbGF5ZXIgPSBudWxsO1xuICAgIGNvbnN0IGNvbXB1dGVyID0gbnVsbDtcblxuICAgIC8vIENyZWF0ZSBodW1hbiBhbmQgY29tcHV0ZXIgcGxheWVycyBhbmQgYm9hcmRzXG4gICAgY29uc3QgZ2FtZVNldFVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBQbGF5ZXIocGxheWVyQm9hcmQpO1xuICAgICAgICB0aGlzLmNvbXB1dGVyID0gUGxheWVyKGNvbXB1dGVyQm9hcmQsIHRydWUsIHRoaXMucGxheWVyKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc2V0T3Bwb25lbnQodGhpcy5jb21wdXRlcik7XG4gICAgICAgIHRoaXMucGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgICAgIHRoaXMuY29tcHV0ZXIuaXNUdXJuID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2lubmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZXRDb21wdXRlclNoaXBzKHRoaXMuY29tcHV0ZXIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNldENvbXB1dGVyU2hpcHMgPSBmdW5jdGlvbihjdXJyZW50UGxheWVyKSB7XG4gICAgICAgIGNvbnN0IFNISVBfTEVOR1RIUyA9IFsyLCAzLCAzLCA0LCA1XTsgXG4gICAgICAgIGNvbnN0IEJPQVJEX0xFTkdUSCA9IDEwO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBbJ2hvcnonLCAndmVydCddO1xuICAgICAgICB3aGlsZSAoU0hJUF9MRU5HVEhTLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBEaXIgPSBNYXRoLmZsb29yKDIgKiBNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9MRU5HVEgpO1xuICAgICAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX0xFTkdUSCk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKFNoaXAoU0hJUF9MRU5HVEhTWzBdKSwgZGlyZWN0aW9uW3NoaXBEaXJdLCB4LCB5KSkge1xuICAgICAgICAgICAgICAgIFNISVBfTEVOR1RIUy5zaGlmdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGlzR2FtZU92ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgICAgdGhpcy53aW5uZXIgPSB0aGlzLmNvbXB1dGVyO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvbXB1dGVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgICAgdGhpcy53aW5uZXIgPSB0aGlzLnBsYXllcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy53aW5uZXIgIT0gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiB7IHBsYXllciwgY29tcHV0ZXIsIHdpbm5lciwgZ2FtZVNldFVwLCBpc0dhbWVPdmVyLCBzZXRDb21wdXRlclNoaXBzIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gICAgXG4gICAgY29uc3Qgc2hpcHMgPSBbXTtcblxuICAgIGNvbnN0IGNyZWF0ZUJvYXJkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IEJPQVJEX0xFTkdUSCA9IDEwO1xuICAgICAgICBjb25zdCBhcnJheSA9IEFycmF5KDEwKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJPQVJEX0xFTkdUSDsgaSsrKSB7XG4gICAgICAgICAgICBhcnJheVtpXSA9IEFycmF5KDEwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNTcGFjZUZyZWUgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbihzaGlwLCBkaXJlY3Rpb24sIHgsIHkpIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGNvbnN0IHRlbXBCb2FyZCA9IHRoaXMuYm9hcmQ7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2hvcnonKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0geTsgaSA8IHkgKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBCT0FSRF9MRU5HVEggJiYgdGhpcy5pc1NwYWNlRnJlZSh4LCBpKSkge1xuICAgICAgICAgICAgICAgICAgICBjb29yZHMucHVzaChbeCwgaV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gZGVmYXVsdCB0byB2ZXJ0aWNhbCBvcmllbnRhdGlvblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpIDwgQk9BUkRfTEVOR1RIICYmIHRoaXMuaXNTcGFjZUZyZWUoaSwgeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29vcmRzLnB1c2goW2ksIHldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2hpcHMucHVzaChzaGlwKTtcbiAgICAgICAgY29vcmRzLmZvckVhY2goIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0ZW1wQm9hcmRbaXRlbVswXV1baXRlbVsxXV0gPSBzaGlwO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnbWlzcyc7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFt4XVt5XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XS5oaXQoKTtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnaGl0JztcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgYWxsU2hpcHNTdW5rID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzaGlwcy5yZWR1Y2UoKGFsbFNoaXBzLCBjdXJyZW50U2hpcCkgPT4gYWxsU2hpcHMgJiYgY3VycmVudFNoaXAuaXNTdW5rKCksIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiB7IGJvYXJkLCBwbGFjZVNoaXAsIGlzU3BhY2VGcmVlLCByZWNlaXZlQXR0YWNrLCBhbGxTaGlwc1N1bmsgfVxuXG59IiwiLy8gaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcbmltcG9ydCBwcmVHYW1lQm94RXZlbnRzQ2IgZnJvbSAnLi9wcmVHYW1lQm94RXZlbnRzQ2InO1xuaW1wb3J0IHByZUdhbWVIb3ZlckNiIGZyb20gJy4vcHJlR2FtZUhvdmVyQ2InXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEludGVyZmFjZShnYW1lKSB7XG4gICAgbGV0IHNoaXBEaXIgPSAnaG9yeic7XG5cbiAgICBjb25zdCB2ZXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZlcnQnKTtcbiAgICBjb25zdCBob3J6QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvcnonKTtcblxuICAgIHZlcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHNoaXBEaXIgPSAndmVydCc7XG4gICAgICAgIHZlcnRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZmFrZS1ob3ZlcicpO1xuICAgICAgICBob3J6QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2Zha2UtaG92ZXInKTtcbiAgICB9KVxuXG4gICAgaG9yekJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgc2hpcERpciA9ICdob3J6JztcbiAgICAgICAgdmVydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYWtlLWhvdmVyJyk7XG4gICAgICAgIGhvcnpCdXR0b24uY2xhc3NMaXN0LmFkZCgnZmFrZS1ob3ZlcicpO1xuICAgIH0pXG5cbiAgICBjb25zdCBpbnRlcmZhY2VTZXRVcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmdhbWUuZ2FtZVNldFVwKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQm9hcmQodGhpcy5nYW1lLnBsYXllciwgcHJlR2FtZUJveEV2ZW50c0NiLCBwcmVHYW1lSG92ZXJDYik7XG4gICAgICAgIHRoaXMuY3JlYXRlQm9hcmQodGhpcy5nYW1lLmNvbXB1dGVyLCBwcmVHYW1lQm94RXZlbnRzQ2IsIHByZUdhbWVIb3ZlckNiKTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVCb2FyZCA9IGZ1bmN0aW9uKGN1cnJlbnRQbGF5ZXIsIGNsaWNrQ2IsIG1vdXNlb3ZlckNiPW51bGwpIHtcbiAgICAgICAgY29uc3QgQk9BUkRfTEVOR1RIID0gMTA7XG4gICAgICAgIGxldCBjb250YWluZXI7XG4gICAgICAgIGNvbnN0IGJveCA9IFtdO1xuXG4gICAgICAgIGlmICghY3VycmVudFBsYXllci5pc0NvbXB1dGVyKSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQuaHVtYW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC5jb21wdXRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJPQVJEX0xFTkdUSCoqMjsgaSsrKSB7XG4gICAgICAgICAgICBib3hbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJveFtpXS5jbGFzc0xpc3QuYWRkKCdib2FyZC1ib3gnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFjdXJyZW50UGxheWVyLmlzQ29tcHV0ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkKGJveCwgY3VycmVudFBsYXllci5nYW1lYm9hcmQsIGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9vcC1mdW5jXG4gICAgICAgICAgICBib3hbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2xpY2tDYih0aGlzLCBjdXJyZW50UGxheWVyLCBib3gsIGksIHNoaXBEaXIpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG1vdXNlb3ZlckNiICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBib3hbaV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtb3VzZW92ZXJDYihjdXJyZW50UGxheWVyLCBib3gsIGksIHNoaXBEaXIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJveFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGVCb2FyZCA9IGZ1bmN0aW9uKGJveCwgZ2FtZWJvYXJkLCBpKSB7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKGkgLyAxMCk7XG4gICAgICAgIGNvbnN0IHkgPSBpICUgMTA7XG4gICAgICAgIGlmICh0eXBlb2YgZ2FtZWJvYXJkLmJvYXJkW3hdW3ldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgYm94W2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibGFjayc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmJvYXJkW3hdW3ldID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgIGJveFtpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JheSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmJvYXJkW3hdW3ldID09PSAnaGl0Jykge1xuICAgICAgICAgICAgYm94W2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgIGdhbWUsIGNyZWF0ZUJvYXJkLCBpbnRlcmZhY2VTZXRVcCwgdXBkYXRlQm9hcmQgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGxheWVyKGdhbWVib2FyZCwgaXNDb21wdXRlciA9IGZhbHNlLCBvcHBvbmVudCA9IG51bGwsIGlzVHVybiA9IGZhbHNlKSB7XG4gICAgXG4gICAgY29uc3Qgc2hpcExlbiA9IFsyLCAzLCAzLCA0LCA1XTsgXG5cbiAgICBjb25zdCBzZXRPcHBvbmVudCA9IGZ1bmN0aW9uKHBsYXllcikge1xuICAgICAgICB0aGlzLm9wcG9uZW50ID0gcGxheWVyO1xuICAgIH1cblxuXG4gICAgY29uc3QgcmFuZG9tQXR0YWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IEJPQVJEX0xFTkdUSCA9IDEwO1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgbGV0IHk7XG4gICAgICAgIHdoaWxlICh0aGlzLmlzVHVybikge1xuICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX0xFTkdUSCk7XG4gICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQk9BUkRfTEVOR1RIKTtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrKHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbeCwgeV1cbiAgICB9XG5cbiAgICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIGlmICh0aGlzLm9wcG9uZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtYWRlTW92ZSA9IHRoaXMub3Bwb25lbnQuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgICAgIGlmIChtYWRlTW92ZSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUdXJuKCk7XG4gICAgICAgICAgICB0aGlzLm9wcG9uZW50LmNoYW5nZVR1cm4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZVR1cm4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5pc1R1cm4gPSAhdGhpcy5pc1R1cm47XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7IGdhbWVib2FyZCwgaXNDb21wdXRlciwgb3Bwb25lbnQsIGlzVHVybiwgc2hpcExlbiwgXG4gICAgICAgIHNldE9wcG9uZW50LCBhdHRhY2ssIHJhbmRvbUF0dGFjaywgY2hhbmdlVHVybiB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2hpcChsZW5ndGgpIHtcbiAgICBpZiAobGVuZ3RoID4gNSkgeyBcbiAgICAgICAgdGhpcy5sZW5ndGggPSA1O1xuICAgIH1cblxuICAgIGlmIChsZW5ndGggPCAyKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gMjtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgaGl0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N1bmsoKSkge1xuICAgICAgICAgICAgdGhpcy5udW1IaXRzICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtSGl0cyA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB7IGxlbmd0aCwgbnVtSGl0czogMCwgaGl0LCBpc1N1bmsgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluR2FtZUJveEV2ZW50c0NiKHVzZXJJbnRlcmZhY2UsIGN1cnJlbnRQbGF5ZXIsIGJveCwgaSkge1xuICAgIGlmIChjdXJyZW50UGxheWVyLmlzVHVybiB8fCB1c2VySW50ZXJmYWNlLmdhbWUud2lubmVyICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKGkgLyAxMCk7XG4gICAgY29uc3QgeSA9IGkgJSAxMDtcbiAgICBjdXJyZW50UGxheWVyLm9wcG9uZW50LmF0dGFjayh4LCB5KTtcbiAgICB1c2VySW50ZXJmYWNlLnVwZGF0ZUJvYXJkKGJveCwgY3VycmVudFBsYXllci5nYW1lYm9hcmQsIGkpO1xuICAgIGJveFtpXS5jbGFzc0xpc3QuYWRkKCduby1ob3ZlcicpO1xuICAgIGlmIChjdXJyZW50UGxheWVyLmlzQ29tcHV0ZXIpIHtcbiAgICAgICAgY29uc3QgcGxheWVyQm94ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQuaHVtYW4nKS5jaGlsZHJlbik7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQXR0YWNrID0gY3VycmVudFBsYXllci5yYW5kb21BdHRhY2soKTtcbiAgICAgICAgdXNlckludGVyZmFjZS51cGRhdGVCb2FyZChwbGF5ZXJCb3gsIGN1cnJlbnRQbGF5ZXIub3Bwb25lbnQuZ2FtZWJvYXJkLCBjb21wdXRlckF0dGFja1swXSAqIDEwICsgY29tcHV0ZXJBdHRhY2tbMV0pO1xuICAgIH1cbiAgICBpZiAodXNlckludGVyZmFjZS5nYW1lLmlzR2FtZU92ZXIoKSkge1xuICAgICAgICBjb25zdCBnYW1lT3ZlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLW92ZXInKTtcbiAgICAgICAgaWYgKHVzZXJJbnRlcmZhY2UuZ2FtZS53aW5uZXIgPT09IHVzZXJJbnRlcmZhY2UuZ2FtZS5wbGF5ZXIpIHtcbiAgICAgICAgICAgIGdhbWVPdmVyLnRleHRDb250ZW50ID0gYExlZnQgYm9hcmQgd2lucyEgUHJlc3MgXCJOZXcgR2FtZVwiIHRvIHBsYXkgYWdhaW4hYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdhbWVPdmVyLnRleHRDb250ZW50ID0gYFJpZ2h0IGJvYXJkIHdpbnMhIFByZXNzIFwiTmV3IEdhbWVcIiB0byBwbGF5IGFnYWluIWA7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBcIm5vcm1hbGl6ZS5jc3NcIjtcbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5pbXBvcnQgSW50ZXJmYWNlIGZyb20gJy4vSW50ZXJmYWNlJztcbmltcG9ydCBuZXdHYW1lIGZyb20gJy4vbmV3R2FtZSdcblxuXG4vLyBjb25zdCBteUdhbWUgPSBHYW1lKCk7XG4vLyBteUdhbWUuZ2FtZVNldFVwKCk7XG4vLyBteUdhbWUuc3RhcnRHYW1lKCk7XG5cbmNvbnN0IG15R2FtZSA9IEdhbWUoKTtcbmNvbnN0IG15VUkgPSBJbnRlcmZhY2UobXlHYW1lKTtcbm5ld0dhbWUobXlVSSk7XG5cbm15VUkuaW50ZXJmYWNlU2V0VXAoKTtcbi8vIG15VUkuY3JlYXRlQm9hcmQodHJ1ZSk7XG4vLyBteVVJLmNyZWF0ZUJvYXJkKGZhbHNlKTtcblxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXZlbnRzKG15SW50ZXJmYWNlKSB7XG4gICAgY29uc3QgbmV3R2FtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctZ2FtZScpO1xuICAgIG5ld0dhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGdhbWVPdmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtb3ZlcicpO1xuICAgICAgICBnYW1lT3Zlci50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICBteUludGVyZmFjZS5pbnRlcmZhY2VTZXRVcCgpO1xuICAgIH0pXG59IiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJztcbmltcG9ydCBpbkdhbWVCb3hFdmVudHNDYiBmcm9tICcuL2luR2FtZUJveEV2ZW50c0NiJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJlR2FtZUJveEV2ZW50c0NiKHVzZXJJbnRlcmZhY2UsIGN1cnJlbnRQbGF5ZXIsIGJveCwgaSwgc2hpcERpcikge1xuICAgIGlmICghY3VycmVudFBsYXllci5pc0NvbXB1dGVyKSB7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKGkgLyAxMCk7XG4gICAgICAgIGNvbnN0IHkgPSBpICUgMTA7XG4gICAgICAgIGlmIChjdXJyZW50UGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoU2hpcChjdXJyZW50UGxheWVyLnNoaXBMZW5bMF0pLCBzaGlwRGlyLCB4LCB5KSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjdXJyZW50UGxheWVyLnNoaXBMZW5bMF07IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChzaGlwRGlyID09PSAnaG9yeicpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlckludGVyZmFjZS51cGRhdGVCb2FyZChib3gsIGN1cnJlbnRQbGF5ZXIuZ2FtZWJvYXJkLCBpK2opO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJbnRlcmZhY2UudXBkYXRlQm9hcmQoYm94LCBjdXJyZW50UGxheWVyLmdhbWVib2FyZCwgaSArICgxMCAqIGopKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50UGxheWVyLnNoaXBMZW4uc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudFBsYXllci5zaGlwTGVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdXNlckludGVyZmFjZS5jcmVhdGVCb2FyZChjdXJyZW50UGxheWVyLCBpbkdhbWVCb3hFdmVudHNDYik7XG4gICAgICAgICAgICB1c2VySW50ZXJmYWNlLmNyZWF0ZUJvYXJkKGN1cnJlbnRQbGF5ZXIub3Bwb25lbnQsIGluR2FtZUJveEV2ZW50c0NiKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmVHYW1lSG92ZXJDYihjdXJyZW50UGxheWVyLCBib3gsIGksIHNoaXBEaXIpIHtcbiAgICBpZiAoIWN1cnJlbnRQbGF5ZXIuaXNDb21wdXRlcikge1xuICAgICAgICBjb25zdCBzaGlwSW5kcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGN1cnJlbnRQbGF5ZXIuc2hpcExlblswXTsgaisrKSB7XG4gICAgICAgICAgICBpZiAoc2hpcERpciA9PT0gJ2hvcnonKSB7XG4gICAgICAgICAgICAgICAgc2hpcEluZHMucHVzaChpICsgaik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNoaXBJbmRzLnB1c2goaSArICgxMCAqIGopKTtcbiAgICAgICAgICAgICAgICBib3hbaSArICgxMCAqIGopXS5jbGFzc0xpc3QuYWRkKCdmYWtlLWhvdmVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib3gubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChzaGlwSW5kcy5pbmNsdWRlcyhqKSkge1xuICAgICAgICAgICAgICAgIGJveFtqXS5jbGFzc0xpc3QuYWRkKCdmYWtlLWhvdmVyJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJveFtqXS5jbGFzc0xpc3QucmVtb3ZlKCdmYWtlLWhvdmVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbIlBsYXllciIsIkdhbWVib2FyZCIsIlNoaXAiLCJHYW1lIiwid2lubmVyIiwicGxheWVyIiwiY29tcHV0ZXIiLCJnYW1lU2V0VXAiLCJwbGF5ZXJCb2FyZCIsImNvbXB1dGVyQm9hcmQiLCJzZXRPcHBvbmVudCIsImlzVHVybiIsInNldENvbXB1dGVyU2hpcHMiLCJjdXJyZW50UGxheWVyIiwiU0hJUF9MRU5HVEhTIiwiQk9BUkRfTEVOR1RIIiwiZGlyZWN0aW9uIiwibGVuZ3RoIiwic2hpcERpciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIngiLCJ5IiwiZ2FtZWJvYXJkIiwicGxhY2VTaGlwIiwic2hpZnQiLCJpc0dhbWVPdmVyIiwiYWxsU2hpcHNTdW5rIiwic2hpcHMiLCJjcmVhdGVCb2FyZCIsImFycmF5IiwiQXJyYXkiLCJpIiwiaXNTcGFjZUZyZWUiLCJib2FyZCIsInVuZGVmaW5lZCIsInNoaXAiLCJ0ZW1wQm9hcmQiLCJjb29yZHMiLCJwdXNoIiwiZm9yRWFjaCIsIml0ZW0iLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwicmVkdWNlIiwiYWxsU2hpcHMiLCJjdXJyZW50U2hpcCIsImlzU3VuayIsInByZUdhbWVCb3hFdmVudHNDYiIsInByZUdhbWVIb3ZlckNiIiwiSW50ZXJmYWNlIiwiZ2FtZSIsInZlcnRCdXR0b24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJob3J6QnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImludGVyZmFjZVNldFVwIiwiY2xpY2tDYiIsIm1vdXNlb3ZlckNiIiwiYXJndW1lbnRzIiwiY29udGFpbmVyIiwiYm94IiwiaXNDb21wdXRlciIsImlubmVySFRNTCIsImNyZWF0ZUVsZW1lbnQiLCJ1cGRhdGVCb2FyZCIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJvcHBvbmVudCIsInNoaXBMZW4iLCJyYW5kb21BdHRhY2siLCJhdHRhY2siLCJtYWRlTW92ZSIsImNoYW5nZVR1cm4iLCJudW1IaXRzIiwiaW5HYW1lQm94RXZlbnRzQ2IiLCJ1c2VySW50ZXJmYWNlIiwicGxheWVyQm94IiwiZnJvbSIsImNoaWxkcmVuIiwiY29tcHV0ZXJBdHRhY2siLCJnYW1lT3ZlciIsInRleHRDb250ZW50IiwibmV3R2FtZSIsIm15R2FtZSIsIm15VUkiLCJldmVudHMiLCJteUludGVyZmFjZSIsIm5ld0dhbWVCdXR0b24iLCJqIiwic2hpcEluZHMiLCJpbmNsdWRlcyJdLCJzb3VyY2VSb290IjoiIn0=