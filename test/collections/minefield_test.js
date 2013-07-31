describe('Minefield', function(){
  var Minefield = new Application.Collections.minefield();
  it('use defaults if not initial data', function(){
    expect(Minefield.length).to.eql(80);
    expect(Minefield.where({'hasMine': true}).length).to.eql(10);
  });
  it('use initial data instead of defaults', function(){
    var NewMinefield = new Application.Collections.minefield(10,5,15);
    console.log(NewMinefield.length);
    expect(NewMinefield.length).to.eql(50);
    expect(NewMinefield.where({'hasMine': true}).length).to.eql(15);
  });
  describe('#getSize()', function(){
    it('respond with size of minefield', function(){
      expect(Minefield.getSize(5,3)).to.eql(15);
    });
  });
  describe('#addSquares', function(){
    it('Minefield squares must be equal size', function(){
      expect(Minefield.length).to.eql(Minefield.getSize(10,8));
    });
  });
  describe('#setMine', function(){
    it('should set mine', function(){
      Minefield.reset();
      var square = new Application.Models.square();
      Minefield.add(square);
      Minefield.setMine(square);
      expect(Minefield.where({'hasMine': true}).length).to.eql(1);
    });
  });
  describe('#addMines', function(){
    it('set mines in squares', function(){
      var mines = 10;
      Minefield.reset();
      Minefield.addSquares(20);
      Minefield.addMines(mines);
      expect(Minefield.where({'hasMine': true}).length).to.eql(mines);
    });
  });
  describe('#newGame', function(){
    it('should initialize new game with same attributes', function(){
      Minefield.newGame();
      expect(Minefield.length).to.eql(80);
    });
  });
});
