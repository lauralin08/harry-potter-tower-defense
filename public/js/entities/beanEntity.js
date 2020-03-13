/**
 * Bertie Botts Every Flavour Beans Entity
 */
game.BertieBottsBean = me.CollectableEntity.extend({
  init: function(x, y) {
    var settings = {
        height: 32,
        width: 32,
        image: 'beans'
    };
    this._super(me.CollectableEntity, 'init', [x, y, settings]);
  },
  
  update: function(dt) {
    // check & update movement
    this.body.update(dt);
  }
});
