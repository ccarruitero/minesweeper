describe('Minefield', function(){
  var Minefield = new Application.Collections.minefield();
  describe('#getSize()', function(){
    it('respond with size of minefield', function(){
      expect(Minefield.getSize(5,3)).to.eql(15);
    });
  });
  describe('#addSquares', function(){
    it('squares number must be equal size', function(){
      var size = Minefield.getSize(10, 5);
      Minefield.addSquares(size);
      expect(Minefield.length).to.eql(50);
    });
  });
  describe('#setMine', function(){
    it('should set mine', function(){
      var otherMinefield = new Application.Collections.minefield();
      var square = new Application.Models.square();
      otherMinefield.add(square);
      otherMinefield.setMine(square);
      expect(otherMinefield.where({'hasMine': true}).length).to.eql(1);
    });
  });
  describe('#addMines', function(){
    it('set mines in squares', function(){
      var mines = 10;
      Minefield.addSquares(20);
      Minefield.addMines(mines);
      expect(Minefield.where({'hasMine': true}).length).to.eql(mines);
    });
  });
});
