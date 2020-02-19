// TODO: confirm health values
const GRINDYLOW_HEALTH = 10;
const GRINDYLOW_ATTACK = 5;
const ACROMANTULA_HEALTH = 20;
const ACROMANTULA_ATTACK = 10;
const DEMENTOR_HEALTH = 30;
const DEMENTOR_ATTACK = 15;

/**
 * A basic enemy entity
 */
game.Enemy = me.Entity.extend({
    init: function(x, y, settings, health, attackPower) {
        // randomly generate the enemy start position
        var boardHeight = 16;
        // generate the starting tile
        var yCoord = Math.floor(Math.random() * boardHeight)
        // convert the tile to a pixel coordinate
        yCoord = yCoord ? yCoord * 32 : 32;

        // TODO: make sure there isn't already an enemy here

        // enemies start on the left and travel to the right
        // TODO: Entities are pre-inserted in Tiled for now -- change that!
        // this._super(me.Entity, 'init', [1024, yCoord, settings]);
        this._super(me.Entity, 'init', [1024, y, settings]);

        // max walking speed
        this.body.setMaxVelocity(1, 0);
        this.body.setFriction(0.4, 0);

        // TODO: confirm the end position
        this.endX = 448;

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

        // TODO: add the attack animation
        // TODO: add the takeDamage animation
        // TODO: add the die animation

        this.renderable.addAnimation("move", [4, 5, 6, 7]);
        this.renderable.addAnimation("stand", [0, 1, 2, 3]);
        this.renderable.setCurrentAnimation('stand'); 	
    },

    update: function(dt) {
        if (this.alive && !this.reachedEnd) {
            // generate the next step in the enemy path -- right only
            // TODO: figure out how to make enemies pause for a couple seconds on each tile
            if (this.pos.x > this.endX) {
                this.body.force.x = -this.body.maxVel.x;
            } else {
                this.reachedEnd = true;
            }

            // if blocked, attack the tower blocking the path
        } else {
            this.body.force.x = 0;
        }

        // check & update movement
        this.body.update(dt);
	
	// handle collisions againt other shapes
	me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt])
                || this.body.vel.x !== 0
                || this.body.vel.y !== 0);
    },
    /**
     * Colision handler
    */
    onCollision : function (response, other) {
	if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
		if(this.alive && (response.overlapV.x < 0)) {
			this.renderable.flicker(750);
			this.alive = false;
		}
		return false;
	}
	//make all other objects solid
	return true;
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
        // TODO: change to acro image
        this.renderable.addAnimation("move", [4, 5, 6, 7]);
        this.renderable.addAnimation("stand", [0, 1, 2, 3]);
        this.renderable.setCurrentAnimation('stand');
    },

    update: function(dt) {
        if (this.alive && !this.reachedEnd) {
            // generate the next step in the enemy path
            //  -- right, diag up, or diag down
            // TODO: add diags
            // TODO: figure out how to make enemies pause for a couple seconds on each tile
            if (this.pos.x > this.endX) {
                this.body.force.x = -this.body.maxVel.x;
            } else {
                this.reachedEnd = true;
            }

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
        // TODO: change to dementor image
        this.renderable.addAnimation("move", [4, 5, 6, 7]);
        this.renderable.addAnimation("stand", [0, 1, 2, 3]);
        this.renderable.setCurrentAnimation('stand');
    },

    update: function(dt) {
        if (this.alive && !this.reachedEnd) {
            // generate the next step in the enemy path
            //  -- right, diag up, diag down, up, or down
            // TODO: add diags, ups, downs
            // TODO: figure out how to make enemies pause for a couple seconds on each tile
            if (this.pos.x > this.endX) {
                this.body.force.x = -this.body.maxVel.x;
            } else {
                this.reachedEnd = true;
            }

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
