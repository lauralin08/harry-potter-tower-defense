function generateEnemyType(number, enemyType) {
    for (var i = 0; i < number; i++) {
        var boardHeight = 16;
        // generate the starting tile
        var yCoord = Math.floor(Math.random() * boardHeight)
        // convert the tile to a pixel coordinate
        yCoord = yCoord ? yCoord * 32 : 32;
        me.game.world.addChild(me.pool.pull(enemyType, yCoord));
        // keep track of the number of enemies
        game.data.enemies++;
    }
}

function generateEnemyWave(numGrindylows, numAcromantulas, numDementors) {
    generateEnemyType(numGrindylows, 'GrindylowEnemy');
    generateEnemyType(numAcromantulas, 'AcromantulaEnemy');
    generateEnemyType(numDementors, 'DementorEnemy');
}

function generateAllEnemies(numLevel) {
    switch (numLevel) {
        case 3:
            numGrindylows = 5;
            numAcromantulas = 3;
            numDementors = 2;
            break;
        case 2:
            numGrindylows = 5;
            numAcromantulas = 3;
            numDementors = 1;
            break;
        case 1:
        default:
            numGrindylows = 5;
            numAcromantulas = 2;
            numDementors = 1;
    }
    generateEnemyWave(numGrindylows, numAcromantulas, numDementors);
    var x = 0;
    console.log(`Wave ${x+1}`);
    console.log(`Generating ${numGrindylows} grindylows, ${numAcromantulas} acromantulas, and ${numDementors} dementors`);
    var intervalID = window.setInterval(function() {
        if (game.data.gameOver) {
            window.clearInterval(intervalID);
            return;
        } else if (++x === 9) {
            window.clearInterval(intervalID);
            game.data.allEnemiesDeployed = true;
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
        console.log(game.data.enemies);
        let cleared = game.data.allEnemiesDeployed && game.data.enemies === 0;
        console.log(cleared);
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

        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

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

        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        // randomly generate enemies
        generateAllEnemies(2);
        waitForLevelClear(2);
    }
});

game.Hogwarts = game.PlayScreen.extend({
    onResetEvent: function() {
        // play the audio track
        me.audio.playTrack('Curse Of The Ice Queen');

        // // load a level
        // me.levelDirector.loadLevel('Hogwarts');

        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        // randomly generate enemies
        generateAllEnemies(3);
        waitForLevelClear(3);
    }
});