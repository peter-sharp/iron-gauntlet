export function selectable( state) {
  state.selected = state.selected || false;

  state.sprite.inputEnabled = true;

  state.sprite.events.onInputDown.add(function(){
    
    state.selected = !state.selected;
    debugger;
  });


  return {

    select: function () { state.selected = true},

    deselect: function() { state.selected = false}
  }
}
