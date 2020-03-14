/*
 * A How to Play Screen
*/
game.LearnScreen = me.ScreenObject.extend({
	/**
	 * action to perform on state change
	**/
	onResetEvent: function() {
		//learn screen
		var learnImage = new me.Sprite(0, 0, {
			image: me.loader.getImage('Tutorial'),
		});

		//position and scale to fit within the viewport size
		learnImage.anchorPoint.set(0, 0);
		learnImage.scale(me.game.viewport.width / learnImage.width, me.game.viewport.height / learnImage.height);

		//add to the world container
		me.game.world.addChild(learnImage, 1);

    //change to menu state on press Enter or click
    me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
    this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
      if (action === "enter") {
        me.audio.play("Nox");
        me.state.change(me.state.MENU);
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


