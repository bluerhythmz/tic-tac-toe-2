let cells = Array.from(document.querySelectorAll('.cell'))
const winnerDisplay = document.querySelector('.winner')
const O_TEXT = "O"
const X_TEXT = "X"
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const restartButton = document.querySelector('.restart-button')
let currentPlayer = O_TEXT
let ai = X_TEXT

function game() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', (e) => {
            if (e.target.hasChildNodes()) return
            cells.splice(index, 1, currentPlayer)
            const chosenSquare = document.createElement('div')
            chosenSquare.innerHTML = currentPlayer
            chosenSquare.style.color = "white"
            e.target.appendChild(chosenSquare)
            chosenSquare.classList.add('active')
            if (winCheck(currentPlayer)) {
                winnerDisplay.innerText = `${currentPlayer} Wins!`
                winnerDisplay.classList.add('active')
                restartButton.classList.add('active')
                restartButton.style.display = "block"
                return
            }
            setTimeout(aiMove, 300)
            
            if (drawCheck()) {
                winnerDisplay.innerText = "Draw!"
                winnerDisplay.classList.add('active')
                restartButton.style.display = "block"
                return
            }     
        })  
    })
}


function randMove() {
   return cells[Math.floor(Math.random() * 9)]
}

function aiMove() {
    aiPosition = randMove()
        while (aiPosition === currentPlayer || aiPosition === ai) {
            aiPosition = randMove()
            if (winCheck() || winCheckAi() || drawCheck()) return
        } 
        const chosenSquareAi = document.createElement('div')
        chosenSquareAi.style.color = "white"
        chosenSquareAi.innerHTML = ai
        aiPosition.appendChild(chosenSquareAi)
        chosenSquareAi.classList.add('active')
        cells.splice(cells.indexOf(aiPosition), 1, ai)
        if (winCheckAi(ai)) {
            winnerDisplay.innerText = `${ai} Wins!`
            winnerDisplay.classList.add('active')
            restartButton.style.display = "block"
            return
        }
}

function winCheck(currentPlayer) {
    return winConditions.some(condition => {
        return condition.every(item => {
            return cells[item] === currentPlayer
        })
    })
}

function winCheckAi(ai) {
    return winConditions.some(condition => {
        return condition.every(item => {
            return cells[item] === ai
        })
    })
}

function drawCheck() {
    return cells.every(cell => typeof(cell) !== 'object')
}

function restart() {
    restartButton.addEventListener('click', () => {
        cells = Array.from(document.querySelectorAll('.cell'))
        cells.forEach(cell => {
            cell.innerText = ''
        })
        winnerDisplay.classList.remove('active')
        winnerDisplay.innerText = ''
        restartButton.style.display = "none"
        restartButton.classList.remove('active')
    })
    
    game()
}

restart()