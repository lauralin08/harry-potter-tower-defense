/**
 * The Game Lost Screen
**/

game.LoserScreen = me.ScreenObject.extend({
    /**
      * action to perform on state change
    **/
    onResetEvent: function() {
	//gameover screen
	var loserImage = new me.Sprite(0, 0, {
		image: me.loader.getImage('DarkMark'),
	});

	// position and scale to fit the viewport size
	loserImage.anchorPoint.set(0, 0);
	loserImage.scale(me.game.viewport.width / loserImage.width, me.game.viewport.height / loserImage.height);

	//add to the world container
	me.game.world.addChild(loserImage, 1);

	//add a new renderable component with the scrolling text
	me.game.world.addChild(new (me.Renderable.extend({
		//constructor
		init: function() {
			this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);

			//font for the scrolling text
			this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));
		},

		// some callback for the tween objects
		scrollover: function() {
			//reset to default value
			this.scrollerpos = 1024;
			this.scrollertween.to({ scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
		},

		update: function(dt) {
			return true;
		},

		draw: function(renderer) {
			this.font.draw(renderer, "GAME OVER", 635, 700);
			this.font.draw(renderer, "CLICK OR PRESS ENTER TO PLAY AGAIN", 635, 800);
		},

	})), 2);

	//change to play state on press enter or click/tap
	me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
	this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
		if (action === "enter") {
			me.audio.play("cling");
			me.state.change(me.state.PLAY);
			}
		});
    },

    /**
      * action to perform when leaving this screen (state change)
    **/
    onDestroyEvent: function() {
	me.input.unbindKey(me.input.KEY.ENTER);
	me.input.unbindPointer(me.input.pointer.LEFT);
	me.event.unsubscribe(this.handler);
    }
});
