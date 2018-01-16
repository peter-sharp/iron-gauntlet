import marker from '../prefabs/marker';
export function selectable(state) {
  state.selected = state.selected || false;

  const selector = marker();
  state.sprite.inputEnabled = true;

  state.sprite.events.onInputDown.add(function(){
    
    state.selected = !state.selected;
    
  });
  
  state.sprite.update = () => {
    
  };
  
  window.soldier = state;
  
  return {

    select: function () { state.selected = true},

    deselect: function() { state.selected = false}
  }
}
