// DOM SELECTORS
let cells = document.querySelectorAll('.items')
const boardCons = document.querySelector('.board-container')
const xSelect = document.querySelector('[data-x-selection]')
const oSelect = document.querySelector('[data-o-selection]')
const btns = document.querySelectorAll('.btns')
const redo = document.querySelector('.redo')
const reset = document.querySelector('.reset')
const undo = document.querySelector('.undo')
const interf = document.querySelector('.interface-con')

// Reusable Variables
let cellArr = [...cells]
let firstChoice = ''
let currentPlayer = ''
let gameWon = false
let gameDraw = false
let boardState = [
   ['', '', ''],
   ['', '', ''],
   ['', '', ''],
]
let indexMove = []
let historyPosition = [
   'Top-left',
   'Top-middle',
   'Top-right',
   'Center-left',
   'Center-middle',
   'Center-right',
   'Bottom-left',
   'Bottom-middle',
   'Bottom-right',
]
let historyList =[]
let boardhistory = []

const winCond = [
   // x axis
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   // y axis
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   // Diagonal
   [0, 4, 8],
   [2, 4, 6],
]

changeState()

function Player(character, color) {
   this.character = character
   this.score = 0
   this.color = color
}

const xPlayer = new Player('x', 'var(--primary--blue)')
const oPlayer = new Player('o', 'var(--primary--pink)')
// Event Listeners

xSelect.addEventListener('click', startX)
oSelect.addEventListener('click', startO)

function startX() {
   currentPlayer = xPlayer.character
   firstChoice = xPlayer.character
   console.log(currentPlayer)
   startGame()
}

function startO() {
   currentPlayer = oPlayer.character
   firstChoice = oPlayer.character
   console.log(currentPlayer)
   startGame()
}

undo.addEventListener('click', () => {
   if (historyClone[historyClone.length - 1] === boardhistory[0]) {
      return
   }
   reOrder(historyClone, historyClone.length - 1, 0)
   boardState = historyClone[historyClone.length - 1]
   changeState()
})

redo.addEventListener('click', () => {
   if (historyClone[historyClone.length - 1] === boardhistory[boardhistory.length - 1]) {
      return
   }
   reOrder(historyClone, 0, historyClone.length - 1)
   boardState = historyClone[historyClone.length - 1]
   changeState()
})

reset.addEventListener('click', restart)

//FUNCTIONS
function startGame() {
   gameWon = false
   gameDraw = false
   boardState = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
   ]

   boardhistory = []
   changeState()
   hideBtns()

   cellArr.forEach((element, index) => {
      element.style.pointerEvents = 'all'
      element.removeEventListener('click', handleClick)
      element.addEventListener('click', handleClick, { once: true })
      element.addEventListener('click', () => {
         indexMove.push(index)

      },{ once: true })
   })
}

function handleClick(e) {
   let element = e.target
   updateBoardState(element)
   displayCell(element)
   alterSelection(element)
   updateHistory()
   if (boardhistory.length > 4) {
      validateGameState(element)
   }
}
function alterSelection(a) {
   if (currentPlayer === xPlayer.character) {
      currentPlayer = oPlayer.character
      a.style.color = xPlayer.color
   } else {
      currentPlayer = xPlayer.character
      a.style.color = oPlayer.color
   }
}

function updateBoardState(a) {
   if (startGame) {
      let index = cellArr.indexOf(a)
      let y = Math.floor(index / 3)
      let x = index % 3
      boardState[y][x] = currentPlayer
   }
}

function changeState() {
   cellArr.forEach(element => {
      let index = cellArr.indexOf(element)
      let y = Math.floor(index / 3)
      let x = index % 3
      element.textContent = boardState[y][x]
   })
}

function displayCell(a) {
   let index = cellArr.indexOf(a)
   let y = Math.floor(index / 3)
   let x = index % 3
   a.textContent = boardState[y][x]
}

function updateHistory() {
   boardhistory.push(JSON.parse(JSON.stringify(boardState)))
   historyClone = [...boardhistory]
}

function validateGameState(element) {
   let newBoard = boardState.flat()
   for (i = 0; i < winCond.length; i++) {
      const item = winCond[i]
      const a = cellArr[item[0]]
      const b = cellArr[item[1]]
      const c = cellArr[item[2]]

      if (a.textContent === '' && b.textContent === '' && c.textContent === '') {
         continue
      }

      if (a.textContent === b.textContent && b.textContent === c.textContent) {
         gameWon = true
         showButtons()
         stopGame()
         createList()
         // a.classList.add('win')
         // b.classList.add('win')
         // c.classList.add('win')
      }
   }

   if (!newBoard.includes('')) {
      gameDraw = true
      showButtons()
      stopGame()
      createList()
   }
   // highlight()
}

function showButtons() {
   btns.forEach(element => {
      element.style.pointerEvents = 'all'
      element.style.display = 'block'
   })
}

function stopGame() {
   cellArr.forEach(element => {
      element.style.pointerEvents = 'none'
   })
}

function reOrder(arr, from, to) {
   arr.splice(to, 0, arr.splice(from, 1)[0])
}

function restart() {
   currentPlayer = firstChoice
   boardCons.classList.add('flip')
   interf.classList.add('flip')
   startGame()
   boardCons.addEventListener('animationend', () => {
      boardCons.classList.remove('flip')
      interf.classList.remove('flip')
   })
}

function hideBtns() {
   btns.forEach(element => {
      element.style.pointerEvents = 'none'
      element.style.display = 'none'
   })
}

function highlight() {
   for (i = 0; i < winCond.length; i++) {
      const item = winCond[i]
      const a = cellArr[item[0]]
      const b = cellArr[item[1]]
      const c = cellArr[item[2]]

      if (gameWon) {
         a.style.color = 'black'
         b.style.color = 'black'
         c.style.color = 'black'
      }
   }
}

function createList(){
   for(i=0; i<indexMove.length; i++){
      let asd = indexMove[i]
      historyList.push(historyPosition[asd])
      alert(historyList)
   }
}