Application.Model.extend({
  name: "square",
  defaults: {
    hasMine: false,
    pressed: false,
    mineActivate: false
  },
  deactivateMine: function(){
    this.set({'mineActive': false});
  } 
});

// Instances of this model can be created by calling:
// new Application.Models["square"]()
