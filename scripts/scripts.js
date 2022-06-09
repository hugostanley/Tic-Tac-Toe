// DOM Selectors
let items = document.querySelectorAll('.items')
const xSelect = document.querySelector('[data-x-selection]')
const oSelect = document.querySelector('[data-o-selection]')
console.log(items)

//Reusable Variables
let choice
let itemArr = [...items]
console.log(itemArr)
let boardState = [
   ['', '', ''],
   ['', '', ''],
   ['', '', ''],
]
let boardhistory = []

//Event Listeners

xSelect.addEventListener('click', () => {
   choice = 'x'
   console.log(choice)
   tryit()
   xSelect.style.pointerEvents = 'none'
   oSelect.style.pointerEvents = 'none'
})

oSelect.addEventListener('click', () => {
   choice = 'o'
   console.log(choice)
   tryit()
   oSelect.style.pointerEvents = 'none'
   xSelect.style.pointerEvents = 'none'
})

//FUnctions

function tryit() {
   itemArr.forEach(element => {
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
            let index = itemArr.indexOf(element)
            let y = Math.floor(index / 3)
            let x = index % 3

            boardState[y][x] = element.textContent

            boardhistory.push(JSON.parse(JSON.stringify(boardState)))
            winGame()
         },
         { once: true }
        
      ) // you can only click on a cell once
    
   })
   console.log(boardState)
   
}

const winCond = [
   // x axis
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   // y axis
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   // diagonal
   [0, 4, 8],
   [2, 4, 6],
]

function winGame() {
   for (i = 0; i < winCond.length; i++) {
      const item = winCond[i]
      const a = itemArr[item[0]]
      const b = itemArr[item[1]]
      const c = itemArr[item[2]]
     
      if (a.textContent === '' && b.textContent === '' && c.textContent === ''){
         return
      } else if (a.textContent === b.textContent && b.textContent === c.textContent) {
         console.log('winnerr')
      } 
   }
}
