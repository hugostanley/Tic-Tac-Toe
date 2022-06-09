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
      element.addEventListener('click', e => {
         element.textContent = choice

         if (choice === 'x') {
            choice = 'o'
         } else {
            choice = 'x'
         }
         element.style.pointerEvents = 'none'
         let index = itemArr.indexOf(element)
         let y = Math.floor(index / 3)
         let x = index % 3

         boardState[y][x] = element.textContent

         // check()

         boardhistory.push(JSON.parse(JSON.stringify(boardState)))
         console.log(boardhistory)
      })
   })
}

