
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
	waveNumber: 1,
	beans: 300,
	
	spellLv1Cost: 100,
	spellLv2Cost: 300,
	spellLv3Cost: 500,

	lv1Damage: 0,
	lv2Damage: 5,
	lv3Damage: 10,
	
	lv1UpgradeCost: 50,
	lv2UpgradeCost: 100,
	lv3UpgradeCost: 300,

	lv1UpgradeDamage: 0,
	lv2UpgradeDamage: 5,
	lv3UpgradeDamage: 10
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
<<<<<<< HEAD
        if (!me.video.init(1080, 480, {wrapper : "screen", scale : "flex-width"})) {
=======
        if (!me.video.init(1024, 480, {wrapper : "screen", scale : "auto", scaleMethod : "flex"})) {
>>>>>>> 56c7a274913638bb108d4818504bf93142deea94
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
        // set the "Menu/Title" Screen Object
        me.state.set(me.state.MENU, new game.TitleScreen());

        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // set a global fading transition for the screen
        me.state.transition("fade", "#FFFFFF", 250);
<<<<<<< HEAD
        
        // add our player entity in the entity pool
<<<<<<< Updated upstream
        me.pool.register("mainPlayer", game.PlayerEntity);
<<<<<<< 432b63051de386fda8189bcff7e330a870d18d48
<<<<<<< df5a36d70134021bdb107d4697045ac930309987
        me.pool.register("CoinEntity", game.CoinEntity);
        me.pool.register("EnemyEntity", game.EnemyEntity);
=======
=======
<<<<<<< HEAD
>>>>>>> fix map
=======
        // me.pool.register("mainPlayer", game.PlayerEntity);
        // me.pool.register("CoinEntity", game.CoinEntity);
        // me.pool.register("EnemyEntity", game.EnemyEntity);
>>>>>>> Stashed changes
<<<<<<< 432b63051de386fda8189bcff7e330a870d18d48
>>>>>>> fix map
=======
=======
        me.pool.register("CoinEntity", game.CoinEntity);
        me.pool.register("EnemyEntity", game.EnemyEntity);
>>>>>>> df5a36d70134021bdb107d4697045ac930309987
>>>>>>> fix map
=======

        // add our player entity in the entity pool
        // me.pool.register("mainPlayer", game.PlayerEntity);
        // me.pool.register("CoinEntity", game.CoinEntity);
        // me.pool.register("EnemyEntity", game.EnemyEntity);
>>>>>>> 56c7a274913638bb108d4818504bf93142deea94

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, 'left');
        me.input.bindKey(me.input.KEY.RIGHT, 'right');
        // map X, Up Arrow and Space for jump
        me.input.bindKey(me.input.KEY.X, 'jump', true);
        me.input.bindKey(me.input.KEY.UP, 'jump', true);
        me.input.bindKey(me.input.KEY.SPACE, 'jump', true);

        // Display the menu title
        me.state.change(me.state.MENU);
    }
};
