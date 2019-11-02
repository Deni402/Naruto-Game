function setupGame() {
 

  // function setupGame() {
  // }
  // document.addEventListener('DOMContentLoaded', setupGame)

  // game-grid
  // (optionall) launching page
  // start button
  // <button>Start</button>

  // event listener for a start button 
  // document.addEventListener('click', (e) => {
  //  if {
  // condition to start the game
  //  }else
  // }


  // while(playing )

  // play again button
  // document.addEventListener('click', (e) => {
  //  if {
  //  the player lose/win - add play again button/page reload
  //  }else
  // }

  // using add event listener to find out the key number for switch case shooting button
  // document.addEventListener('keyup', (e) => {
  //   var keypressed = e.key && e.keyCode
  //   console.log(keypressed)
  // })
 
  
  // character positioned-bottom 
  // let player = 95 (position)
  // for (let i = 0; i < gridSize; i++) {
  // const cell = document.createElement('div')
  //  grid.appendChild(cell)
  //  cells.push(cell)
  // }
  // cells[player].classList.add('player')
 

  // movement and shooting Keys-switch case
  //       MOVEMENT 
  // document.addEventListener('keyup', (e) => {
  //   switch (e.keyCode) {
  //     case 65: {
  //       if (player === 90) {
  //         return
  //       }

  //      SHOOTING CASE
  //  let playerShoot = null 
  //  laser positioned-firing laser from the same position the mole is at - add class
  //    case 32: {
  //   playerShoot = (player - width)
  //   cells[playerShoot].classList.add('playerShoot')–
  // }


  // aliens positioned in place at top of the grid - how  many aliens, padding
  // 13 aliens
  // let aliensPosition = ..
  // for (let i = 0; i < gridSize; i++) {
  // const cell = document.createElement('div')
  //  grid.appendChild(cell)
  //  cells.push(cell)
  // }
  // cells[aliensPosition].classList.add('aliensPosition')



 
  // aliens move left and right - moving along the grid - but in an array for multiple 
  // let alienMove = ..
  // document.addEventListener('click', (e) => {
  // setInterval(() => {
  // if (cells[molePosition].classList.contains('alien')) {
  
  //  add condition to move but in an array for multiple  and map to change the indexes
  //   }
  //   cells[molePosition].classList.remove('mole')
  //   molePosition = Math.floor(Math.random() * 100)
  //   cells[alienMove].classList.add('alien')
  // }, 1000)
  // })
  // }


  // aliens edge closer to the base/turret and you lose
  // let lose = ..
  // document.addEventListener('', (e) => {
  //  if the width of the aliens is === with the width of the base return you lose
  // })
  
  // add alien laser
  // let alienLaser = null
  // document.addEventListener('', (e) => {
  // setInterval(() => {
  // alienLaser = (player - 10)
  // cells[alienLaser].classList.add('alienLaser')
  // })
  // })

  // =========Lives=========================

  // let life = 3
  // if death condition is true life---(look at whack a mole)

  // alien kills the player directly = lose life, continue playing, and take away one life. add 3 classes for each life

  // Add abclasslist on each heart initally and then remove once a life is taken away 


  //     THIS FOR EACH LIFE

  // when the game starts, the alien start moving
  // Only bottom row of aliens can shoot, 


  // alien allocations- random with those in the bottom row- if first row is destroyed, laser fired from second row. if second row is destroyed, third row. alternatively if there's an alien in front of an alien, the alien can't fire.
  // explosion
  // Audio
  // if statement x3 loss of life, end game, player loses. play again? Y/N loops back reload page if y. if n, end.



  // =======BONUS==========

  // extra options for your theme 
  // 
  // (optional) aliens destroy base/turret by shooting 
  // let turretPosition = ...
  // for (let i = 0; i < gridSize; i++) {
  // const cell = document.createElement('div')
  //  grid.appendChild(cell)
  //  cells.push(cell)
  // }
  // cells[turretPosition].classList.add('turretPosition')

  const width = 10
  const gridSize = width ** 2
  const grid = document.querySelector('.grid')
  const cells = []
  let player = 95
  let playerShoot = null 

  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }

  cells[player].classList.add('player')

  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 65: {
        if (player === 90) {
          return
        }
        cells[player].classList.remove('player')
        player = player - 1
        cells[player].classList.add('player')
        console.log(player)
        break
      }
      case 68: {
        if (player === ((gridSize) - 1)) {
          return
        }
        cells[player].classList.remove('player')
        player = player + 1
        cells[player].classList.add('player')
        console.log(player)
        break
      }
      case 32: {
        playerShoot = (player - 10)
        cells[playerShoot].classList.add('playerShoot')
        setInterval(() => {
          // cells[playerShoot].classList.add('playerShoot')
          cells[playerShoot].classList.remove('playerShoot')
          playerShoot = (player - 20)
        }, 400)
      }
      
    }

    // add space key to shoot in here but i need to create the array and the class first

  


  })

  document.addEventListener('keyup', (e) => {
    var keypressed = e.key && e.keyCode
    console.log(keypressed)
  })







}
window.addEventListener('DOMContentLoaded', setupGame)