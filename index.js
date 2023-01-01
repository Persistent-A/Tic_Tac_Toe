const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

const playerType = prompt('Type player2 mode (H-human, C-computer): ');
startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once: true})
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    if (playerType.toLowerCase() === 'c') {
      player2Name.innerHTML = 'Computer : '
      computer(currentClass)
    }
    setBoardHoverClass()
  }
}

function computer(currentClass){
  currentClass = CIRCLE_CLASS
  console.log(currentClass)
  const emptyCell = []
  cellElements.forEach((cell,index)=> {
    if (cell.className === 'cell') {
      emptyCell.push(index) 
    }
  })
  const random = emptyCell[Math.ceil(Math.random() * emptyCell.length) - 1]
  cellElements[random].classList.add(CIRCLE_CLASS);
  // circleTurn = !circleTurn
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
  swapTurns()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
    drawCount.innerHTML++
    gamePlayed.innerHTML++ 
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? `${player2Name.innerHTML}` : `${player1Name.innerHTML}`} Wins!`
    gamePlayed.innerHTML++  
    if (circleTurn) {
      player2Score.innerHTML++;
    }
    else {
      player1Score.innerHTML++;
    }
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  // if (playerType === 'H') {
    circleTurn = !circleTurn
  // }
  // else {
    // circleTurn = !circleTurn
    // computer()
  // }
  // circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

// Player Name change

const player1Name = document.querySelector('.player1Name');
const player2Name = document.querySelector('.player2Name');
player1Name.addEventListener('click', changeName);
player2Name.addEventListener('click', changeName);

function changeName(e) {
  console.log(e.target.className)
  if (e.target.className == 'player1Name') {
    const Name = prompt(`Enter player1 Name: `);
    player1Name.innerHTML = `${Name} : `;
  }

  if (e.target.className == 'player2Name') {
    const Name = prompt(`Enter player2 Name: `);
    player2Name.innerHTML = `${Name} : `;
  }
}

//Player Score Change 

const player1Score = document.querySelector('.player1Score')
const player2Score = document.querySelector('.player2Score')

// Game Played and Draw count
const gamePlayed = document.querySelector('.gamePlayedCount');
const drawCount = document.querySelector('.drawCount');
