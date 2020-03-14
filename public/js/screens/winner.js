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
			image: me.loader.getImage("Winner"),
		});

		//position and scale to fit with the viewport size
		winImage.anchorPoint.set(0, 0);
		winImage.scale(me.game.viewport.width / winImage.width, me.game.viewport.height / winImage.height);

		//add to the world container
		me.game.world.addChild(winImage, 1);

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
