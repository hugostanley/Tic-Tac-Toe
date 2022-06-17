const playBtn = document.querySelector('[data-play-btn]')
const homePage = document.querySelector('.homepage')
const logo = document.querySelector('.logo')
const boardCon = document.querySelector('.board-container')
const playerSelect = document.querySelector('.player-selection')
const textSelect = document.querySelector('.select-text')
const resetBtn = document.querySelector('.reset')

playBtn.addEventListener('click', () => {
   homePage.classList.add('fadeOut')
   homePage.addEventListener('animationend', () => {
      homePage.style.display = 'none'
      displaySelect()
   })
})

function displaySelect() {
   playerSelect.classList.add('fadeIn')
   playerSelect.style.display = 'block'
}

xSelect.addEventListener('click', () => {
   xSelect.classList.add('fadeOut')
   oSelect.classList.add('fadeOut')
   textSelect.classList.add('fadeOut')
   xSelect.addEventListener('animationend', () => {
      playerSelect.style.display = 'none'
      reset.style.visibility = 'visible'
      displayGrid()
   })
})

oSelect.addEventListener('click', () => {
   oSelect.classList.add('fadeOut')
   oSelect.classList.add('fadeOut')
   textSelect.classList.add('fadeOut')
   oSelect.addEventListener('animationend', () => {
      playerSelect.style.display = 'none'
      reset.style.visibility = 'visible'
      displayGrid()
   })
})

function displayGrid() {
   boardCon.style.display = 'grid'
}


