const first = document.querySelector('.one')
const two = document.querySelector('.two')
const three = document.querySelector('.three')
const four = document.querySelector('.four')
const five = document.querySelector('.five')
const six = document.querySelector('.six')
const seven = document.querySelector('.seven')
const eight = document.querySelector('.eight')
const nine = document.querySelector('.nine')
console.log(first)



let boardState = [
    ['','',''],
    ['','2',''],
    ['','','']
]

let hello = 'hey';
boardState[0][2] = hello

first.textContent = boardState[0][0]
two.textContent = boardState[0][1]
three.textContent = boardState[0][2]

four.textContent = boardState[1][0]
five.textContent = boardState[1][1]
six.textContent = boardState[1][2]

seven.textContent = boardState[2][0]
eight.textContent = boardState[2][1]
nine.textContent = boardState[2][2]