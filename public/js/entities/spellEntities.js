// TODO: confirm health and attack values
const IMPERTURBABLE_HEALTH = 20;
const IMPERTURBABLE_ATTACK = 0;
const PROTEGO_HEALTH = 30;
const PROTEGO_ATTACK = 10;
const PATRONUS_HEALTH = 40;
const PATRONUS_ATTACK = 15;

/**
 * A basic spell entity
 */
game.Spell = me.Entity.extend({
  init: function(x, y, health, attackPower, settings) {
    settings.width = 32;
    settings.height = 32;
    settings.framewidth = 32;
    this._super(me.Entity, 'init', [x, y, settings]);

    this.alwaysUpdate = true;
    this.alive = true;
    this.body.collisionType = me.collision.types.ACTION_OBJECT;
    this.body.setCollisionMask(me.collision.types.ENEMY_OBJECT);

    this.upgradeLevel = 0;
    this.health = health;
    this.maxHealth = health;
    this.attackPower = attackPower;

    // TODO: add the tower upgrade button and behavior
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
	  return true;
  }    
});

/**
 * Imperturbable Charm Entity
 */
game.ImperturbableCharmSpell = game.Spell.extend({
  init: function(x, y) {
    var settings = {
      image: "imperturbable"
    }
    this._super(game.Spell, 'init', [x, y, IMPERTURBABLE_HEALTH, IMPERTURBABLE_ATTACK, settings]);

    // add the idle animation
    // add the cast animation 
    this.renderable.addAnimation("idle", [0]);
    this.renderable.addAnimation("cast", [1, 2, 3, 4, 5, 6]);
    this.renderable.setCurrentAnimation("cast", "idle");

    me.audio.play("Imperturbable");
  },
  
  onCollision: function(response, other) {
    if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
      this.renderable.setCurrentAnimation("cast", "idle");
      me.audio.play("Imperturbable");
      // decrease healths
      this.health -= response.b.attackPower / 100;
      // check for deaths
      if (this.health <= 0) {
        this.alive = false;
        me.game.world.removeChild(this);
      }
      return true;
    }
  }
});

/**
 * Protego Diabolica Entity
 */
game.ProtegoDiabolicaSpell = game.Spell.extend({
  init: function(x, y) {
    var settings = {
      image: "Protego_Diabolica"
    }
    this._super(game.Spell, 'init', [x, y, PROTEGO_HEALTH, PROTEGO_ATTACK, settings]);

    // TODO: add the deflect animation
    // TODO: add the explode animation
    this.renderable.addAnimation("idle", [0, 1, 2, 3, 4]);
    this.renderable.addAnimation("cast", [5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23]);
    this.renderable.setCurrentAnimation('cast', 'idle');

    me.audio.play("Protego_Diabolica");
  },

  onCollision: function(response, other) {
    if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
      this.renderable.setCurrentAnimation("cast", "idle");
      me.audio.play("Protego_Diabolica");
      // decrease health
      this.health -= other.attackPower;
      
      // check for deaths
      if (this.health <= 0) {
        this.alive = false;
        me.game.world.removeChild(this);
      }
      return true;
    }
  }
});

/**
 * Patronus Charm Entity
 */
game.PatronusCharmSpell = game.Spell.extend({
  init: function(x, y) {
    var settings = {
      image: "Patronus"
    }
    this._super(game.Spell, 'init', [x, y, PATRONUS_HEALTH, PATRONUS_ATTACK, settings]);

    // TODO: add the deflect animation
    // TODO: add the explode animation
    this.renderable.addAnimation("idle", [33, 34, 35, 36, 37, 38, 39, 40, 41, 42]);
    this.renderable.addAnimation("attack", [5, 6, 7, 8, 9, 10]);
    this.renderable.addAnimation("cast", [0, 1, 2, 3, 4, 11, 12, 13, 14, 15, 22, 23, 24, 25]);
    this.renderable.setCurrentAnimation('cast', 'idle');

    me.audio.play("Expecto_Patronum");
  },

  onCollision : function (response, other) {
    if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
      this.renderable.setCurrentAnimation("attack", "idle");
      this.magicAttack();
      me.audio.play("Expecto_Patronum");

      // decrease health
      this.health -= other.attackPower;
      
      // check for deaths
      if (this.health <= 0) {
        this.alive = false;
        me.game.world.removeChild(this);
      }
      return true;
    }
  },

  magicAttack: function() {
    var settings = {
      magicDamage: this.attackPower
    }
    this.newMagic = me.pool.pull("MagicAttack", this.pos.x - 8, this.pos.y - 8, settings);
    me.game.world.addChild(this.newMagic, 2);
  }
});
