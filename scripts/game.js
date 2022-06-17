// DOM SELECTORS
const cells = document.querySelectorAll('.items')
const boardCons = document.querySelector('.board-container')
const xSelect = document.querySelector('[data-x-selection]')
const oSelect = document.querySelector('[data-o-selection]')
const redo = document.querySelector('.redo')
const reset = document.querySelector('.reset')
const undo = document.querySelector('.undo')
const interf = document.querySelector('.interface-con')
const historyBtn = document.querySelector('.historyBtn')
const modal = document.querySelector('.modalbg')
const closeModalBtn = document.querySelector('.close')
const modalList = document.querySelectorAll('.lists')

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
let historyList = []
let historyPosition = ['Top-left', 'Top-middle', 'Top-right', 'Center-left', 'Center-middle', 'Center-right', 'Bottom-left', 'Bottom-middle', 'Bottom-right']
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
   this.color = color
}

const xPlayer = new Player('x', 'var(--primary--blue)')
const oPlayer = new Player('o', 'var(--primary--pink)')
// Event Listeners

xSelect.addEventListener('click', startX)
oSelect.addEventListener('click', startO)

undo.addEventListener('click', () => {
   if (historyClone[historyClone.length - 1] === boardhistory[0]) {
      boardCons.classList.add('shake')
      boardCons.addEventListener('animationend', () => {
         boardCons.classList.remove('shake')
      })
      return
   }
   reOrder(historyClone, historyClone.length - 1, 0)
   boardState = historyClone[historyClone.length - 1]
   changeState()
})

redo.addEventListener('click', () => {
   if (historyClone[historyClone.length - 1] === boardhistory[boardhistory.length - 1]) {
      boardCons.classList.add('shake')
      boardCons.addEventListener('animationend', () => {
         boardCons.classList.remove('shake')
      })
      return
   }
   reOrder(historyClone, 0, historyClone.length - 1)
   boardState = historyClone[historyClone.length - 1]
   changeState()
})

reset.addEventListener('click', restart)

historyBtn.addEventListener('click', () => {
   modal.style.display = 'block'
})

closeModalBtn.addEventListener('click', () => {
   modal.style.display = 'none'
})

//FUNCTIONS
function startX() {
   currentPlayer = xPlayer.character
   firstChoice = xPlayer.character

   startGame()
}

function startO() {
   currentPlayer = oPlayer.character
   firstChoice = oPlayer.character

   startGame()
}

function startGame() {
   gameWon = false
   gameDraw = false
   boardState = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
   ]

   boardhistory = []
   indexMove = []
   historyList = []
   changeState()
   hideBtns()

   cellArr.forEach((element, index) => {
      element.classList.remove('changeCol')
      element.style.pointerEvents = 'all'
      element.removeEventListener('click', handleClick)
      element.addEventListener('click', handleClick, { once: true })
      element.addEventListener(
         'click',
         () => {
            indexMove.push(index)
            createList(index)
         },
         { once: true }
      )
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
         changeColor(a, b, c)
      }
   }

   if (!newBoard.includes('') && gameWon === false) {
      gameDraw = true
      boardCons.classList.add('shake')
      boardCons.addEventListener('animationend', () => {
         boardCons.classList.remove('shake')
      })

      showButtons()
      stopGame()
   }
}

function showButtons() {
   historyBtn.style.visibility = 'visible'
   historyBtn.style.pointerEvents = 'all'
   redo.style.pointerEvents = 'all'
   undo.style.pointerEvents = 'all'
   redo.style.visibility = 'visible'
   undo.style.visibility = 'visible'
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
   modalList.forEach(element => (element.textContent = ''))
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
   redo.style.pointerEvents = 'none'
   undo.style.pointerEvents = 'none'
   redo.style.visibility = 'hidden'
   undo.style.visibility = 'hidden'
   historyBtn.style.visibility = 'hidden'
   historyBtn.style.pointerEvents = 'none'
}

function createList(index) {
   historyList.push(historyPosition[index])
   modalDisplay()
}

function modalDisplay() {
   for (i = 0; i < historyList.length; i++) {
      modalList[i].textContent = `${i + 1}.) ${historyList[i]}`
   }
}

function changeColor(a, b, c) {
   a.classList.add('changeCol')
   b.classList.add('changeCol')
   c.classList.add('changeCol')
}
