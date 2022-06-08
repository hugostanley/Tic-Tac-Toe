let items = document.querySelectorAll('.items')
const yek = document.querySelector('.eks')
const yow = document.querySelector('.ow')

let choice

let itemArr = [...items]
console.log(itemArr)

let boardState = [
   ['1', '2', '3'],
   ['2', '3', '4'],
   ['2', '2', '2'],
]

yek.addEventListener('click', () => {
   choice = 'x'
   console.log(choice)
   game2()
})

yow.addEventListener('click', () => {
   choice = 'o'
   console.log(choice)
   game2()
})

// function game() {
//    itemArr.forEach(element => {
//       element.addEventListener('click', e => {
//          element.textContent = choice
//          element.style.pointerEvents = 'none'
//          if (choice === 'x') {
//             choice = 'o'
//          } else {
//             choice = 'x'
//          }
//       })
//    })
// }

// function game2() {
//    for (let i = 0; i < itemArr.length; i++) {
//       for ( let x = 0; x < itemArr[i].length; i++) {
//          itemArr[x] = choice
//          itemArr[x].textContent = choice
//       }
//    }
// }

function game2() {
   for (let i = 0; i < boardState.length; i++) {

      let cell = boardState[i]
      for (let x = 0; x < cell.length ;i++) {
         // itemArr.forEach(element => {
         //    element.addEventListener('click', e => {
         //       element.textContent = choice
         //       element.style.pointerEvents = 'none'

         //       if (choice === 'x') {
         //          choice = 'o'
         //       } else {
         //          choice = 'x'
         //       }
         //       boardState[i][x] = choice
         //       console.log(boardState)
         //    })
         // })
        console.log(boardState[x])
      }
   }
}

