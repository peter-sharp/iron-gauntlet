//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Graphics.html
export function marker(game, x, y, tileSize, displayStates) {
    displayStates = displayStates || {};

    var displayStateDefault = displayStates.default || {
      color: 0x000000,
      opacity: 0.2
    };

    state.graphic = game.add.graphics();
    state.tileSize = tileSize;
    state.color =  displayStateDefault.color;
    state.opacity = displayStateDefault.opacity;
    state.displayStates = displayStates;


    /**
     * updates the marker's color and opacity state from
     * the displayState with the given name
     * @param  {string} state [description]
     */
    function updateStateFromDisplayState(state) {
      var selectedState = displayStates[state];
      state.color = selectedState.color;
      state.opacity = selectedState.opacity;
    }

    return {
      /**
       * renders the marker's color and opacity state from
       * the displayState with the given name
       * @param  {string} state [description]
       */
      render: function(displayState) {
        updateStateFromDisplayState(displayState);
        state.graphic.clear();
        state.graphic.lineStyle(2, state.color, state.opacity);
        state.graphic.drawRect(0, 0, state.tileSize, state.tileSize);
      },


      updatePosition: function(pos){

        state.graphic.x = pos.x
        state.graphic.y = pos.y
      },


      renderNoGo() {
        this.opacity = 1;
        this.color = 0xff0000;
        this.render();
      }

      renderGo() {
        this.opacity = 0.2;
        this.color = 0x000000;
        this.render();
      }
  }
}

export default marker;
