Application.Collection.extend({
  name: "minefield",
  model: Application.Models.square,
  defaults: {
    x : 10,
    y : 5
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
  initialize: function(){
    this.addSquares();
    this.addMines();
  },
  getRandom: function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  addMines: function(mines){
    var that = this;
    var min = 1;
    var max = this.length;
    for (var i=0; i<mines; i++){
      var squares = that.where({'hasMine': false});
      var square = squares[that.getRandom(min, max)];
      that.setMine(square);
    }
  },
  setMine: function(square){
    square.set({'hasMine': true});
  }
});

// Instances of this collection can be created by calling:
new Application.Collections.minefield();
