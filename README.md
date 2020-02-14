# SEI-Project-01: Naruto Invaders

Play the game here: https://deni402.github.io/Naruto-Game/

Made with Vanilla Javascript

## Technologies used

* JavaScript(ES6)
* HTML5
* CSS
* git
* GitHub


## Installation

1. Clone or download the repo
1. Open the `index.html` in your browser of choice

## Overview

[Link to game]: (https://deni402.github.io/Naruto-Game/)

### How to play

Use the right bottom arrows to move and space bar to shoot.


### Introduction

Naruto Invaders is a take on the classic Space Invaders game from the 80s. The aim of the game is for the user to shoot the invading alien armada and dodge the bullets before it reaches the players spaceship.

The alien armada periodically drops bombs towards the player. The player can move from left to right to dodge the bombs being dropped by the alien armada. The player can fire bullets by pressing the spacebar to shoot at the approaching aliens.

The player wins by destroying the alien armada. The player has three lives, and loses a life each time the player is hit by one of the bombs dropped by the alien. Once the player has won or died, the player can choose to play again.

The aim of the game is to achieve the highest score before the aliens reach the spaceship.

### Timeframe

* 7 days solo project

### Brief

* Render a grid-based game in the browser
* Design logic for winning & visually display which player won
* Create HTML, CSS and JavaScript files
* Use Javascript to manipulate the DOM
* Deploy game using Github Pages
* Player's score should be displayed at end of game
* Player should be able to clear at least one wave of aliens

### Controls

* Player movements: :arrow_left: :arrow_right: to move left and right
* Player bullet: press spacebar to fire bullet

### Game Instructions

* The game begins with a simple landing page. Click on 'START FIGHT' to start the game.

![Landing Page](https://i.imgur.com/alufKmT.png)

* On page load, the aliens will start moving towards the players spaceship and dropping bombs periodically.

![Game Page](https://i.imgur.com/u8Ob8QB.png)

* Use the left and right arrow keys to dodge the alien bombs.

* Use spacebar to fire bullets upwards to kill the aliens from your current position.

* Each time you kill an alien, your score will increase by one (max score is 32).

![Game Page - Score](https://i.imgur.com/htwW518.png)
* You start each game with three lives, each time you're hit by an alien bomb you lose a life. If you lose all three lives, the game will end, taking you to the screen below. Click 'Play again!' to restart.


![Game Page - Win](https://i.imgur.com/QyGZcw7.png)

* Kill all of the aliens by shooting them to win the game. This will take you to the following screen.

## Process
The first thing I did was create a 10 x 10 grid in Javascript to build the rest of the game on. After this there were five key parts of the game I needed to tackle before moving forward with any logic: creating an array of aliens; using a set interval to move the aliens across and down the page; creating the player character which moves from left to right within the 10 x 10 grid on an event listener; adding an event listener to allow the player to fire a bullet and creating a set interval to make the aliens drop bombs.

#### Aliens
To create the alien armada I created a class of of 'activeAlien' in CSS which I added to my alien array in Javascript using the forEach method. To move the alien armada I used multiple arrays along with forEach to loop through the alien array to remove the class of alien, find the new position of the alien and increment the position of alien until it reached the bottom of the grid.

Create aliens:
```javascript
 function createAlien() {
    alienArray.forEach(alien => {
      squares[alien].classList.add('activeAlien')
    })
  }
```

Move aliens:
```javascript
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
```

I created a function for the alien armada to drop bombs using two set intervals to drop bombs periodically, which then moved down the grid a square at a time.

Alien bomb:
```javascript
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
```

#### Player's spaceship, collisions, score
To create the players spaceship I added the class of spaceship to the relevant square and then added an event listener to move from left to right. I then added an event listener for the user to fire bullets at the aliens, using a set interval to get the bullet to move up the grid.

Once I had the main components in place, I could add functions to create collisions, get the user to win or lose, update the score and lose lives.

Finally, after refactoring, I added a game over function and initialise game function to end and re-start the game.

Once the game was working and bug-free, I focused on the CSS to improve the look of the game.

Collision:
```javascript
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
```

Game init function:
```javaScript
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
    moveAliensTimerId = setInterval(moveAliens, 3000)
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
```

## Challenges
The biggest challenge for making Space Invaders was dealing with set intervals. The re-start function was the most challenging due to the amount of set intervals used throughout the game, and ensuring these were all cleared for the reset function to work without any bugs.

The movement of large groups of aliens in formation was also challenging and took a lot of pseudo-coding to break down into manageable steps.

## Wins


I was really pleased with what I achieved after just three weeks of learning Javascript. In particular, my understanding of arrays and set intervals improved dramatically over the seven days.

## Future features
The three main improvements I'd like to make are as follows.
1. Add the instructions for the game at the landing page.
2. Create a mobile version.
3. Make the game more enjoyable for users by adding different levels of difficulty.
