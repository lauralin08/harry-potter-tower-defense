function generateEnemies(number, enemyType) {
    for (var i = 0; i < number; i++) {
        var boardHeight = 16;
        // generate the starting tile
        var yCoord = Math.floor(Math.random() * boardHeight)
        // convert the tile to a pixel coordinate
        yCoord = yCoord ? yCoord * 32 : 32;
        me.game.world.addChild(me.pool.pull(enemyType, yCoord));
    }
}

function generateEnemyWave(numGrindylows, numAcromantulas, numDementors) {
    generateEnemies(numGrindylows, 'GrindylowEnemy');
    generateEnemies(numAcromantulas, 'AcromantulaEnemy');
    generateEnemies(numDementors, 'DementorEnemy');
}

game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
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

        // randomly generate the enemy start position
        // for the first wave, we'll do 5 grindylows, 2 acromantulas, and 1 dementor
        generateEnemyWave(5, 2, 1);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);

        // stop the audio strack
        me.audio.stopTrack();
    }
});