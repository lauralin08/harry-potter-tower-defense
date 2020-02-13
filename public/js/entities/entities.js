/**
 * Bertie Botts Every Flavour Beans Entity
 */
game.BertieBottsBean = me.CollectableEntity.extend({
    init: function(x, y, settings) {
        this._super(me.CollectableEntity, 'init', [x, y, settings]);
    }
    
    // TODO: add the logic for "collecting" the bean, which should
    // happen automatically x seconds after it appears
});

/**
 * Tower Upgrade Entity
 */
game.TowerUpgrade = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, settings]);
    }

    // TODO: think about if this should be a property of each tower or its own entity
});

/**
 * Dark Mark Entity
 */
game.DarkMark = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, settings]);
    }

    // TODO: think about if this should simply be an animated screen, or an entity
    // that actually moves up the screen and can be clicked on to restart the game
});





// /**
//  * Player Entity
//  */
// game.PlayerEntity = me.Entity.extend({

//     /**
//      * constructor
//      */
//     init: function (x, y, settings) {
//         // call the constructor
//         this._super(me.Entity, 'init', [x, y , settings]);

//         // max walking & jumping speed
//         this.body.setMaxVelocity(3, 15);
//         this.body.setFriction(0.4, 0);

//         // set the display to follow our position on both axes
//         me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

//         // ensure the player is updated even when outside of the viewport
//         this.alwaysUpdate = true;

//         // define basic walking animation using all frames
//         this.renderable.addAnimation('walk', [0, 1, 2, 3, 4, 5, 6, 7]);

//         // define standing animation using first frame
//         this.renderable.addAnimation('stand', [0]);

//         // set the standing animation as default
//         this.renderable.setCurrentAnimation('stand');
//     },

//     /**
//      * update the player position
//      */
//     update : function (dt) {

//         if (me.input.isKeyPressed('left')) {
//             // flip the sprite on horizontal axis
//             this.renderable.flipX(true);

//             // update the player velocity
//             this.body.force.x = -this.body.maxVel.x;
            
//             // change to the walking animation
//             if (!this.renderable.isCurrentAnimation('walk')) {
//                 this.renderable.setCurrentAnimation('walk');
//             }
//         } else if (me.input.isKeyPressed('right')) {
//             // unflip the sprite
//             this.renderable.flipX(false);
            
//             // update the player velocity
//             this.body.force.x = this.body.maxVel.x;
           
//             // change to the walking animation
//             if (!this.renderable.isCurrentAnimation('walk')) {
//                 this.renderable.setCurrentAnimation('walk');
//             }
//         } else {
//             this.body.force.x = 0;
           
//             // change to the standing animation
//             this.renderable.setCurrentAnimation('stand');
//         }

//         if (me.input.isKeyPressed('jump')) {
//             if (!this.body.jumping && !this.body.falling) {
//                 // set current vel to the max defined value
//                 // gravity will then do the rest
//                 this.body.force.y = -this.body.maxVel.y
                
//                 // set the jumping flag
//                 this.body.jumping = true;

//                 // play a jumping sound
//                 me.audio.play('jump');
//             }
//         } else {
//             this.body.force.y = 0;
//         }

//         // apply physics to the body (this moves the entity)
//         this.body.update(dt);

//         // handle collisions against other shapes
//         me.collision.check(this);

//         // return true if we moved or if the renderable was updated
//         return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
//     },

//    /**
//      * colision handler
//      * (called when colliding with other objects)
//      */
//     onCollision : function (response, other) {
//         switch (response.b.body.collisionType) {
//             case me.collision.types.WORLD_SHAPE:
//                 // Simulate a platform object
//                 if (other.type === 'platform') {
//                     if (this.body.falling && !me.input.isKeyPressed('down') &&
//                         response.overlapV.y > 0 && ~~this.body.vel.y >= ~~response.overlapV.y) {
//                             // This means the player is close enough and fast enough to hit the platform
//                             // Disable collision on the x axis
//                             response.overlapV.x = 0;

//                             // respond to the platform (it is solid)
//                             return true;
//                         }
//                         // Do not respond to the platform (pass through)
//                         return false;
//                 }
//                 break;
//             case me.collision.types.ENEMY_OBJECT:
//                 if (response.overlapV.y > 0 && !this.body.jumping) {
//                     // bounce (force jump)
//                     this.body.falling = false;
//                     this.body.vel.y = -this.body.maxVel.y * me.timer.tick;

//                     // set the jumping flag
//                     this.body.jumping = true;

//                     // play a stomping sound
//                     me.audio.play('stomp');
//                 } else {
//                     // let's flicker upon touching an enemy
//                     this.renderable.flicker(750);
//                 }
//             default:
//                 // Do not respond to other objects (e.g. coins)
//                 return false;
//         }
//         // Make the player solid
//         return true;
//     }
// });

// /**
//  * a Coin entity
//  */
// game.CoinEntity = me.CollectableEntity.extend({
//     // we don't really need the init function here because we don't init anything extra
//     // but we'll leave it so we can modify it for HP later
//     init: function (x, y, settings) {
        
//         // we could init the properties here but we did in in Tiled instead

//         this._super(me.CollectableEntity, 'init', [x, y, settings]);
//     },

//     // here, collision = collected
//     onCollision: function (response, other) {
//         // play a 'coin collected' sound
//         me.audio.play('cling');

//         // add to the score
//         game.data.score += 250;

//         // make sure it cannot be collected 'again'
//         this.body.setCollisionMask(me.collision.types.NO_OBJECT);

//         // remove it
//         me.game.world.removeChild(this);
//     }
// });

// /**
//  * an Enemy entity
//  */
// game.EnemyEntity = me.Entity.extend({
//     init: function (x, y, settings) {
//         // save the area size as defined in Tiled
//         var width = settings.width;

//         // define this here instead of Tiled
//         settings.image = 'wheelie_right';

//         // adjust the size setting information to match the sprite size
//         // so that the entity object is created with the right size
//         settings.framewidth = settings.width = 64;
//         settings.frameheight = settings.height = 64;

//         this._super(me.Entity, 'init', [x, y, settings]);

//         // max walking & jumping speed
//         this.body.setMaxVelocity(1, 0);
//         this.body.setFriction(0.4, 0);

//         this.alwaysUpdate = true;

//         this.renderable.addAnimation('move', [0, 1, 2, 3]);
//         this.renderable.setCurrentAnimation('move');

//         // set start/end position based on the initial area size
//         x = this.pos.x;
//         this.startX = x;
//         this.pos.x = this.endX = x + width - this.width;

//         // to remember which side the enemy is walking
//         this.walkLeft = false;

//         // make the enemy 'alive'
//         this.alive = true;
//     },

//     // manage the enemy movement
//     update: function (dt) {

//         if (this.alive) {
//             if (this.walkLeft) {
//                 if (this.pos.x <= this.startX) {
//                     this.body.force.x = this.body.maxVel.x;
//                     this.renderable.flipX(false);
//                     this.walkLeft = false;
//                 }
//             } else {
//             //     this.body.force.x = this.body.maxVel.x;
//                 if (this.pos.x >= this.endX) {
//                     this.body.force.x = -this.body.maxVel.x;
//                     this.renderable.flipX(true);
//                     this.walkLeft = true;
//                 }
//             }
//         } else {
//             this.body.force.x = 0;
//         }
//         // check & update movement
//         this.body.update(dt);

//         // handle collisions against other shapes
//         me.collision.check(this);

//         // return true if we moved or if the renderable was updated
//         return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
//     },

//     onCollision: function (response, other) {
//         if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
//             // res.y >0 means touched by the bottom of something
//             // so this makes the enemy flicker if something is jumping on top of it
//             if (this.alive && response.overlapV.y > 0 && response.a.body.falling) {
//                 this.renderable.flicker(750);
//             }
//             return false;
//         }
//         // Make all other objects solid
//         return true;
//     }
// });
