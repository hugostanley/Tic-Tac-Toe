// DOM SELECTORS
let cells = document.querySelectorAll('.items')
const xSelect = document.querySelector('[data-x-selection]')
const oSelect = document.querySelector('[data-o-selection]')
const btns = document.querySelectorAll('.btns')
const redo = document.querySelector('.redo')
const reset = document.querySelector('.reset')
const undo = document.querySelector('.undo')

// Reusable Variables
let cellArr = [...cells]
let choice = ''
let gameState = 'unstarted'
let boardState = [
   ['', '', ''],
   ['', '', ''],
   ['', '', ''],
]
let boardhistory = []
let historyClone = boardhistory
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

// Event Listeners

xSelect.addEventListener('click', () => {
   choice = 'x'
   console.log(choice)
   startGame()
})

oSelect.addEventListener('click', () => {
   choice = 'o'
   console.log(choice)
   startGame()
})

undo.addEventListener('click', () => {
   reOrder(historyClone, historyClone.length - 1, 0)
   boardState = historyClone[historyClone.length - 1]
   changeState()
})

redo.addEventListener('click', () => {
   reOrder(historyClone, 0, historyClone.length - 1)
   boardState = historyClone[historyClone.length - 1]
   changeState()
})

//FUNCTIONS
function startGame() {
   cellArr.forEach(element => {
      element.addEventListener(
         'click',
         e => {
            updateBoardState(element)
            displayCell(element)
            alterSelection(element)
            updateHistory()
            if (boardhistory.length > 4) {
               validateGameState()
            }
         },
         { once: true }
      )
   })
}

function alterSelection(a) {
   if (choice === 'x') {
      choice = 'o'
      a.classList.add('x-color')
   } else {
      choice = 'x'
      a.classList.add('o-color')
   }
}

function updateBoardState(a) {
   let index = cellArr.indexOf(a)
   let y = Math.floor(index / 3)
   let x = index % 3
   boardState[y][x] = choice
   return boardState
}

function displayCell(a) {
   let index = cellArr.indexOf(a)
   let y = Math.floor(index / 3)
   let x = index % 3
   a.textContent = boardState[y][x]
}

function updateHistory() {
   boardhistory.push(JSON.parse(JSON.stringify(boardState)))
}

function validateGameState(element) {
   for (i = 0; i < winCond.length; i++) {
      const item = winCond[i]
      const a = cellArr[item[0]]
      const b = cellArr[item[1]]
      const c = cellArr[item[2]]

      if (a.textContent === '' && b.textContent === '' && c.textContent === '') {
         return
      } else if (a.textContent === b.textContent && b.textContent === c.textContent) {
         gameState = 'win'
         showButtons()
         stopGame()
      } else if (gameState !== 'win' && boardhistory.length === 9) {
         gameState = 'draw'
         console.log('draw')
      }
   }
}

function showButtons() {
   if (gameState === 'win' || gameState === 'draw') {
      btns.forEach(element => {
         element.style.pointerEvents = 'all'
         element.style.display = 'block'
      })
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

function stopGame() {
   cellArr.forEach(element => {
      element.style.pointerEvents = 'none'
   })
}

function reOrder(arr, from, to) {
   arr.splice(to, 0, arr.splice(from, 1)[0])
}

reset.addEventListener('click', () => {
   boardState = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
   ]
   boardhistory = []
   choice = ''
   changeState()
   startGame()
   return boardState
})
