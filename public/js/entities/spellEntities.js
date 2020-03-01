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
    init: function(x, y, settings, health, attackPower) {
        // get the spell tower location from the cursor location

        // TODO: make sure there isn't already a spell tower here

        this._super(me.Entity, 'init', [x, y, settings]);

        this.alwaysUpdate = true;
        this.alive = true;

        this.upgradeLevel = 0;
        this.health = health;
        this.attackPower = attackPower;

    },

    // TODO: add the tower upgrade button
    
});

/**
 * Imperturbable Charm Entity
 */
game.ImperturbableCharmSpell = game.Spell.extend({
    init: function(x, y, settings) {
        this._super(game.Spell, 'init', [x, y, settings, IMPERTURBABLE_HEALTH, IMPERTURBABLE_ATTACK]);

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
    init: function(x, y, settings) {
        this._super(game.Spell, 'init', [x, y, settings, PROTEGO_HEALTH, PROTEGO_ATTACK]);

        // TODO: add the idle animation
        // TODO: add the cast animation
        // TODO: add the deflect animation
        // TODO: add the explode animation

        // this.renderable.setCurrentAnimation('idle');
	
	me.audio.play("Protego_Diabolica");
    },

    // TODO: add logic for casting spells from the spell tower
});

/**
 * Patronus Charm Entity
 */
game.PatronusCharmSpell = game.Spell.extend({
    init: function(x, y, settings) {
        this._super(game.Spell, 'init', [x, y, settings, PATRONUS_HEALTH, PATRONUS_ATTACK]);

        // TODO: add the idle animation
        // TODO: add the cast animation
        // TODO: add the deflect animation
        // TODO: add the explode animation

        // this.renderable.setCurrentAnimation('idle');

	me.audio.play("Expecto_Patronum");
    },

    // TODO: add logic for casting spells from the spell tower
});
