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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFpQixDQUFDO01BQzNEQyxhQUFhLENBQUNqRCxXQUFXLENBQUNqQixhQUFhLENBQUMwRCxRQUFRLEVBQUVPLDBEQUFpQixDQUFDO0lBQ3hFO0VBQ0o7QUFDSjs7Ozs7Ozs7Ozs7QUN0QkE7Ozs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9HYW1lLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvSW50ZXJmYWNlLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2luR2FtZUJveEV2ZW50c0NiLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9uZXdHYW1lLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvcHJlR2FtZUJveEV2ZW50c0NiLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzP2ZiNTciLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9zdHlsZS5jc3M/ZTMyMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJ1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL0dhbWVib2FyZCc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lKCkge1xuICAgIFxuICAgIGNvbnN0IHdpbm5lciA9IG51bGw7XG4gICAgY29uc3QgcGxheWVyID0gbnVsbDtcbiAgICBjb25zdCBjb21wdXRlciA9IG51bGw7XG5cbiAgICAvLyBDcmVhdGUgaHVtYW4gYW5kIGNvbXB1dGVyIHBsYXllcnMgYW5kIGJvYXJkc1xuICAgIGNvbnN0IGdhbWVTZXRVcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuICAgICAgICBjb25zdCBjb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKCk7XG4gICAgICAgIHRoaXMucGxheWVyID0gUGxheWVyKHBsYXllckJvYXJkKTtcbiAgICAgICAgdGhpcy5jb21wdXRlciA9IFBsYXllcihjb21wdXRlckJvYXJkLCB0cnVlLCB0aGlzLnBsYXllcik7XG4gICAgICAgIHRoaXMucGxheWVyLnNldE9wcG9uZW50KHRoaXMuY29tcHV0ZXIpO1xuICAgICAgICB0aGlzLnBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbXB1dGVyLmlzVHVybiA9IGZhbHNlO1xuICAgICAgICB0aGlzLndpbm5lciA9IG51bGw7XG4gICAgICAgIHRoaXMuc2V0Q29tcHV0ZXJTaGlwcyh0aGlzLmNvbXB1dGVyKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZXRDb21wdXRlclNoaXBzID0gZnVuY3Rpb24oY3VycmVudFBsYXllcikge1xuICAgICAgICBjb25zdCBTSElQX0xFTkdUSFMgPSBbMiwgMywgMywgNCwgNV07IFxuICAgICAgICBjb25zdCBCT0FSRF9MRU5HVEggPSAxMDtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gWydob3J6JywgJ3ZlcnQnXTtcbiAgICAgICAgd2hpbGUgKFNISVBfTEVOR1RIUy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwRGlyID0gTWF0aC5mbG9vcigyICogTWF0aC5yYW5kb20oKSk7XG4gICAgICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQk9BUkRfTEVOR1RIKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9MRU5HVEgpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChTaGlwKFNISVBfTEVOR1RIU1swXSksIGRpcmVjdGlvbltzaGlwRGlyXSwgeCwgeSkpIHtcbiAgICAgICAgICAgICAgICBTSElQX0xFTkdUSFMuc2hpZnQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc0dhbWVPdmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnBsYXllci5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICAgIHRoaXMud2lubmVyID0gdGhpcy5jb21wdXRlcjtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAodGhpcy5jb21wdXRlci5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICAgIHRoaXMud2lubmVyID0gdGhpcy5wbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMud2lubmVyICE9IG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4geyBwbGF5ZXIsIGNvbXB1dGVyLCB3aW5uZXIsIGdhbWVTZXRVcCwgaXNHYW1lT3Zlciwgc2V0Q29tcHV0ZXJTaGlwcyB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuICAgIFxuICAgIGNvbnN0IHNoaXBzID0gW107XG5cbiAgICBjb25zdCBjcmVhdGVCb2FyZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBCT0FSRF9MRU5HVEggPSAxMDtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBBcnJheSgxMCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBCT0FSRF9MRU5HVEg7IGkrKykge1xuICAgICAgICAgICAgYXJyYXlbaV0gPSBBcnJheSgxMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cblxuICAgIGNvbnN0IGlzU3BhY2VGcmVlID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt4XVt5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgYm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuXG4gICAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24oc2hpcCwgZGlyZWN0aW9uLCB4LCB5KSB7XG4gICAgICAgIGNvbnN0IEJPQVJEX0xFTkdUSCA9IDEwO1xuICAgICAgICBjb25zdCB0ZW1wQm9hcmQgPSB0aGlzLmJvYXJkO1xuICAgICAgICBjb25zdCBjb29yZHMgPSBbXTtcbiAgICAgICAgaWYgKHggPCAwIHx8IHkgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdob3J6Jykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHk7IGkgPCB5ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpIDwgQk9BUkRfTEVOR1RIICYmIHRoaXMuaXNTcGFjZUZyZWUoeCwgaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29vcmRzLnB1c2goW3gsIGldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7IC8vIGRlZmF1bHQgdG8gdmVydGljYWwgb3JpZW50YXRpb25cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB4OyBpIDwgeCArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IEJPQVJEX0xFTkdUSCAmJiB0aGlzLmlzU3BhY2VGcmVlKGksIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvb3Jkcy5wdXNoKFtpLCB5XSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgIGNvb3Jkcy5mb3JFYWNoKCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGVtcEJvYXJkW2l0ZW1bMF1dW2l0ZW1bMV1dID0gc2hpcDtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt4XVt5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ21pc3MnO1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbeF1beV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0KCk7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ2hpdCc7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2hpcHMucmVkdWNlKChhbGxTaGlwcywgY3VycmVudFNoaXApID0+IGFsbFNoaXBzICYmIGN1cnJlbnRTaGlwLmlzU3VuaygpLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBib2FyZCwgcGxhY2VTaGlwLCBpc1NwYWNlRnJlZSwgcmVjZWl2ZUF0dGFjaywgYWxsU2hpcHNTdW5rIH1cblxufSIsIi8vIGltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5pbXBvcnQgcHJlR2FtZUJveEV2ZW50c0NiIGZyb20gJy4vcHJlR2FtZUJveEV2ZW50c0NiJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW50ZXJmYWNlKGdhbWUpIHtcbiAgICBsZXQgc2hpcERpciA9ICdob3J6JztcblxuICAgIGNvbnN0IHZlcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmVydCcpO1xuXG4gICAgdmVydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgc2hpcERpciA9ICd2ZXJ0JztcbiAgICB9KVxuXG4gICAgY29uc3QgaG9yekJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3J6Jyk7XG5cbiAgICBob3J6QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBzaGlwRGlyID0gJ2hvcnonO1xuICAgIH0pXG5cbiAgICBjb25zdCBpbnRlcmZhY2VTZXRVcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmdhbWUuZ2FtZVNldFVwKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQm9hcmQodGhpcy5nYW1lLnBsYXllciwgcHJlR2FtZUJveEV2ZW50c0NiKTtcbiAgICAgICAgdGhpcy5jcmVhdGVCb2FyZCh0aGlzLmdhbWUuY29tcHV0ZXIsIHByZUdhbWVCb3hFdmVudHNDYik7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlQm9hcmQgPSBmdW5jdGlvbihjdXJyZW50UGxheWVyLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBCT0FSRF9MRU5HVEggPSAxMDtcbiAgICAgICAgbGV0IGNvbnRhaW5lcjtcbiAgICAgICAgY29uc3QgYm94ID0gW107XG5cbiAgICAgICAgaWYgKCFjdXJyZW50UGxheWVyLmlzQ29tcHV0ZXIpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC5odW1hbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLmNvbXB1dGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQk9BUkRfTEVOR1RIKioyOyBpKyspIHtcbiAgICAgICAgICAgIGJveFtpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYm94W2ldLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLWJveCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRQbGF5ZXIuaXNDb21wdXRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQm9hcmQoYm94LCBjdXJyZW50UGxheWVyLmdhbWVib2FyZCwgaSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb29wLWZ1bmNcbiAgICAgICAgICAgIGJveFtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLCBjdXJyZW50UGxheWVyLCBib3gsIGksIHNoaXBEaXIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib3hbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlQm9hcmQgPSBmdW5jdGlvbihib3gsIGdhbWVib2FyZCwgaSkge1xuICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihpIC8gMTApO1xuICAgICAgICBjb25zdCB5ID0gaSAlIDEwO1xuICAgICAgICBpZiAodHlwZW9mIGdhbWVib2FyZC5ib2FyZFt4XVt5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGJveFtpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmxhY2snO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGdhbWVib2FyZC5ib2FyZFt4XVt5XSA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICBib3hbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyYXknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGdhbWVib2FyZC5ib2FyZFt4XVt5XSA9PT0gJ2hpdCcpIHtcbiAgICAgICAgICAgIGJveFtpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7ICBnYW1lLCBjcmVhdGVCb2FyZCwgaW50ZXJmYWNlU2V0VXAsIHVwZGF0ZUJvYXJkIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBsYXllcihnYW1lYm9hcmQsIGlzQ29tcHV0ZXIgPSBmYWxzZSwgb3Bwb25lbnQgPSBudWxsLCBpc1R1cm4gPSBmYWxzZSkge1xuICAgIFxuICAgIGNvbnN0IHNoaXBMZW4gPSBbMiwgMywgMywgNCwgNV07IFxuXG4gICAgY29uc3Qgc2V0T3Bwb25lbnQgPSBmdW5jdGlvbihwbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5vcHBvbmVudCA9IHBsYXllcjtcbiAgICB9XG5cblxuICAgIGNvbnN0IHJhbmRvbUF0dGFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBCT0FSRF9MRU5HVEggPSAxMDtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGxldCB5O1xuICAgICAgICB3aGlsZSAodGhpcy5pc1R1cm4pIHtcbiAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9MRU5HVEgpO1xuICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX0xFTkdUSCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjayh4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3gsIHldXG4gICAgfVxuXG4gICAgY29uc3QgYXR0YWNrID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICBpZiAodGhpcy5vcHBvbmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWFkZU1vdmUgPSB0aGlzLm9wcG9uZW50LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgICAgICBpZiAobWFkZU1vdmUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVHVybigpO1xuICAgICAgICAgICAgdGhpcy5vcHBvbmVudC5jaGFuZ2VUdXJuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VUdXJuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuaXNUdXJuID0gIXRoaXMuaXNUdXJuO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4geyBnYW1lYm9hcmQsIGlzQ29tcHV0ZXIsIG9wcG9uZW50LCBpc1R1cm4sIHNoaXBMZW4sIFxuICAgICAgICBzZXRPcHBvbmVudCwgYXR0YWNrLCByYW5kb21BdHRhY2ssIGNoYW5nZVR1cm4gfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNoaXAobGVuZ3RoKSB7XG4gICAgaWYgKGxlbmd0aCA+IDUpIHsgXG4gICAgICAgIHRoaXMubGVuZ3RoID0gNTtcbiAgICB9XG5cbiAgICBpZiAobGVuZ3RoIDwgMikge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDI7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGhpdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIHRoaXMubnVtSGl0cyArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm51bUhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBsZW5ndGgsIG51bUhpdHM6IDAsIGhpdCwgaXNTdW5rIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbkdhbWVCb3hFdmVudHNDYih1c2VySW50ZXJmYWNlLCBjdXJyZW50UGxheWVyLCBib3gsIGkpIHtcbiAgICBpZiAoY3VycmVudFBsYXllci5pc1R1cm4gfHwgdXNlckludGVyZmFjZS5nYW1lLndpbm5lciAhPSBudWxsKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihpIC8gMTApO1xuICAgIGNvbnN0IHkgPSBpICUgMTA7XG4gICAgY3VycmVudFBsYXllci5vcHBvbmVudC5hdHRhY2soeCwgeSk7XG4gICAgdXNlckludGVyZmFjZS51cGRhdGVCb2FyZChib3gsIGN1cnJlbnRQbGF5ZXIuZ2FtZWJvYXJkLCBpKTtcbiAgICBib3hbaV0uY2xhc3NMaXN0LmFkZCgnbm8taG92ZXInKTtcbiAgICBpZiAoY3VycmVudFBsYXllci5pc0NvbXB1dGVyKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckJveCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLmh1bWFuJykuY2hpbGRyZW4pO1xuICAgICAgICBjb25zdCBjb21wdXRlckF0dGFjayA9IGN1cnJlbnRQbGF5ZXIucmFuZG9tQXR0YWNrKCk7XG4gICAgICAgIHVzZXJJbnRlcmZhY2UudXBkYXRlQm9hcmQocGxheWVyQm94LCBjdXJyZW50UGxheWVyLm9wcG9uZW50LmdhbWVib2FyZCwgY29tcHV0ZXJBdHRhY2tbMF0gKiAxMCArIGNvbXB1dGVyQXR0YWNrWzFdKTtcbiAgICB9XG4gICAgaWYgKHVzZXJJbnRlcmZhY2UuZ2FtZS5pc0dhbWVPdmVyKCkpIHtcbiAgICAgICAgY29uc3QgZ2FtZU92ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1vdmVyJyk7XG4gICAgICAgIGlmICh1c2VySW50ZXJmYWNlLmdhbWUud2lubmVyID09PSB1c2VySW50ZXJmYWNlLmdhbWUucGxheWVyKSB7XG4gICAgICAgICAgICBnYW1lT3Zlci50ZXh0Q29udGVudCA9IGBMZWZ0IGJvYXJkIHdpbnMhIFByZXNzIFwiTmV3IEdhbWVcIiB0byBwbGF5IGFnYWluIWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lT3Zlci50ZXh0Q29udGVudCA9IGBSaWdodCBib2FyZCB3aW5zISBQcmVzcyBcIk5ldyBHYW1lXCIgdG8gcGxheSBhZ2FpbiFgO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgXCJub3JtYWxpemUuY3NzXCI7XG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnO1xuaW1wb3J0IEludGVyZmFjZSBmcm9tICcuL0ludGVyZmFjZSc7XG5pbXBvcnQgbmV3R2FtZSBmcm9tICcuL25ld0dhbWUnXG5cblxuLy8gY29uc3QgbXlHYW1lID0gR2FtZSgpO1xuLy8gbXlHYW1lLmdhbWVTZXRVcCgpO1xuLy8gbXlHYW1lLnN0YXJ0R2FtZSgpO1xuXG5jb25zdCBteUdhbWUgPSBHYW1lKCk7XG5jb25zdCBteVVJID0gSW50ZXJmYWNlKG15R2FtZSk7XG5uZXdHYW1lKG15VUkpO1xuXG5teVVJLmludGVyZmFjZVNldFVwKCk7XG4vLyBteVVJLmNyZWF0ZUJvYXJkKHRydWUpO1xuLy8gbXlVSS5jcmVhdGVCb2FyZChmYWxzZSk7XG5cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV2ZW50cyhteUludGVyZmFjZSkge1xuICAgIGNvbnN0IG5ld0dhbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWdhbWUnKTtcbiAgICBuZXdHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBnYW1lT3ZlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLW92ZXInKTtcbiAgICAgICAgZ2FtZU92ZXIudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgbXlJbnRlcmZhY2UuaW50ZXJmYWNlU2V0VXAoKTtcbiAgICB9KVxufSIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5pbXBvcnQgaW5HYW1lQm94RXZlbnRzQ2IgZnJvbSAnLi9pbkdhbWVCb3hFdmVudHNDYic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZUdhbWVCb3hFdmVudHNDYih1c2VySW50ZXJmYWNlLCBjdXJyZW50UGxheWVyLCBib3gsIGksIHNoaXBEaXIpIHtcbiAgICBpZiAoIWN1cnJlbnRQbGF5ZXIuaXNDb21wdXRlcikge1xuICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihpIC8gMTApO1xuICAgICAgICBjb25zdCB5ID0gaSAlIDEwO1xuICAgICAgICBpZiAoY3VycmVudFBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKFNoaXAoY3VycmVudFBsYXllci5zaGlwTGVuWzBdKSwgc2hpcERpciwgeCwgeSkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY3VycmVudFBsYXllci5zaGlwTGVuWzBdOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcERpciA9PT0gJ2hvcnonKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJbnRlcmZhY2UudXBkYXRlQm9hcmQoYm94LCBjdXJyZW50UGxheWVyLmdhbWVib2FyZCwgaStqKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1c2VySW50ZXJmYWNlLnVwZGF0ZUJvYXJkKGJveCwgY3VycmVudFBsYXllci5nYW1lYm9hcmQsIGkgKyAoMTAgKiBqKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudFBsYXllci5zaGlwTGVuLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIuc2hpcExlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHVzZXJJbnRlcmZhY2UuY3JlYXRlQm9hcmQoY3VycmVudFBsYXllciwgaW5HYW1lQm94RXZlbnRzQ2IpO1xuICAgICAgICAgICAgdXNlckludGVyZmFjZS5jcmVhdGVCb2FyZChjdXJyZW50UGxheWVyLm9wcG9uZW50LCBpbkdhbWVCb3hFdmVudHNDYik7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbIlBsYXllciIsIkdhbWVib2FyZCIsIlNoaXAiLCJHYW1lIiwid2lubmVyIiwicGxheWVyIiwiY29tcHV0ZXIiLCJnYW1lU2V0VXAiLCJwbGF5ZXJCb2FyZCIsImNvbXB1dGVyQm9hcmQiLCJzZXRPcHBvbmVudCIsImlzVHVybiIsInNldENvbXB1dGVyU2hpcHMiLCJjdXJyZW50UGxheWVyIiwiU0hJUF9MRU5HVEhTIiwiQk9BUkRfTEVOR1RIIiwiZGlyZWN0aW9uIiwibGVuZ3RoIiwic2hpcERpciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIngiLCJ5IiwiZ2FtZWJvYXJkIiwicGxhY2VTaGlwIiwic2hpZnQiLCJpc0dhbWVPdmVyIiwiYWxsU2hpcHNTdW5rIiwic2hpcHMiLCJjcmVhdGVCb2FyZCIsImFycmF5IiwiQXJyYXkiLCJpIiwiaXNTcGFjZUZyZWUiLCJib2FyZCIsInVuZGVmaW5lZCIsInNoaXAiLCJ0ZW1wQm9hcmQiLCJjb29yZHMiLCJwdXNoIiwiZm9yRWFjaCIsIml0ZW0iLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwicmVkdWNlIiwiYWxsU2hpcHMiLCJjdXJyZW50U2hpcCIsImlzU3VuayIsInByZUdhbWVCb3hFdmVudHNDYiIsIkludGVyZmFjZSIsImdhbWUiLCJ2ZXJ0QnV0dG9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhvcnpCdXR0b24iLCJpbnRlcmZhY2VTZXRVcCIsImNhbGxiYWNrIiwiY29udGFpbmVyIiwiYm94IiwiaXNDb21wdXRlciIsImlubmVySFRNTCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ1cGRhdGVCb2FyZCIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhcmd1bWVudHMiLCJvcHBvbmVudCIsInNoaXBMZW4iLCJyYW5kb21BdHRhY2siLCJhdHRhY2siLCJtYWRlTW92ZSIsImNoYW5nZVR1cm4iLCJudW1IaXRzIiwiaW5HYW1lQm94RXZlbnRzQ2IiLCJ1c2VySW50ZXJmYWNlIiwicGxheWVyQm94IiwiZnJvbSIsImNoaWxkcmVuIiwiY29tcHV0ZXJBdHRhY2siLCJnYW1lT3ZlciIsInRleHRDb250ZW50IiwibmV3R2FtZSIsIm15R2FtZSIsIm15VUkiLCJldmVudHMiLCJteUludGVyZmFjZSIsIm5ld0dhbWVCdXR0b24iLCJqIl0sInNvdXJjZVJvb3QiOiIifQ==