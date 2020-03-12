/**
 * A winner screen
**/
game.WinnerScreen = me.ScreenObject.extend({
	/*
	 * action to perform on state change
	*/
	onResetEvent: function() {
		//winner screen
		var winImage = new me.Sprite(0, 0, {
			image: me.loader.getImage("Winner")
		});

		//position and scale to fit with the viewport size
		winImage.anchorPoint.set(0, 0);
		winImage.scale(me.game.viewport.width / winImage.width, me.game.viewport.height / winImage.height);

		//add to the world container
		me.game.world.addChild(winImage, 1);

		//add a new renderable component with the scrolling text
		me.game.world.addChild(new (me.Renderable.extend({
			//constructor
			init: function() {
				this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);

			//font for the text
			this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));
		},

		//some callback for the tween objects
		scrollover: function() {
			//reset to the default value
			this.scrollerpos = 1024;
			this.scrollertween.to({ scrollerpos: -2200}, 10000).onComplete(this.scrollover.bind(this)).start();
		},

		update: function(dt) {
			return true;
		},

		draw: function(renderer) {
			this.font.draw(renderer, "VOLDEMORT AND HIS ARMY IS VANQUISHED", 635, 700);
			this.font.draw(renderer, "CLICK OR PRESS ENTER TO PLAY AGAIN", 765, 775);
		},
	})), 2);

		//change to play state on press Enter or click
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
		this.handler = me.event.subscribe(me.event.KEDOWN, function(action, keyCode, edge) {
			if (action === "enter") {
				me.audio.play("cling");
				me.state.change(me.state.PLAY);
			}
		});
	},
	
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindPointer(me.input.pointer.LEFT);
		me.event.unsubscribe(this.handler);
	}
});

