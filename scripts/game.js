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
let choice
let clicks = 0
let gameState = false
let boardState = [
   ['', '', ''],
   ['', '', ''],
   ['', '', ''],
]
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

//FUNCTIONS
function startGame() {
   cellArr.forEach(element => {
      element.addEventListener(
         'click',
         e => {
            clicks++
            element.textContent = choice
            alterSelection(element)
            updateState(element)
            updateHistory()
            validateWin()
            checkDraw()
         
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

function updateState(a) {
   let index = cellArr.indexOf(a)
   let y = Math.floor(index / 3)
   let x = index % 3
   boardState[y][x] = a.textContent
   return boardState
}

function updateHistory() {
   boardhistory.push(JSON.parse(JSON.stringify(boardState)))
}

function validateWin(element) {
   for (i = 0; i < winCond.length; i++) {
      const item = winCond[i]
      const a = cellArr[item[0]]
      const b = cellArr[item[1]]
      const c = cellArr[item[2]]

      if (a.textContent === '' && b.textContent === '' && c.textContent === '') {
         return
      } else if (a.textContent === b.textContent && b.textContent === c.textContent) {
         console.log('winnerr')

         gameState = 'win'
         showButtons()
         cellArr.forEach(element => {
            element.style.pointerEvents = 'none'
         })
         
      }
   }
}

function checkDraw() {
   if (gameState === false && clicks === 9) {
      console.log('draw')
      gameState = 'draw'

      showButtons()
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

undo.addEventListener('click', () => {
 
})

redo.addEventListener('click', () => {
   boardState = boardhistory[boardhistory.indexOf(boardState) + 1]
   changeState()
})

function changeState() {
   cellArr.forEach(element => {
      let index = cellArr.indexOf(element)
      let y = Math.floor(index / 3)
      let x = index % 3
      element.textContent = boardState[y][x]
   })
}
