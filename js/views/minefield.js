Application.View.extend({
  name: "minefieldbody",
  squares: new Application.Collections.minefield(), 
  //child: new Application.View.square(),
  //template: Handlebars.compile('{{ view }} child')
  //greetings: '.. hello?',
  template: 'minefield.handlebars'
});

var view = new Application.Views.minefieldbody();
Application.setView(view);
