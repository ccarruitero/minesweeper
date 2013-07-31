Application.View.extend({
  name: "minefield",
  events: {
    'click li': 'reveal',
    'dblclick li': 'flag',
    'click #new': 'newGame'
  },
  lastClick: false,
  squares: new Application.Collections.minefield(), 
  template: 'minefield.handlebars',
  newGame: function(){
    this.squares.newGame();
    this.on('click li', this.reveal);
  },
  reveal: function(event){
    var that = this;
    var alreadyClickedTimeout;
    var square = $(event.target).model();
    if (this.lastClick === true){
      this.lastClick = false;
      clearTimeout(alreadyClickedTimeout);
      console.log('dblclick');
      this.flag(event);
    } else {
      this.lastClick = true;
      alreadyClickedTimeout = setTimeout(function(){
        that.lastClick = false;
        square.set({ 'pressed': true});
        if (square.get('hasMine') === true) {
          if (square.get('mineDeactived') === false){
            that.revealMines();
            that.blockMinefield();
            console.log('single click');
          }
        }
      }, 200);
    }
  },
  revealMines: function(){
    $('.mine').addClass('show');
  },
  blockMinefield: function(){
    $(this.el).undelegate('li', 'click');
  },
  countMines: function(){
    var minesActive =this.where({'mineDeactivated': false}).length;
  },
  deactivateMine: function(square){
    square.set({'mineDeactived': true});
    console.log('mine deactivated');
  },
  flag: function(event){
    var elem = $(event.target)
    var square = elem.model();
    if (square.get('hasMine') === true){
      this.deactivateMine(square);
      elem.removeClass('pressed-mine pressed');
      elem.children().addClass('show');
      elem.undelegate('li', 'click');
    } else {
      console.log('no mines here');
    }
  }
});

var view = new Application.Views.minefield();
Application.setView(view);
