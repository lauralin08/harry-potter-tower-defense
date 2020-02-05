game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // play the audio track
        me.audio.playTrack('dst-inertexponent');

        // load a level
        me.levelDirector.loadLevel('PrivetDrive');
        // TODO: for the hp game, uncomment out the melonJS stuff that we commented out
        // to makes the repeatable background in Tiled work with these background images
        // (line 22237 in melonjs.js)

        // reset the score
        game.data.score = 0;

        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
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