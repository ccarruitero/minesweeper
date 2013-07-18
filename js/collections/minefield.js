Application.Collection.extend({
  name: "minefield",
  model: Application.Models["square"],
  addSquares: function(){
    var that = this;
    var x = 10;
    var y = 5;
    var size = this.getSize(x, y);
    for (var i=0; i<size; i++){
        var square = new Application.Models["square"];
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
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  addMines: function(){
    var mines = 10;
    var that = this;
    var min = 1;
    var max = this.length;
    for (var i=0; i<mines; i++){
        var square = that.get('c' + this.getRandom(min, max));
        if(!square.get('hasMine')){
            square.set({'hasMine': true});
        }
    }
  }
});

// Instances of this collection can be created by calling:
new Application.Collections["minefield"]()
