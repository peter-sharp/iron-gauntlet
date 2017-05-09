export function selectable(state) {
  state.selected = state.selected || false;
  return {

    select: function () {},

    deselect: function() {}
  }
}
