// TODO: confirm health values
const GRINDYLOW_HEALTH = 10;
const GRINDYLOW_ATTACK = 5;
const ACROMANTULA_HEALTH = 20;
const ACROMANTULA_ATTACK = 10;
const DEMENTOR_HEALTH = 30;
const DEMENTOR_ATTACK = 15;

function onEnemyDeath(enemy) {
  // prevent duplicate removal
  if (enemy.deployed) {
    // remove this enemy from the total enemy count
    game.data.enemies--;
    
    // TODO: add death animation
    me.game.world.addChild(new game.BertieBottsBean(enemy.pos.x, enemy.pos.y));
    me.game.world.removeChild(enemy);
    game.data.beans += enemy.attackPower;
    enemy.deployed = false;
  }
}

function onGameOver() {
  if (!game.data.gameOver) {
    me.state.change(me.state.GAMEOVER);
    game.data.gameOver = true;
  }
  // stop the enemy waves still being generated
  if (game.data.waiting) {
    game.data.waiting = false;
  }
}

/**
 * A basic enemy entity
 */
game.Enemy = me.Entity.extend({
  init: function(y, health, attackPower, settings) {
    settings.width = 32;
    settings.height = 32;
    settings.framewidth = 32;

    // enemies start on the right and travel to the left
    this._super(me.Entity, 'init', [992, y, settings]);

    // max friction
    this.body.setFriction(0.4, 0.4);

    // set collision properties
    this.body.collisionType = me.collision.types.ENEMY_OBJECT;
    this.body.setCollisionMask(me.collision.types.ACTION_OBJECT | me.collision.types.PROJECTILE_OBJECT);

    this.alwaysUpdate = true;
    // this.updateWhenPaused = true;
    this.alive = true;

    // set remaining properties
    this.endX = 464;
    this.endY = 512;
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
  onCollision: function(response, other) {
    // TODO: add attack and/or takeDamage animation
    if (other.body.collisionType === me.collision.types.ACTION_OBJECT) {
      this.health -= other.attackPower;
    }
    if (other.body.collisionType === me.collision.types.PROJECTILE_OBJECT) {
      this.health -= other.magicDamage;
    }
    if (this.health <= 0) {
      this.alive = false;
    }
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
    // console.log(remainingHealth);
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
    var settings = {
        image: 'grindylow_right'
    };
    this._super(game.Enemy, 'init', [y, GRINDYLOW_HEALTH, GRINDYLOW_ATTACK, settings]);

    // max walking speed
    this.body.setMaxVelocity(1, 0);

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
            if (this.pos.x - 32 <= this.endX) {
                this.reachedEnd = true;
            }
          }
        }
      } else if (this.timer < 3000) {
        // pause the enemy for 3 seconds
        this.timer += dt;
      } else {
        // resume movement
        this.timer = 0;
        this.body.force.x = -this.body.maxVel.x;
      }
    } else {
      this.body.force.x = 0;
      if (!this.alive) {
        // drop BeanEntity and add attackPower to spell casting power
        onEnemyDeath(this);
      } else if (this.reachedEnd) {
        onGameOver();
      }		
    }

    // check & update movement
    this.body.update(dt);

    // handle collisions againt other shapes
    me.collision.check(this);

    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  }
});

/**
 * Acromantula Entity
 */
game.AcromantulaEnemy = game.Enemy.extend({
  init: function(y) {
    var settings = {
        image: 'acromantula'
    };
    this._super(game.Enemy, 'init', [y, ACROMANTULA_HEALTH, ACROMANTULA_ATTACK, settings]);

    // max walking speed
    // TODO: allow y-axis movement
    this.body.setMaxVelocity(1, 0);

    // TODO: add the takeDamage animation
    // TODO: add the attack animation
    // TODO: add the die animation
    this.renderable.addAnimation("move", [6, 14, 22, 30]);
    this.renderable.addAnimation("die", [0, 1, 2, 3, 4, 5, 6, 7]);
    this.renderable.setCurrentAnimation('move');
  },

  update: function(dt) {
    if (this.alive && !this.reachedEnd) {
      if (this.body.force.x) {
        // move toward the objective -- left only
        // TODO: allow diagonal movement
        if (this.pos.x > this.endX) {
          if (Math.floor(this.pos.x + 16) % 32 !== 0) {
            this.body.force.x = -this.body.maxVel.x;
          } else {
            // pause the enemy on each square
            this.body.force.x = 0;
            if (this.pos.x - 32 <= this.endX) {
              this.reachedEnd = true;
            }
          }
        }
      } else if (this.timer < 2000) {
        // pause the enemy for 2 second
        this.timer += dt;
      } else {
        // resume movement
        this.timer = 0;
        this.body.force.x = -this.body.maxVel.x;
      }
    } else {
      this.body.force.x = 0;
      if (!this.alive) {
        // drop BeanEntity and add attackPower to spell casting power
        this.renderable.setCurrentAnimation('die');
        onEnemyDeath(this);
      } else if (this.reachedEnd) {
        onGameOver();
      }
    }

    // check & update movement
    this.body.update(dt);

    // handle collisions againt other shapes
    me.collision.check(this);

    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  }
});

/**
 * Dementor Entity
 */
game.DementorEnemy = game.Enemy.extend({
  init: function(y) {
    var settings = {
        image: 'dementor'
    };
    this._super(game.Enemy, 'init', [y, DEMENTOR_HEALTH, DEMENTOR_ATTACK, settings]);

    // max walking speed
    // TODO: allow up, down, and diagonal movement
    this.body.setMaxVelocity(1, 0);

    // TODO: add the attack animation
    // TODO: add the takeDamage animation
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
            if (this.pos.x - 32 <= this.endX) {
                this.reachedEnd = true;
            }
          }
        }
      } else if (this.timer < 1000) {
        // pause the enemy for 1 second
        this.timer += dt;
      } else {
        // resume movement
        this.timer = 0;
        this.body.force.x = -this.body.maxVel.x;
      }
    } else {
      this.body.force.x = 0;
      if (!this.alive) {
        // drop BeanEntity and add attackPower to spell casting power
        this.renderable.setCurrentAnimation('die');
        onEnemyDeath(this);
      } else if (this.reachedEnd) {
        onGameOver();
      }
    }

    // check & update movement
    this.body.update(dt);

    // handle collisions againt other shapes
    me.collision.check(this);

    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  }
});
