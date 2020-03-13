/**
 * Bertie Botts Every Flavour Beans Entity
 */
game.BertieBottsBean = me.CollectableEntity.extend({
  init: function(x, y) {
    var settings = {
        height: 32,
        width: 32
    };
    this._super(me.CollectableEntity, 'init', [x, y, settings]);

    // TODO: add the die animation

    this.timer = 0;
  },
  update: function(dt) {
    if (this.timer < 2000) {
      this.timer += dt;
    } else {
      // remove the bean after 2 seconds
      me.game.world.removeChild(this);
    }
    // check & update movement
    this.body.update(dt);
  }
});
