Application.Model.extend({
  name: "square",
  defaults: {
    hasMine: false,
    pressed: false,
    mineDeactived: false
  }
});

// Instances of this model can be created by calling:
// new Application.Models["square"]()
