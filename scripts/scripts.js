let items = document.querySelectorAll('.items')
const yek = document.querySelector('.eks')
const yow = document.querySelector('.ow')

let choice

let itemArr = [...items]

let boardState = [
   ['', '', ''],
   ['', '', ''],
   ['', '', ''],
]

yek.addEventListener('click', () => {
   choice = 'x'
   console.log(choice)
   tryit()
})

yow.addEventListener('click', () => {
   choice = 'o'
   console.log(choice)
   tryit()
})



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

       check()

      })

      
   })

}

function check() {
   for (i = 0; i < boardState.length; i++) {
      if (i === 0) {
         for (b = 0, a=0; b < boardState[i].length, a< 3; b++, a++) {
            boardState[i][b] = itemArr[a].textContent
         }
      } else if (i ===1){
         for (b = 0, a=3; b < boardState[i].length, a< 6; b++, a++) {
            boardState[i][b] = itemArr[a].textContent
         }
      } else if (i=== 2){
         for (b = 0, a=6; b < boardState[i].length, a< 9; b++, a++) {
            boardState[i][b] = itemArr[a].textContent
         }
      }
   }
}
