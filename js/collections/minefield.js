Application.Collection.extend({
  name: "minefield",
  model: Application.Models.square,
  defaults: {
    x : 10,
    y : 8,
    mines: 10
  },
  addSquares: function(x ,y){
    var that = this;
    
    for (var i=0; i<x; i++){
      for (var j=0; j< y; j++){
        var square = new Application.Models.square();
        square.set({'positionX': i, 'positionY': j});
        that.add(square);
      }
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
    this.addSquares(this.defaults.x, this.defaults.y);
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
  neighborsHasMine: function(square){
    var that = this;
    var posX = square.get('positionX');
    var posY = square.get('positionY');
    var nearMines = 0;
    var coordinates = [[0,-1], [0,1],[-1, 0], [1,0], [-1,-1],
                       [1,1], [-1 ,1], [1,-1]];
    $.map(coordinates, function(coordinate){
      var positionX = coordinate[0] + posX;
      var positionY = coordinate[1] + posY;
      var neighborSquare = that.where({'positionX': positionX,
                                       'positionY': positionY});
      if ((neighborSquare.length != 0) &&
         (neighborSquare[0].get('hasMine') === true)){
        nearMines += 1
      }
    });
    return nearMines
  },
  gameOver: function(){
  }
});

// Instances of this collection can be created by calling:
// new Application.Collections.minefield();
