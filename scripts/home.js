const playBtn = document.querySelector('[data-play-btn]')
const homePage = document.querySelector('.homepage')
const logo = document.querySelector('.logo')
const boardCon =document.querySelector('.board-container')

const playerSelect = document.querySelector('.player-selection')


const textSelect = document.querySelector('.select-text')

const undoBtn =  document.querySelector('.undo')
const resetBtn =  document.querySelector('.reset')
const redoBtn =  document.querySelector('.redo')
playBtn.addEventListener('click', ()=> {
    playBtn.classList.add('fadeOut')
    logo.classList.add('fadeOut')

    playBtn.addEventListener('animationend',() => {
        homePage.style.display = 'none'
        logo.style.display = 'none'
        playBtn.style.display = 'none'

        displaySelect()
    })
})

function displaySelect(){
    playerSelect.classList.add('fadeIn')
    playerSelect.style.display = 'block';
}

xSelect.addEventListener('click', () => {
    
    xSelect.classList.add('fadeOut')
    oSelect.classList.add('fadeOut')
    textSelect.classList.add('fadeOut')

    xSelect.addEventListener('animationend', ()=>{
        playerSelect.style.display = 'none'
        displayGrid()
    })
})

oSelect.addEventListener('click', () => {
    
    oSelect.classList.add('fadeOut')
    oSelect.classList.add('fadeOut')
    textSelect.classList.add('fadeOut')

    oSelect.addEventListener('animationend', ()=>{
        playerSelect.style.display = 'none'
        boardCon.style.display = 'grid'
    })
})

function displayGrid(){
    boardCon.classList.add('fadeIn')
    boardCon.style.display = 'grid'
   
    redoBtn.classList.add('fadeIn')
    redoBtn.style.display = 'block'

    resetBtn.classList.add('fadeIn')
    resetBtn.style.display = 'block'

    undoBtn.classList.add('fadeIn')
    undoBtn.style.display = 'block'

  
}

