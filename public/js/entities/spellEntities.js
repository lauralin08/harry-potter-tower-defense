// TODO: confirm health and attack values
const IMPERTURBABLE_HEALTH = 20;
const IMPERTURBABLE_ATTACK = 5;
const PROTEGO_HEALTH = 30;
const PROTEGO_ATTACK = 10;
const PATRONUS_HEALTH = 40;
const PATRONUS_ATTACK = 15;

game.upgradeButton = me.GUI_Object.extend({
    init: function(x, y) {
        settings = {
            height: 16,
            width: 16
        }
        this._super(me.GUI_Object, 'init', [x, y, settings]);
    },
    onClick: function(event) {
        var upgradeList = {
            0: game.data.lv1UpgradeCost,
            1: game.data.lv2UpgradeCost,
            2: game.data.lv3UpgradeCost
        }
        // TODO: this doesn't actually do anything right now; figure it out!
        if (this.upgradeLevel < 3) {
            if (game.data.beans >= upgradeList[this.upgradeLevel]) {
                this.upgradeLevel++;
                game.data.beans -= upgradeList[this.upgradeLevel];
            }
        }
    }
})

/**
 * A basic spell entity
 */
game.Spell = me.Entity.extend({
    init: function(x, y, health, attackPower, settings) {
	settings.width = 32;
	settings.height = 32;
	settings.framewidth = 32;
        // get the spell tower location from the cursor location

        // TODO: make sure there isn't already a spell tower here

        this._super(me.Entity, 'init', [576, y, settings]);

        this.alwaysUpdate = true;
        this.alive = true;

        this.upgradeLevel = 0;
        this.health = health;
	this.maxHealth = health;
        this.attackPower = attackPower;
	this.body.collisionType = me.collision.types.ACTION_OBJECT;

    },

    draw: function(renderer) {
	this._super(me.Entity, "draw", [renderer]);
	this.drawHealthBar(renderer);
    },

    drawHealthBar: function(renderer) {
	//draw black background
	renderer.setColor("rgba(0,0,0,1)");
	renderer.fillRect(-16, -25, 32, 5);

	//draw purple health bar overlay
	var remainingHealth = (this.health / this.maxHealth) * 32;
	if (remainingHealth < 0) {
		remainingHealth = 0;
	}
	
	renderer.setColor("rgba(165, 55, 253, 1)");
	renderer.fillRect(-16, -25, remainingHealth, 5);
    },    
             
    update: function(dt) {
    	me.collision.check(this);
    },


    onCollision : function (response) {
	if (response.b.body.collisionType === me.collision.types.ENEMY_OBJECT) {
		// add the spell attack animation
		var spellAttack = me.pool.pull("SpellAttack", 
			this.renderable.pos.x, 
			this.renderable.pos.y);
		me.game.world.addChild(spellAttack);
		me.game.world.removeChild(spellAttack);
		// add the enemy attack animation
		var enemyAttack = me.pool.pull("EnemyAttack", 
			response.b.pos.x, 
			response.b.pos.y);
		me.game.world.addChild(enemyAttack);
		me.game.world.removeChild(enemyAttack);
		
		// decrease healths
		response.health -= this.attack;
		this.health -= response.attackPower;
		
		// check for deaths
		if (this.health == 0) {
			me.game.world.removeChild(this);
		}
		return true;
	}
    }
    // TODO: add the tower upgrade button
    
});

/**
 * Imperturbable Charm Entity
 */
game.ImperturbableCharmSpell = game.Spell.extend({
    init: function(x, y) {
	settings = {
	    image: "imperturbable"
	}
        this._super(game.Spell, 'init', [x, y, IMPERTURBABLE_HEALTH, IMPERTURBABLE_ATTACK, settings]);

        // TODO: add the idle animation
        // TODO: add the cast animation
        // TODO: add the deflect animation
        // TODO: add the explode animation
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("cast", [1, 2, 3, 4, 5, 6]);
        this.renderable.setCurrentAnimation("cast", "idle");

	me.audio.play("Imperturbable");
    },
  

    // TODO: add logic for casting spells from the spell tower
});

/**
 * Protego Diabolica Entity
 */
game.ProtegoDiabolicaSpell = game.Spell.extend({
    init: function(x, y) {
	settings = {
	    image: "Protego_Diabolica"
	}
        this._super(game.Spell, 'init', [x, y, PROTEGO_HEALTH, PROTEGO_ATTACK, settings]);

        // TODO: add the idle animation
        // TODO: add the cast animation
        // TODO: add the deflect animation
        // TODO: add the explode animation
	this.renderable.addAnimation("idle", [0, 1, 2, 3, 4]);
	this.renderable.addAnimation("cast", [5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23]);
        this.renderable.setCurrentAnimation('cast', 'idle');
	
	me.audio.play("Protego_Diabolica");
    },

    // TODO: add logic for casting spells from the spell tower

    // TODO: add logic for casting spells from the spell tower
});

/**
 * Patronus Charm Entity
 */
game.PatronusCharmSpell = game.Spell.extend({
    init: function(x, y) {
	settings = {
	    image: "Patronus"
	}
        this._super(game.Spell, 'init', [x, y, PATRONUS_HEALTH, PATRONUS_ATTACK, settings]);

        // TODO: add the idle animation
        // TODO: add the cast animation
        // TODO: add the deflect animation
        // TODO: add the explode animation
	this.renderable.addAnimation("idle", [33, 34, 35, 36, 37, 38, 39, 40, 41, 42]);
	this.renderable.addAnimation("attack", [5, 6, 7, 8, 9, 10]);
	this.renderable.addAnimation("cast", [0, 1, 2, 3, 4, 11, 12, 13, 14, 15, 22, 23, 24, 25]);
        this.renderable.setCurrentAnimation('cast', 'idle');

	me.audio.play("Expecto_Patronum");
    },

    // TODO: add logic for casting spells from the spell tower
});
