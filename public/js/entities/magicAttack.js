game.MagicAttack = me.Entity.extend({
	init : function (x, y, settings) {
	this._super(me.Entity, "init", [x, y, { width: 7, height: 7 }]);
	this.body.collisionType = me.collision.type.PROJECTILE_OBJECT;
	this.body.setVelocity(0, 200);
	this.magicDamage = settings.magicDamage;
	this.alwaysUpdate = true;
	this.renderable = new (me.Renderable.extend({
		init : function() {
			this._super(me.Renderable, "init", [0, 0, 8, 8]);
		},
		destroy : function () {},
		draw : function (renderer) {
			var color = renderer.getColor();
			renderer.setColor('#00FFFF');
			renderer.fillRect(0, 0, this.width, this.height);
			renderer.setColor(color);
		},
	}));
	},

	update : function (dt) {
		this.body.vel.x -= this.body.accel.x * dt / 1000;
		if (this.pos.x + this.width >= 0) {
			me.game.world.removeChild(this);
		}

		this.body.update();
		me.collision.check(this);
		return true;
	},

	onCollision : function (res, other) {
		if(other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
			me.game.world.removeChild(this);
		}
		return true;
	}
});

