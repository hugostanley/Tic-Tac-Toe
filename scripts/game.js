// DOM SELECTORS
let cells = document.querySelectorAll('.items')
const xSelect = document.querySelector('[data-x-selection]')
const oSelect = document.querySelector('[data-o-selection]')

// Reusable Variables
let cellArr = [...cells]

let choice // Either X or O
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
   tryit()
})

oSelect.addEventListener('click', () => {
   choice = 'o'

   console.log(choice)
   tryit()
})

//FUNCTIONS
function tryit() {
   cellArr.forEach(element => {
      element.addEventListener(
         'click',
         e => {
            element.textContent = choice

            if (choice === 'x') {
               choice = 'o'
            } else {
               choice = 'x'
            }
            // element.style.pointerEvents = 'none'
            let index = cellArr.indexOf(element)
            let y = Math.floor(index / 3)
            let x = index % 3

            boardState[y][x] = element.textContent

            boardhistory.push(JSON.parse(JSON.stringify(boardState)))
            validateWin()
         },
         { once: true }
      ) // you can only click on a cell once
   })
   console.log(boardState)
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
