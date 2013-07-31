Application.Collection.extend({
  name: "minefield",
  model: Application.Models.square,
  defaults: {
    x : 10,
    y : 8,
    mines: 10
  },
  addSquares: function(size){
    var that = this;
    for (var i=0; i<size; i++){
        var square = new Application.Models.square();
        that.add(square);
    }
  },
  getSize: function(x, y){ 
    return x * y;
  },
  initialize: function(x, y, mines){
    if (x){
      this.defaults.x = x;
    }
    if (y) {
      this.defaults.y = y;
    }
    if (mines){
      this.defaults.mines = mines;
    }
    this.addSquares(this.getSize(this.defaults.x, this.defaults.y));
    this.addMines(this.defaults.mines);
  },
  getRandom: function(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  addMines: function(mines){
    var that = this;
    for (var i=0; i<mines; i++){
      var squares = that.where({'hasMine': false});
      var random = that.getRandom(0, (squares.length -1));
      var square = squares[random];
      that.setMine(square);
    }
  },
  setMine: function(square){
    square.set({'hasMine': true});
    square.set({'mineActive': true});
  },
  newGame: function(){
    this.reset();
    this.initialize(this.defaults.x, this.defaults.y, this.defaults.mines);
  },
  neightbords: function(){
  },
  gameOver: function(){
  }
});

// Instances of this collection can be created by calling:
// new Application.Collections.minefield();
