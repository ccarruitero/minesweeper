Application.View.extend({
  name: "minefield",
  events: {
    'click li': 'reveal',
    'dblclick li': function(event){
      var square = $(event.target).model();
      if (square.get('mineActive') === true){
        square.set({'mineActive': false});
        console.log('mine deactivate');
      }
    },
    'click #new': 'newGame'
  },
  squares: new Application.Collections.minefield(), 
  template: 'minefield.handlebars',
  newGame: function(){
    this.squares.newGame();
    //$(this.el).delegate('li', 'click', this.reveal);
    //console.log(this.events); //({'click li', 'reveal'});
    this.on('click li', this.reveal);
    console.log('new game');
  },
  reveal: function(event){
    var square = $(event.target).model();
    square.set({ 'pressed': true});
    if (square.get('hasMine') === true) {
      this.revealMines();
      this.blockMinefield();
      console.log('game over');
    }
  },
  revealMines: function(){
    $('.mine').addClass('show');
  },
  blockMinefield: function(){
    $(this.el).undelegate('li', 'click');
    //this.off('click li');
    console.log('off click');
  }
});

var view = new Application.Views.minefield();
Application.setView(view);
