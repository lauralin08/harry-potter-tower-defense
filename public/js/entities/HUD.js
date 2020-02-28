/**
 * a HUD container and child items
 */
game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(-10, -10));

        // add our child beans object at the top right corner
        this.addChild(new game.HUD.Beans(-10, -10));
    }
});

/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        // create the font object
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));

        // font alignment to right, bottom
        this.font.textAlign = 'right';
        this.font.textBaseline = 'bottom';

        // local copy of the global score
        this.score = -1;
    },

    /**
     * update function
     */
    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (renderer) {
        // calculate the bottom right of the map (272 is half the map height + 1 tile height)
        var scoreY = (me.game.viewport.height / 2) + 272 - this.pos.y;
        // this.pos.x and this.pos.y are the relative position from the screen right bottom
        this.font.draw(renderer, game.data.score, me.game.viewport.width + this.pos.x, scoreY);
    }

});
 
/**
 * a basic HUD item to display spell casting power
 */
game.HUD.Beans = me.Renderable.extend({
    init: function(x, y) {
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        // TODO: create and align the font object
        // create the font object
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));

        // font alignment to right, bottom
        this.font.textAlign = 'right';
        this.font.textBaseline = 'bottom';

        this.beans = -1;
    },

    update: function(dt) {
        // return true if the spell casting power has been updated
        if (this.beans !== game.data.beans) {
            this.beans = game.data.beans;
            return true;
        }
        return false;
    },

    draw: function(renderer) {
        // calculate the top right of the map (272 is half the map height + 1 tile height)
        var beanCounterY = (me.game.viewport.height / 2) - 272 - this.pos.y;
        // this will display the spell casting power in the top right
        this.font.draw(renderer, game.data.beans, me.game.viewport.width + this.pos.x, beanCounterY);
    }
});