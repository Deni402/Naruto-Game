function setupGame() {
  const grid = document.querySelector('.grid')
  const scoreId = document.getElementById('scoreId')
  const livesId = document.getElementById('livesId')
  const scoreText = document.querySelector('.score')
  const livesText = document.querySelector('.lives')
  const endMessage = document.querySelector('.endMessage')
  const  start = document.querySelector('.start')
  const  audio = document.querySelector('audio')
  const  width = 10
  const  alienStart = [0,1,2,3,4,5,6,7,10,11,12,13,14,15,16,17,20,21,22,23,24,25,26,27,30,31,32,33,34,35,36,37]
  const alienMovement = [1,1,width,-1,-1,width]
  const  squares = []
  let scoreTally = 0
  let  livesLeft = 3
  let alienArray = alienStart.slice() // to create new array to use on reset - splice modifies existing array
  let currentAlienMove = 0
  let  spaceshipIndex = 95
  let  gameInPlay = true
  let  moveAliensTimerId
  let  alienBombMovementId
  let  alienBombId


  start.innerText = 'Start Fight!'

  // Start game function
  function gameInit() {
    squares.forEach(square => square.classList.remove('activeAlien', 'explosion', 'spaceship', 'bullet', 'bomb'))
    console.log(squares.map(square => square.className).join(''))
    gameInPlay = true
    grid.classList.remove('hidden')
    scoreText.classList.remove('hidden')
    livesText.classList.remove('hidden')
    start.classList.add('hidden')
    currentAlienMove = 0
    alienArray = alienStart.slice()
    createAlien()
    moveAliensTimerId = setInterval(moveAliens, 800)
    alienBombId = setInterval(alienBomb, 800)
    spaceshipIndex = 95
    squares[spaceshipIndex].classList.add('spaceship')
    livesLeft = 3 
    scoreTally = 0
    scoreId.innerText = 0
    livesId.innerText = 3
    endMessage.classList.add('hidden')
    backgroundAudio()
  }

  // CREATE GRID ===============================================================
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    if (i < width) square.classList.add('ceiling')
    if (i > width ** 2 - width - 1) square.classList.add('floor')
    square.classList.add('background')
    squares.push(square) //creates new array of divs
    grid.appendChild(square)
  }

  // AUDIO =====================================================================
  // function bulletAudio() {
  //   audio.src = 'sounds/katon_aoszcAp.wav'
  //   audio.play()
  // }
  function backgroundAudio() {
    audio.src = 'sounds/Naruto-Shippuden-Samidare-_ksolis-Trap-Remix_.wav'
    audio.play()
  }
  

  // function alienBombAudio() {
  //   audio.src = 'sounds/005_14.wav'
  //   audio.play()
  // }
  
  // function loseLifeAudio() {
  //   audio.src = 'sounds/009_18.wav'
  //   audio.play()
  // }


  function gameOverAudio() {
    audio.src = 'sounds/naruto-trap-_1_.wav'
    audio.play()
  }
  
  // USER SPACESHIP ============================================================
  function moveSpaceship() {
    // find the square with the class of spaceship
    const spaceship = squares.find(square => square.classList.contains('spaceship'))
    // remove the class of spaceship from that square
    spaceship.classList.remove('spaceship')
    // add the class of player to square the player should move to
    squares[spaceshipIndex].classList.add('spaceship')
  }

  // ALIENS ====================================================================
  function createAlien() { // create alien array
    alienArray.forEach(alien => {
      
      squares[alien].classList.add('activeAlien')
    })
  }

  // MOVE ALIENS ===============================================================
  function moveAliens() {
    alienArray.forEach(alien => {
      squares[alien].classList.remove('activeAlien') // loop through aliens & remove all aliens
    })
    alienArray = alienArray.map(alien => alien + alienMovement[currentAlienMove]) //find new alien positions
    alienArray.forEach(alien => {
      squares[alien].classList.add('activeAlien') //add class of alien to all aliens
    })
    currentAlienMove++     // increment currentMove
    if (currentAlienMove === alienMovement.length) currentAlienMove = 0
    if (alienArray.some(alien => alien >= 90)) {
      gameOver('Kurama takes over the control!  <i class="fa fa-frown-o" aria-hidden="true"></i>')
    }

  }

  // ALIEN BOMB ================================================================
  function alienBomb() {
    let bombIndex = alienArray[Math.floor(Math.random() * alienArray.length)]
    // alienBombAudio()

    const alienBombMovementId = setInterval(() => {
      bombIndex = drawBullet(bombIndex, width, 'bomb')
      if (collision(bombIndex, 'spaceship', 'bomb', alienBombMovementId)) {
        loseLife()
      }
      collision(bombIndex, 'floor', 'bomb', alienBombMovementId)
      
      if (!gameInPlay) clearInterval(alienBombMovementId)
    }, 400)
  }

  // Lose life function ========================================================
  function loseLife() {
    if (gameInPlay) livesLeft--
    if (livesLeft !== 0) {
      livesId.innerText = livesLeft
      // loseLifeAudio()
    } else {
      livesId.innerText = 0 
      gameOver('Kurama takes over the control! <i class="fa fa-frown-o" aria-hidden="true"></i>')
    }
  }

  function gameOver(message) {
    gameInPlay = false
    gameOverAudio()
    clearInterval(alienBombId)
    alienBombId = null
    clearInterval(moveAliensTimerId)
    moveAliensTimerId = null
    clearInterval(alienBombMovementId)
    alienBombMovementId = null
    // moveAliensTimerId = null
    // alienBombMovementIds.forEach(alienBombMovementId => clearInterval(alienBombMovementId))
    // alienBombMovementIds = []
    // bulletIntervalIds.forEach(bulletIntervalId => clearInterval(bulletIntervalId))
    // bulletIntervalIds = [] // store in array so we can loop through array to clear intervals
    endMessage.classList.remove('hidden')
    endMessage.innerHTML = message
    grid.classList.add('hidden')
    start.innerText = 'Play again!'
    start.classList.remove('hidden')
    scoreId.classList.remove('hidden')
    livesId.classList.remove('hidden')
    
    livesId.innerText = livesLeft
  }

  function drawBullet(index, next, shot){
    if (squares[index + next]) {
      squares[index].classList.remove(shot)
      index += next
      squares[index].classList.add(shot)
    } else {
      squares[index].classList.remove(shot)
    }
    return index
  }

  // COLLISION =================================================================
  function collision(index, target, shot, interval){
    if (squares[index].classList.contains(target)) {
      console.log(`At ${index}, ${target} hit by ${shot}`)
      squares[index].classList.remove(shot)
      squares[index].classList.add('explosion')
      setTimeout(() => {
        squares[index].classList.remove('explosion')
      }, 300)
      clearInterval(interval)
      return true
    } else return false
  }

  function alienDeath(index){
    squares[index].classList.remove('activeAlien')
    const alienIndex = alienArray.indexOf(index)
    alienArray.splice(alienIndex,1)
  }

  function updateScore(){
    scoreTally++
    scoreId.innerText = scoreTally
  }

  // FIRE BULLET ===============================================================
  function fire(){
    let bulletIndex = spaceshipIndex
    const bulletIntervalId = setInterval(() => { 
      bulletIndex = drawBullet(bulletIndex, -width, 'bullet')
      if (collision(bulletIndex, 'activeAlien', 'bullet', bulletIntervalId)){
        alienDeath(bulletIndex)
        updateScore()
        if (alienArray.length === 0) {
          gameOver('<i class="fa fa-hand-peace-o" aria-hidden="true"></i> You beat Kurama! <i class="fa fa-hand-peace-o" aria-hidden="true"></i>')
          
        }
      }
      collision(bulletIndex, 'ceiling', 'bullet', bulletIntervalId)
    }, 200)
  }

  // USER BULLET ===============================================================
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
      // bulletAudio()
      fire()
    }
  })

  // USER SPACESHIP ============================================================
  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 37:
        //left
        if (spaceshipIndex % width > 0) {
          spaceshipIndex--
          moveSpaceship()
        }
        break
      case 39:
        //right
        if (spaceshipIndex % width < width - 1) {
          spaceshipIndex++
          moveSpaceship()
        }
        break
    }
  })

  start.addEventListener('click', gameInit)

  

}
window.addEventListener('DOMContentLoaded', setupGame)
