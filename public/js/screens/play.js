function generateEnemyType(number, enemyType, taken) {
  var tilesTaken = taken;
  for (var i = 0; i < number; i++) {
    var boardHeight = 16;
    // generate the starting tile
    var yCoord;
    do {
      yCoord = Math.floor(Math.random() * boardHeight);
    } while (tilesTaken[yCoord])

    // keep track of the yCoords that are occupied
    tilesTaken[yCoord] = true;

    // convert the tile to a pixel coordinate
    yCoord *= 32;
    me.game.world.addChild(me.pool.pull(enemyType, yCoord), Infinity);
    
    // keep track of the number of enemies
    game.data.enemies++;
  }

  return tilesTaken;
}

function generateEnemyWave(numGrindylows, numAcromantulas, numDementors) {
  // create an object to store occupied yCoords
  var taken = {};
  taken = generateEnemyType(numGrindylows, 'GrindylowEnemy', taken);
  taken = generateEnemyType(numAcromantulas, 'AcromantulaEnemy', taken);
  taken = generateEnemyType(numDementors, 'DementorEnemy', taken);
}

function generateAllEnemies(numLevel) {
  switch (numLevel) {
    case 3:
      numGrindylows = 3;
      numAcromantulas = 1;
      numDementors = 1;
      break;
    case 2:
      numGrindylows = 2;
      numAcromantulas = 1;
      numDementors = 0;
      break;
    case 1:
    default:
      numGrindylows = 2;
      numAcromantulas = 0;
      numDementors = 0;
  }
  generateEnemyWave(numGrindylows, numAcromantulas, numDementors);
  var x = 0;
  console.log(`Wave ${x+1}`);
  console.log(`Generating ${numGrindylows} grindylows, ${numAcromantulas} acromantulas, and ${numDementors} dementors`);
  var intervalID = window.setInterval(function() {
    if (game.data.gameOver || x > 1 && !game.data.waiting) {
      window.clearInterval(intervalID);
      return;
    } else if (++x === 9) {
      window.clearInterval(intervalID);
      game.data.allEnemiesDeployed = true;
    } else if (x === 2) {
      game.data.waiting = true;
    }
    generateEnemyWave(numGrindylows, numAcromantulas, numDementors);
    // increase acromantulas after the 4th wave
    if (x === 3) {
      numAcromantulas++;
    }
    // increase dementors after the 7th wave
    if (x === 6) {
      numDementors++;
    }
    console.log(`Wave ${x+1}`);
    console.log(`Generating ${numGrindylows} grindylows, ${numAcromantulas} acromantulas, and ${numDementors} dementors`);
  }, 18000);
}

function waitForLevelClear(numLevel) {
  var intervalID = window.setInterval(function() {
    // console.log(game.data.enemies);
    let cleared = game.data.allEnemiesDeployed && game.data.enemies === 0;
    // console.log(cleared);
    if (cleared) {
      window.clearInterval(intervalID);
      switch (numLevel) {
        case 3:
          // TODO: set up win screen
          // game.state.set(me.state.GAME_END, new game.WinScreen());
          break;
        case 2:
          game.state.set(me.state.PLAY, new game.Hogwarts());
          break;
        case 1:
        default:
          game.state.set(me.state.PLAY, new game.Gringotts());
      }
    }
  }, 1000);
}

function generateSpellCastingTowers() {
  me.game.world.addChild(new game.ImperturbableCharmSpellCaster(192, 384), Infinity);
  me.game.world.addChild(new game.ProtegoDiabolicaSpellCaster(288, 384), Infinity);
  me.game.world.addChild(new game.PatronusCharmSpellCaster(384, 384), Infinity);
}


game.PlayScreen = me.ScreenObject.extend({
  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    // remove the HUD from the game world
    me.game.world.removeChild(this.HUD);
    
    // stop the audio track
    me.audio.stopTrack();
  }
});

game.PrivetDrive = game.PlayScreen.extend({
  onResetEvent: function() {
    // play the audio track
    me.audio.playTrack('Curse Of The Ice Queen');

    // load a level
    me.levelDirector.loadLevel('PrivetDrive');

    // reset the score
    game.data.score = 0;

    // reset the spell casting power
    game.data.beans = 300;

    game.data.gameOver = false;

    // Add our HUD to the game world, add it last so that this is on top of the rest.
    // Can also be forced by specifying a "Infinity" z value to the addChild function.
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    generateSpellCastingTowers();

    // randomly generate enemies
    generateAllEnemies(1);
    waitForLevelClear(1);
  }
});

game.Gringotts = game.PlayScreen.extend({
  onResetEvent: function() {
    // play the audio track
    me.audio.playTrack('Curse Of The Ice Queen');

    // load a level
    me.levelDirector.loadLevel('Gringotts');

    game.data.gameOver = false;
    
    // Add our HUD to the game world, add it last so that this is on top of the rest.
    // Can also be forced by specifying a "Infinity" z value to the addChild function.
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    generateSpellCastingTowers();

    // randomly generate enemies
    generateAllEnemies(2);
    waitForLevelClear(2);
  }
});

game.Hogwarts = game.PlayScreen.extend({
  onResetEvent: function() {
    // play the audio track
    me.audio.playTrack('Curse Of The Ice Queen');

    // load a level
    me.levelDirector.loadLevel('Hogwarts');

    game.data.gameOver = false;

    // Add our HUD to the game world, add it last so that this is on top of the rest.
    // Can also be forced by specifying a "Infinity" z value to the addChild function.
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    generateSpellCastingTowers();

    // randomly generate enemies
    generateAllEnemies(3);
    waitForLevelClear(3);
  }
});
