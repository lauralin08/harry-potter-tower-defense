// TODO: set these up!
const GRINDYLOW_HEALTH
const GRINDYLOW_ATTACK = 5;
const ACROMANTULA_HEALTH
const ACROMANTULA_ATTACK = 10;
const DEMENTOR_HEALTH
const DEMENTOR_ATTACK = 15;

/**
 * A basic enemy entity
 */
game.Enemy = me.Entity.extend({
    init: function(x, y, settings, health, attackPower) {
        // randomly generate the enemy start position
        var boardHeight
        var yCoord = Math.floor(Math.random() * boardHeight)

        // TODO: make sure there isn't already an enemy here

        // enemies start on the left and travel to the right
        this._super(me.Entity, 'init', [0, yCoord, settings]);

        // max walking speed
        this.body.setMaxVelocity(1, 0);
        this.body.setFriction(0.4, 0);

        this.alwaysUpdate = true;
        this.alive = true;
        this.reachedEnd = false;

        this.health = health;
        this.attackPower = attackPower;
    }
});

/**
 * Grindylow Entity
 */
game.GrindylowEnemy = game.Enemy.extend({
    init: function(x, y, settings) {
        this._super(game.Enemy, 'init', [x, y, settings, GRINDYLOW_HEALTH, GRINDYLOW_ATTACK]);

        // TODO: add the move animation
        // TODO: add the attack animation
        // TODO: add the takeDamage animation
        // TODO: add the die animation

        this.renderable.setCurrentAnimation('stand');
	
	this.renderable.addAnimation("move", [4, 5, 6, 7]);

	this.renderable.addAnimation("stand", [0, 1, 2, 3]); 	
    },

    update: function(dt) {
        if (this.alive) {
            // generate the next step in the enemy path -- right only

            // if blocked, attack the tower blocking the path
        } else {
            this.body.force.x = 0;
        }

        // check & update movement
        this.body.update(dt);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt])
                || this.body.vel.x !== 0
                || this.body.vel.y !== 0);
    }

    // TODO: on die, drop BeanEntity and add attackPower to spell casting power
});

/**
 * Acromantula Entity
 */
game.AcromantulaEnemy = game.Enemy.extend({
    init: function(x, y, settings) {
        // TODO: set health
        this._super(game.Enemy, 'init', [x, y, settings, ACROMANTULA_HEALTH, ACROMANTULA_ATTACK]);

        // TODO: add the move animation
        // TODO: add the attack animation
        // TODO: add the takeDamage animation
        // TODO: add the die animation
    },

    update: function(dt) {
        if (this.alive) {
            // generate the next step in the enemy path
            //  -- right, diag up, or diag down

            // if the next step is blocked, either pick another step
            // or attack the tower which is blocking the path
        } else {
            this.body.force.x = 0;
        }

        // check & update movement
        this.body.update(dt);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt])
                || this.body.vel.x !== 0
                || this.body.vel.y !== 0);
    }

    // TODO: on die, drop BeanEntity and add attackPower to spell casting power
});

/**
 * Dementor Entity
 */
game.DementorEnemy = game.Enemy.extend({
    init: function(x, y, settings) {
        // TODO: set health
        this._super(game.Enemy, 'init', [x, y, settings, DEMENTOR_HEALTH, DEMENTOR_ATTACK]);

        // TODO: add the move animation
        // TODO: add the attack animation
        // TODO: add the takeDamage animation
        // TODO: add the die animation

        this.renderable.setCurrentAnimation('move');
    },

    update: function(dt) {
        if (this.alive) {
            // generate the next step in the enemy path
            //  -- right, diag up, diag down, up, or down

            // if the next step is blocked, either pick another step
            // or attack the tower which is blocking the path
        } else {
            this.body.force.x = 0;
        }

        // check & update movement
        this.body.update(dt);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt])
                || this.body.vel.x !== 0
                || this.body.vel.y !== 0);
    }

    // TODO: on die, drop BeanEntity and add attackPower to spell casting power
});
