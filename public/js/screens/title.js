/**
 * A title screen
 */
game.TitleScreen = me.ScreenObject.extend({
    /**
     * action to perform on state change
     */
    onResetEvent: function() {
        // title screen
        var backgroundImage = new me.Sprite(0, 0, {
            image: me.loader.getImage('title_screen'),
        });

        // position and scale to fit with the viewport size
        backgroundImage.anchorPoint.set(0, 0);
        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);
        
        // add to the world container
        me.game.world.addChild(backgroundImage, 1);

        // add a new renderable component with the scrolling text
        me.game.world.addChild(new (me.Renderable.extend({
            // constructor
            init : function() {
                this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);

                // font for the scrolling text
                this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));
            },

            update: function(dt) {
                return true;
            },
	/*
            draw: function(renderer) {
                // TODO: fix this rendering
                this.font.draw(renderer, "DEFEND THE WIZARDING WORLD OF HARRY POTTER", 2000, 1000);
                this.font.draw(renderer, "CLICK OR PRESS ENTER TO PLAY", 2150, 1200);
		this.font.draw(renderer, "PRESS L TO LEARN HOW TO PLAY", 2150, 1400);
                // this.font.draw(renderer, "A HARRY POTTER THEMED TOWER DEFENSE GAME", 635, 1050);
                // this.font.draw(renderer, "CLICK OR PRESS ENTER TO PLAY", 765, 1125);
            },
	*/
        })), 2);

        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
	// change to how to play state on press L
	me.input.bindKey(me.input.KEY.L, "learn", true);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if (action === "enter") {
                // play something on tap / enter
                // this will unlock audio on mobile devices
                me.audio.play("cling");
                me.state.change(me.state.PLAY);
            }

	    if (action === "learn") {
		me.audio.play("Lumos");
		me.state.change(me.state.SETTINGS);
	    }
        });
    },

    /**
     * action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.pointer.LEFT);
	me.input.unbindKey(me.input.KEY.L);
        me.event.unsubscribe(this.handler);
    }
});
