/* Game namespace */
var game = {

  // an object where to store game information
  data : {
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
    lv3UpgradeDamage: 10,

    enemies: 0,
    allEnemiesDeployed: false,
    gameOver: false
  },

  // Run on page load.
  "onload" : function () {
    // Initialize the video.
    if (!me.video.init(1024, 512, {wrapper: "screen", scale: "auto", scaleMethod: "fit"})) {
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

    // set the "Play/Level 1" Screen Object
    me.state.set(me.state.PLAY, new game.PrivetDrive());

    // set the Level 2 screen object
    me.state.set(me.state.USER + 0, new game.Gringotts());

    // set the Level 3 screen object
    me.state.set(me.state.USER + 1, new game.Hogwarts());

    // set the gameover screen object
    me.state.set(me.state.GAMEOVER, new game.LoserScreen());

    // set the win screen object
    me.state.set(me.state.GAME_END, new game.WinnerScreen());

    // set the how to play screen object
    me.state.set(me.state.SETTINGS, new game.LearnScreen());

    // set a global fading transition for the screen
    me.state.transition("fade", "#FFFFFF", 250);
    
    // add our enemies to the entity pool
    me.pool.register("GrindylowEnemy", game.GrindylowEnemy, true);
    me.pool.register("AcromantulaEnemy", game.AcromantulaEnemy, true);
    me.pool.register("DementorEnemy", game.DementorEnemy, true);

    // add our spells to the entity pool
    me.pool.register("ImperturbableCharmSpell", game.ImperturbableCharmSpell, true);
    me.pool.register("ProtegoDiabolicaSpell", game.ProtegoDiabolicaSpell, true);
    me.pool.register("PatronusCharmSpell", game.PatronusCharmSpell, true);

    // add the attacks to the entity pool
    me.pool.register("EnemyAttack", game.EnemyAttack, true);
    me.pool.register("SpellAttack", game.SpellAttack, true);
    me.pool.register("MagicAttack", game.MagicAttack, true);

    // Display the menu title
    me.state.change(me.state.MENU);
  }
};


/* TODO:
    1. change the damage done to Imperturbable spells (pause between damage)
    2. check each level and the win screen
    3. add spell and attack animations
    4. check on the patronus animation
  */