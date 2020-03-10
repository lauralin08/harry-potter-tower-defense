// TODO: confirm health values
const GRINDYLOW_HEALTH = 10;
const GRINDYLOW_ATTACK = 5;
const ACROMANTULA_HEALTH = 20;
const ACROMANTULA_ATTACK = 10;
const DEMENTOR_HEALTH = 30;
const DEMENTOR_ATTACK = 15;

function onEnemyDeath(enemy, attackPower) {
    // prevent duplicate removal
    if (enemy.deployed) {
        // remove this enemy from the total enemy count
        game.data.enemies--;

        me.game.world.addChild(new game.BertieBottsBean(enemy.pos.x, enemy.pos.y));
        me.game.world.removeChild(enemy);
        game.data.beans += attackPower;
        enemy.removed = true;
    }
}

function onGameOver(){
    // TODO: raise the dark mark and move to the game over screen
    // in terms of enemy entities, this probably means cleaning up all child elements?
    // me.state.set(me.state.GAMEOVER, new game.LoseScreen());
}

/**
 * A basic enemy entity
 */
game.Enemy = me.Entity.extend({
    init: function(y, health, attackPower, settings) {
        // TODO: specify height and image for different enemy types
        settings.width = 576;
        settings.height = 32;
        settings.framewidth = 32;

        // enemies start on the right and travel to the left
        // TODO: Entities are pre-inserted in Tiled for now -- change that!
        // this._super(me.Entity, 'init', [1024, yCoord, settings]);
        this._super(me.Entity, 'init', [752, y, settings]);

        // max friction
        this.body.setFriction(0.4, 0.4);

        this.alwaysUpdate = true;
        this.alive = true;

        // TODO: confirm the end position
        this.endX = 176;
        this.endY = (me.game.viewport.height / 2) + 240;
        this.reachedEnd = false;
        this.health = health;
	this.maxHealth = health;
        this.attackPower = attackPower;
        this.timer = 0;
        this.deployed = true;
    },
    
    
    /**
     * Collision handler
    */
    onCollision: function (response, other) {
        if (response.b.body.collisionType === me.collision.types.ACTION_OBJECT) {
            if(this.alive && (response.overlapV.x < 0)) {
                this.renderable.flicker(750);
                this.alive = false;
            }
            return false;
        }
        // make all other objects solid
       return true;

    },

    draw: function(renderer) {
	this._super(me.Entity, "draw", [renderer]);
	this.drawHealthBar(renderer);
    },

    drawHealthBar: function(renderer) {
	//draw black background
	renderer.setColor("rgba(0,0,0,1)");
	renderer.fillRect(-16, -25, 32, 5);

	//draw green health bar overlay
	var remainingHealth = (this.health / this.maxHealth) * 32;
	console.log(remainingHealth);
	if (remainingHealth < 0) {
		remainingHealth = 0;
	}

	renderer.setColor("rgba(0,230,64,1)");
	renderer.fillRect(-16, -25, remainingHealth, 5);
    }
});

/**
 * Grindylow Entity
 */
game.GrindylowEnemy = game.Enemy.extend({
    init: function(y) {
        settings = {
            image: 'grindylow_right'
        }
        this._super(game.Enemy, 'init', [y, GRINDYLOW_HEALTH, GRINDYLOW_ATTACK, settings]);

        // max walking speed
        this.body.setMaxVelocity(1, 0);

        // TODO: add the attack animation
        // TODO: add the takeDamage animation
        // TODO: add the die animation

        this.renderable.addAnimation("move", [4, 5, 6, 7]);
        this.renderable.addAnimation("stand", [0, 1, 2, 3]);
        this.renderable.setCurrentAnimation('stand'); 	
    },

    update: function(dt) {
        if (this.alive && !this.reachedEnd) {
            if (this.body.force.x) {
                // move toward the objective -- left only
                if (this.pos.x > this.endX) {
                    if (Math.floor(this.pos.x + 16) % 32 !== 0) {
                        this.body.force.x = -this.body.maxVel.x;
                    } else {
                        // pause the enemy on each square
                        this.body.force.x = 0;
                    }
                } else {
                    this.reachedEnd = true;
                }
            } else if (this.timer < 3000) {
                // pause the enemy for 3 seconds
                this.timer += dt;
            } else {
                // resume movement
                this.timer = 0;
                this.body.force.x = -this.body.maxVel.x;
            }
            // if blocked, attack the tower blocking the path
        } else {
            this.body.force.x = 0;
            if (!this.alive) {
                // drop BeanEntity and add attackPower to spell casting power
                onEnemyDeath(this, GRINDYLOW_ATTACK);
            } else if (this.reachedEnd) {
                // TODO: game over... raise the dark mark!
                me.state.change(me.state.GAMEOVER);
	      }		
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
     * Collision handler
     * TODO: override this
    */
    onCollision: function (response, other) {
        if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
            if(this.alive && (response.overlapV.x < 0)) {
                this.renderable.flicker(750);
                this.alive = false;
            }
            return false;
        }
        // make all other objects solid
        return true;
    }

});

/**
 * Acromantula Entity
 */
game.AcromantulaEnemy = game.Enemy.extend({
    init: function(y) {
        settings = {
            image: 'acromantula'
        }
        this._super(game.Enemy, 'init', [y, ACROMANTULA_HEALTH, ACROMANTULA_ATTACK, settings]);

        // max walking speed
        // this.body.setMaxVelocity(1, 1);
        this.body.setMaxVelocity(1, 0);

        // TODO: add the move animation
        // TODO: add the attack animation
        // TODO: add the takeDamage animation
        // TODO: add the die animation
        // TODO: set the animation up correctly
        this.renderable.addAnimation("move", [6, 14, 22, 30]);
        this.renderable.addAnimation("die", [0, 1, 2, 3, 4, 5, 6, 7]);
        this.renderable.setCurrentAnimation('move');
    },

    update: function(dt) {
        if (this.alive && !this.reachedEnd) {
            if (this.body.force.x) {
                // move toward the objective -- left only
                if (this.pos.x > this.endX) {
                    if (Math.floor(this.pos.x + 16) % 32 !== 0) {
                        this.body.force.x = -this.body.maxVel.x;
                    } else {
                        // pause the enemy on each square
                        this.body.force.x = 0;
                    }
                } else {
                    this.reachedEnd = true;
                }
            } else if (this.timer < 2000) {
                // pause the enemy for 2 second
                this.timer += dt;
            } else {
                // resume movement
                this.timer = 0;
                this.body.force.x = -this.body.maxVel.x;
            }
            // if blocked, attack the tower blocking the path
        // }
        // // TODO: come back to this
        // if (this.alive && !this.reachedEnd) {
        //     if (this.alive && !this.reachedEnd) {
        //         if (this.body.force.x) {
        //             // move toward the objective -- left, diag up, and diag down
        //             if (this.pos.x > this.endX) {
        //                 if (this.pos.y < this.endY) {
        //                     if (Math.floor(this.pos.x) % 32 !== 0 || Math.floor(this.pos.y) % 32 !== 0) {
        //                         this.body.force.x = -this.body.maxVel.x;
        //                         this.body.force.y = this.body.maxVel.y;
        //                     } else {
        //                         // pause the enemy on each square
        //                         this.body.force.x = 0;
        //                         this.body.force.y = 0;
        //                     }
        //                 } else {
        //                     this.body.force.y = -this.body.force.y * 2;
        //                 }
        //             } else {
        //                 this.reachedEnd = true;
        //             }
        //         } else if (this.timer < 2000) {
        //             // pause the enemy for 2 seconds
        //             this.timer += dt;
        //         } else {
        //             // resume movement
        //             this.timer = 0;
        //             this.body.force.x = -this.body.maxVel.x;

        //             if (this.goingUp || Math.floor(this.pos.y) >= this.endY) {
        //                 this.body.force.y = this.body.maxVel.y;
        //                 this.goingUp = true;
        //             } else {
        //                 this.body.force.y = 0;
        //                 this.goingUp = false;
        //             }
        //         }
        //     }
            // if blocked, attack the tower blocking the path
        } else {
            this.body.force.x = 0;
            if (!this.alive) {
                // drop BeanEntity and add attackPower to spell casting power
                onEnemyDeath(this, ACROMANTULA_ATTACK);
            } else if (this.reachedEnd) {
                // TODO: game over... raise the dark mark!
                me.state.change(me.state.GAMEOVER);
            }
        }

        // check & update movement
        this.body.update(dt);
	
        // handle collisions againt other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt])
                || this.body.vel.x !== 0
                || this.body.vel.y !== 0);
    }
});

/**
 * Dementor Entity
 */
game.DementorEnemy = game.Enemy.extend({
    init: function(y) {
        settings = {
            image: 'dementor'
        }
        this._super(game.Enemy, 'init', [y, DEMENTOR_HEALTH, DEMENTOR_ATTACK, settings]);

        // max walking speed
        this.body.setMaxVelocity(1, 0);

        // TODO: add the move animation
        // TODO: add the attack animation
        // TODO: add the takeDamage animation
        // TODO: add the die animation
        // TODO: set the animation up correctly
        this.renderable.addAnimation("move", [12, 11, 10, 9, 8, 7]);
        this.renderable.addAnimation("die", [0, 1, 2, 3]);
        this.renderable.setCurrentAnimation('move');
    },

    update: function(dt) {
        if (this.alive && !this.reachedEnd) {
            if (this.body.force.x) {
                // move toward the objective -- left, up, down, diag up, diag down
                // TODO: add diags, ups, downs
                if (this.pos.x > this.endX) {
                    if (Math.floor(this.pos.x + 16) % 32 !== 0) {
                        this.body.force.x = -this.body.maxVel.x;
                    } else {
                        // pause the enemy on each square
                        this.body.force.x = 0;
                    }
                } else {
                    this.reachedEnd = true;
                }
            } else if (this.timer < 1000) {
                // pause the enemy for 1 second
                this.timer += dt;
            } else {
                // resume movement
                this.timer = 0;
                this.body.force.x = -this.body.maxVel.x;
            }
            // if the next step is blocked, either pick another step
            // or attack the tower which is blocking the path
        }  else {
            this.body.force.x = 0;
            if (!this.alive) {
                // drop BeanEntity and add attackPower to spell casting power
                onEnemyDeath(this, DEMENTOR_ATTACK);
            } else if (this.reachedEnd) {
                // TODO: game over... raise the dark mark!
                me.state.change(me.state.GAMEOVER);
            }
        }

        // check & update movement
        this.body.update(dt);
	
        // handle collisions againt other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt])
                || this.body.vel.x !== 0
                || this.body.vel.y !== 0);
    }
});
