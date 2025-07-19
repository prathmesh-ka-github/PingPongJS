console.log("JS working!");

const gameBoard = document.getElementById('gameBoard')
const ctx = gameBoard.getContext('2d')
const scoreText = document.getElementById('scoreText')
const resetBtn = document.getElementById('resetBtn')
const startBtn = document.getElementById('startBtn')
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const boardBackground = "forestgreen"
const paddle1Color = "blue"
const paddle2Color = "red"
const paddleBorder = "black"
const paddleSpeed = 50
const ballColor = "white"
const ballBorderColor = "black"
const ballRadius = 10

let intervalID
let ballSpeed = 1
let ballX = gameWidth/2
let ballY = gameHeight/2
let ballXDirection = 0
let ballYDirection = 0
let player1Score = 0
let player2Score = 0
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
}
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
}

resetBtn.addEventListener('click', resetGameBtn)
startBtn.addEventListener('click', startGameBtn)

function resetGameBtn(){
    resetBtn.style.display = 'none'
    startBtn.style.display = 'block'
    window.removeEventListener('keydown', changeDirection)
    resetGame()
}

function startGameBtn(){
    resetBtn.style.display = 'block'
    startBtn.style.display = 'none'
    window.addEventListener('keydown', changeDirection)
    
    createBall()
    updateScore()
    gameStart()
}
clearBoard()
createBall()
drawPaddles()


function gameStart() {
    nextTick()
}
function nextTick(){
    intervalID = setTimeout(()=> {
        clearBoard()
        drawPaddles()
        drawBall(ballX, ballY)
        moveBall()
        checkCollision()
        nextTick()
    }, 5)
}
function clearBoard(){
    ctx.fillStyle = boardBackground
    ctx.fillRect(0,0, gameWidth,gameHeight)
}
function drawPaddles() {
    ctx.strokeStyle = paddleBorder

    ctx.fillStyle = paddle1Color
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)

    ctx.fillStyle = paddle2Color
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
}
function createBall(){
    ballSpeed = 1
    if (Math.round(Math.random()) == 1) {
        ballXDirection = 1
    }
    else{
        ballXDirection = -1
    }
    if (Math.round(Math.random()) == 1) {
        ballYDirection = 1
    }
    else{
        ballYDirection = -1
    }
    ballX = gameWidth/2
    ballY = gameHeight/2
    drawBall(ballX, ballY)
}
function moveBall() {
    ballX += ballSpeed * ballXDirection
    ballY += ballSpeed * ballYDirection
}
function drawBall(ballX, ballY){
    ctx.fillStyle = ballColor
    ctx.strokeStyle = ballBorderColor
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(ballX, ballY, ballRadius, 0, 2*Math.PI)
    ctx.stroke()
    ctx.fill()
}
function checkCollision(){
    if(ballY <= 0 + ballRadius){
        ballYDirection *= -1
    }
    if(ballY >= gameHeight - ballRadius){
        ballYDirection *= -1
    }
    if (ballX <= 0) {
        player2Score += 1
        updateScore()
        createBall()
        return
    }
    if (ballX >= gameWidth) {
        player1Score += 1
        updateScore()
        createBall()
        return
    }
    if (ballX <= (paddle1.x + paddle1.width + ballRadius)) {
        if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
            ballX = (paddle1.x + paddle1.width) + ballRadius // If ball gets stuck
            ballXDirection *= -1
            ballSpeed += 1
        }
    }
    if (ballX >= (paddle2.x - ballRadius)) {
        if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
            ballX = paddle2.x - ballRadius
            ballXDirection *= -1
            ballSpeed += 1
        }
    }

}
function changeDirection(event){
    const keyPressed = event.keyCode
    const paddle1Up = 87
    const paddle1Down = 83
    const paddle2Up = 38
    const paddle2Down = 40

    switch (keyPressed) {
        case(paddle1Up):
            if (paddle1.y > 0) {
                paddle1.y -= paddleSpeed
            }
            break;
        case(paddle1Down):
            if (paddle1.y < gameHeight - paddle1.height) {
                paddle1.y += paddleSpeed
            }
            break
        case(paddle2Up):
            if (paddle2.y > 0) {
                paddle2.y -= paddleSpeed
            }
            break;
        case(paddle2Down):
            if (paddle2.y < gameHeight - paddle2.height) {
                paddle2.y += paddleSpeed
            }
            break
        default:
            break;
    }
}
function updateScore(){
    scoreText.textContent = `${player1Score} : ${player2Score}`
}
function resetGame(){
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    }
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    }
    ballSpeed = 1
    player1Score = player2Score = 0
    clearInterval(intervalID)
}

// Keyboard Shortcuts
window.addEventListener('keydown',(event)=> {
    if (startBtn.style.display == "block" && event.key === 'Enter') {
        startGameBtn()
    }
    if(resetBtn.style.display === 'block' && event.key === ' '){
        resetGameBtn()
    }
    bgm.play()
})

// music
const bgm = document.getElementById('bgm')
bgm.volume = 0.2