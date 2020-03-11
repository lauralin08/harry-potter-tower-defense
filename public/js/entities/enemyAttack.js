/**
 * enemy attack on spell effect
**/

game.EnemyAttack = me.Entity.extend({
	init: function(x, y, settings) {
		settings = {
			"width" : 32,
			"height" : 32,
			"framewidth" : 32,
			"image" : "enemyAttack"
		}

		//call parent constructor
		this._super(me.Entity, "init", [x, y, settings]);

		this.renderable.addAnimation("attack", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		this.renderable.setCurrentAnimation("attack");
	}

});
