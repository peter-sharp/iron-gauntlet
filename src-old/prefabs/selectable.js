export function selectable(state) {
  state.selected = state.selected || false;

  state.sprite.inputEnabled = true;

  state.events.onInputDown.add(function(){
    state.selected = !state.selected;
    console.log(state);
  })

  return {

    select: function () { state.selected = true},

    deselect: function() { state.selected = false}
  }
}
