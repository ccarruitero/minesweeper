Application.View.extend({
  name: "minefield",
  events: {
    'click li': 'reveal',
    'dblclick li': 'flag',
    'click #new': 'newGame',
    'touchStart li': 'reveal'
  },
  lastClick: false,
  colors: ["#000000", "#3333cc", "#006600", "#cc0000", "#660066", "#006666",
           "#000000", "#000000", "#000000"],
  squares: new Application.Collections.minefield(), 
  template: 'minefield.handlebars',
  newGame: function(){
    this.squares.newGame();
    this.on('click li', this.reveal);
  },
  randomColor: function(){
    var random = _.random(0, this.colors.length);
    return this.colors[random]
  },
  reveal: function(event){
    event.preventDefault();
    var that = this;
    var alreadyClickedTimeout;
    var elem = $(event.currentTarget);
    var square = elem.model();
    var neighborsMines = that.squares.neighborsHasMine(square);
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
        } else if( neighborsMines > 0){
          elem.children().append(document.createTextNode(neighborsMines));
          elem.children().css('color', that.randomColor());
          elem.addClass('neighbord');
          console.log('exists ' + neighborsMines + ' mine(s) around');
          //$('p').append(document.createTextNode(neighborsMines));
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
  countActiveMines: function(){
    var minesActive =this.where({'mineDeactivated': false}).length;
  },
  deactivateMine: function(square){
    square.set({'mineDeactived': true});
    console.log('mine deactivated');
  },
  flag: function(event){
    event.preventDefault();
    var elem = $(event.currentTarget);
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
