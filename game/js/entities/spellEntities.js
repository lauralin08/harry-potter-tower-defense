// TODO: set these up!
const IMPERTURBABLE_HEALTH
const IMPERTURBABLE_ATTACK
const PROTEGO_HEALTH
const PROTEGO_ATTACK
const PATRONUS_HEALTH
const PATRONUS_ATTACK

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

        this.health = health;
        this.attackPower = attackPower;
    }
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

        this.renderable.setCurrentAnimation('idle');
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

        this.renderable.setCurrentAnimation('idle');
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

        this.renderable.setCurrentAnimation('idle');
    },

    // TODO: add logic for casting spells from the spell tower
});