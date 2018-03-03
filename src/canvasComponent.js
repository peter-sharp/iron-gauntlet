import html from 'choo/html'
import Nanocomponent from 'nanocomponent'

export function CanvasComponent () {
  if(!(this instanceof CanvasComponent)) return new CanvasComponent()
  Nanocomponent.call(this)
  this.ctx = null
}

CanvasComponent.prototype = Object.create(Nanocomponent.prototype)
CanvasComponent.prototype.constructor = Nanocomponent

CanvasComponent.prototype.createElement = function() {
  var canvas = html`<canvas></canvas>`
  this.ctx = canvas.getContext('2d')
  return canvas
}

CanvasComponent.prototype.update = function() {
  return html`<canvas></canvas>`
}
