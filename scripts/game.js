// DOM SELECTORS
let cells = document.querySelectorAll('.items')
const xSelect = document.querySelector('[data-x-selection]')
const oSelect = document.querySelector('[data-o-selection]')


// Reusable Variables
let cellArr = [...cells]
let choice
let clicks = 0

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
}

function updateHistory() {
   boardhistory.push(JSON.parse(JSON.stringify(boardState)))
}

function validateWin() {
   for (i = 0; i < winCond.length; i++) {
      const item = winCond[i]
      const a = cellArr[item[0]]
      const b = cellArr[item[1]]
      const c = cellArr[item[2]]

      if (a.textContent === '' && b.textContent === '' && c.textContent === '') {
         return
      } else if (a.textContent === b.textContent && b.textContent === c.textContent) {
         console.log('winnerr')
         
      }
   }
}

function checkDraw() {
   if (validateWin() === false && clicks === 9) {
      console.log('draw')
   }
}

