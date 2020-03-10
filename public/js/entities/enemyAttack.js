/**
 * enemy attack on spell effect
**/

game.EnemyAttack = me.Entity.extend({
	init: function(x, y, settings) {
		settings.width = 32;
		settings.height = 32;
		settings.framewidth = 32;
		settings.image = "enemyAttack";

		//call parent constructor
		this._super(me.Entity, "init", [x, y, settings]);

		this.addAnimation("attack", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		this.setCurrentAnimation("attack");
	}

});
