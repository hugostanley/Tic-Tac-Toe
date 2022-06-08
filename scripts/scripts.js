
let items = document.querySelectorAll('.items')
const x = document.querySelector('.eks')
const o = document.querySelector('.ow')

let choice



let itemArr = [...items]
console.log(itemArr)

let boardState = [
   ['', '', ''],
   ['', 'hell', ''],
   ['', '', ''],
]




x.addEventListener('click', () => {
    choice = 'x'
    console.log(choice)
})

o.addEventListener('click', () => {
    choice = 'o'
    console.log(choice)
})



itemArr.forEach(element => {
   element.addEventListener('click', e => {
      element.textContent = choice

      if(choice === 'x'){
          choice = 'o'
      } else {
          choice = 'x'
      }
   })
})


