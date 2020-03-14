function generateEnemyType(number, enemyType, taken, numLevel) {
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
    me.game.world.addChild(me.pool.pull(enemyType, yCoord, numLevel), Infinity);
    
    // keep track of the number of enemies
    game.data.enemies++;
  }

  return tilesTaken;
}

function generateEnemyWave(numGrindylows, numAcromantulas, numDementors, numLevel) {
  // create an object to store occupied yCoords
  var taken = {};
  taken = generateEnemyType(numGrindylows, 'GrindylowEnemy', taken, numLevel);
  taken = generateEnemyType(numAcromantulas, 'AcromantulaEnemy', taken, numLevel);
  taken = generateEnemyType(numDementors, 'DementorEnemy', taken, numLevel);
}

function generateAllEnemies(numLevel) {
  switch (numLevel) {
    case 3:
      numGrindylows = 4;
      numAcromantulas = 2;
      numDementors = 1;
      break;
    case 2:
      numGrindylows = 3;
      numAcromantulas = 1;
      numDementors = 0;
      break;
    case 1:
    default:
      numGrindylows = 2;
      numAcromantulas = 0;
      numDementors = 0;
  }
  generateEnemyWave(numGrindylows, numAcromantulas, numDementors, numLevel);
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
    generateEnemyWave(numGrindylows, numAcromantulas, numDementors, numLevel);
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
  }, 15000);
}

function waitForLevelClear(numLevel) {
  var intervalID = window.setInterval(function() {
    let cleared = game.data.allEnemiesDeployed && game.data.enemies === 0;
    if (cleared) {
      window.clearInterval(intervalID);
      switch (numLevel) {
        case 3:
          me.state.change(me.state.GAME_END);
          break;
        case 2:
          me.state.change(me.state.USER + 1);
          break;
        case 1:
        default:
          me.state.change(me.state.USER + 0);
      }
    }
  }, 1000);
}

function generateSpellCastingTowers(numLevel) {
  var imperturbableX, imperturbableY, protegoX, protegoY, patronusX, patronusY;
  switch (numLevel) {
    case 3:
      imperturbableY = protegoY = patronusY = 80;
      imperturbableX = 64;
      protegoX = 160;
      patronusX = 256;
      break;
    case 2:
      imperturbableX = protegoX = patronusX = 256;
      imperturbableY = 224;
      protegoY = 304;
      patronusY = 384;
      break;
    case 1:
    default:
      imperturbableY = protegoY = patronusY = 400;
      imperturbableX = 160;
      protegoX = 256;
      patronusX = 352;
  }
  me.game.world.addChild(new game.ImperturbableCharmSpellCaster(imperturbableX, imperturbableY, numLevel), Infinity);
  me.game.world.addChild(new game.ProtegoDiabolicaSpellCaster(protegoX, protegoY, numLevel), Infinity);
  me.game.world.addChild(new game.PatronusCharmSpellCaster(patronusX, patronusY, numLevel), Infinity);
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
    // load a level
    me.levelDirector.loadLevel('PrivetDrive');
    
    // play the audio track
    me.audio.playTrack('Curse Of The Ice Queen');

    game.data.gameOver = false;
    game.data.allEnemiesDeployed = false;
    
    // Add our HUD to the game world, add it last so that this is on top of the rest.
    // Can also be forced by specifying a "Infinity" z value to the addChild function.
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    generateSpellCastingTowers(1);

    // reset the score
    game.data.score = 0;

    // reset the spell casting power
    game.data.beans = 300;

    // randomly generate enemies
    generateAllEnemies(1);
    waitForLevelClear(1);
  }
});

game.Gringotts = game.PlayScreen.extend({
  onResetEvent: function() {
    // load a level
    me.levelDirector.loadLevel('Gringotts');

    // play the audio track
    me.audio.playTrack('Curse Of The Ice Queen');

    game.data.gameOver = false;
    game.data.allEnemiesDeployed = false;
    
    // Add our HUD to the game world, add it last so that this is on top of the rest.
    // Can also be forced by specifying a "Infinity" z value to the addChild function.
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    generateSpellCastingTowers(2);

    // re-up the spell casting power
    game.data.beans += 300;

    // randomly generate enemies
    generateAllEnemies(2);
    waitForLevelClear(2);
  }
});

game.Hogwarts = game.PlayScreen.extend({
  onResetEvent: function() {
    // load a level
    me.levelDirector.loadLevel('Hogwarts');

    // play the audio track
    me.audio.playTrack('Curse Of The Ice Queen');

    game.data.gameOver = false;
    game.data.allEnemiesDeployed = false;
    
    // Add our HUD to the game world, add it last so that this is on top of the rest.
    // Can also be forced by specifying a "Infinity" z value to the addChild function.
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    generateSpellCastingTowers(3);
        
    // re-up the spell casting power
    game.data.beans += 300;

    // randomly generate enemies
    generateAllEnemies(3);
    waitForLevelClear(3);
  }
});
