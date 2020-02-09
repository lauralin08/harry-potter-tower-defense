
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(1080, 480, {wrapper : "screen", scale : "flex-width"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // add our player entity in the entity pool
<<<<<<< Updated upstream
        me.pool.register("mainPlayer", game.PlayerEntity);
=======
        // me.pool.register("mainPlayer", game.PlayerEntity);
        // me.pool.register("CoinEntity", game.CoinEntity);
        // me.pool.register("EnemyEntity", game.EnemyEntity);
>>>>>>> Stashed changes

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, 'left');
        me.input.bindKey(me.input.KEY.RIGHT, 'right');
        // map X, Up Arrow and Space for jump
        me.input.bindKey(me.input.KEY.X, 'jump', true);
        me.input.bindKey(me.input.KEY.UP, 'jump', true);
        me.input.bindKey(me.input.KEY.SPACE, 'jump', true);

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
