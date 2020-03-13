// TODO: check these values
const IMPERTURBABLE_COST = 20;
const PROTEGO_COST = 30;
const PATRONUS_COST = 40;

function getClosestSquareCoord(coord) {
  return 32 - (coord % 32) + coord;
}

game.SpellCost = me.Renderable.extend({
  init: function(x, y, spellCost) {
    this._super(me.Renderable, 'init', [x, y, 10, 10]);

    // create the font object
    this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));

    // font alignment to right, bottom
    this.font.textAlign = 'right';
    this.font.textBaseline = 'bottom';

    this.spellCost = spellCost;
    this.posX = x + 42;
    this.posY = y + 64;
  },

  draw: function (renderer) {
    this.font.draw(renderer, this.spellCost, this.posX, this.posY);
  }
});

game.SpellCaster = me.DraggableEntity.extend({
  init: function (x, y, settings) {
    // call the super constructor
    this._super(me.DraggableEntity, "init", [x, y, settings]);

    // do not allow any collisions
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
  },

  update: function () {
      return true;
  },

  dragEnd: function (e) {
    this._super(me.DraggableEntity, "dragEnd", [e]);
    // set x and y as the closest square to the pointer
    this.castX = getClosestSquareCoord(this.pos.x);
    this.castY = getClosestSquareCoord(this.pos.y);
    this.pos.x = this.startX;
    this.pos.y = this.startY;
  }
});

game.ImperturbableCharmSpellCaster = game.SpellCaster.extend({
  init: function (x, y) {
    var settings = {
      height: 32,
      width: 32,
      image: "imperturbable"
    }
    this._super(game.SpellCaster, "init", [x, y, settings]);
    this.renderable.addAnimation("idle", [0]);
    this.renderable.setCurrentAnimation("idle");

    this.startX = 192;
    this.startY = 384;
    this.spellCost = IMPERTURBABLE_COST;
    me.game.world.addChild(new game.SpellCost(this.startX, this.startY, this.spellCost), Infinity);
  },

  dragEnd: function (e) {
    this._super(game.SpellCaster, "dragEnd", [e]);
    if (game.data.beans >= IMPERTURBABLE_COST) {
      // TODO: make sure there isn't already a spell tower here
      me.game.world.addChild(me.pool.pull("ImperturbableCharmSpell", this.castX, this.castY), Infinity);
      game.data.beans -= IMPERTURBABLE_COST;
    }
  }
});

game.ProtegoDiabolicaSpellCaster = game.SpellCaster.extend({
  init: function (x, y) {
    var settings = {
      height: 32,
      width: 32,
      image: "Protego_Diabolica"
    }
    this._super(game.SpellCaster, "init", [x, y, settings]);
    this.renderable.addAnimation("idle", [0]);
    this.renderable.setCurrentAnimation("idle");

    this.startX = 288;
    this.startY = 384;
    this.spellCost = PROTEGO_COST;
    me.game.world.addChild(new game.SpellCost(this.startX, this.startY, this.spellCost), Infinity);
  },

  dragEnd: function (e) {
    this._super(game.SpellCaster, "dragEnd", [e]);
    if (game.data.beans >= PROTEGO_COST) {
      // TODO: make sure there isn't already a spell tower here
      me.game.world.addChild(me.pool.pull("ProtegoDiabolicaSpell", this.castX, this.castY), Infinity);
      game.data.beans -= PROTEGO_COST;
    }
  }
});

game.PatronusCharmSpellCaster = game.SpellCaster.extend({
  init: function (x, y) {
    var settings = {
      height: 32,
      width: 32,
      image: "Patronus"
    }
    this._super(game.SpellCaster, "init", [x, y, settings]);
    this.renderable.addAnimation("idle", [34]);
    this.renderable.setCurrentAnimation("idle");

    this.startX = 384;
    this.startY = 384;
    this.spellCost = PATRONUS_COST;
    me.game.world.addChild(new game.SpellCost(this.startX, this.startY, this.spellCost), Infinity);
  },

  dragEnd: function (e) {
    this._super(game.SpellCaster, "dragEnd", [e]);
    if (game.data.beans >= PATRONUS_COST) {
      // TODO: make sure there isn't already a spell tower here
      me.game.world.addChild(me.pool.pull("PatronusCharmSpell", this.castX, this.castY), Infinity);
      game.data.beans -= PATRONUS_COST;
    }
  }
});
