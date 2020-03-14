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
    me.game.viewport.reset(0, 0);
    // position and scale to fit the viewport size
    loserImage.anchorPoint.set(0, 0);
    loserImage.scale(me.game.viewport.width / loserImage.width, me.game.viewport.height / loserImage.height);

    //add to the world container
    me.game.world.addChild(loserImage, 1);

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
