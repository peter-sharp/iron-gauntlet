import html from 'choo/html'
import Nanocomponent from 'nanocomponent'

export function CanvasComponent () {
  if(!(this instanceof CanvasComponent)) return new CanvasComponent()
  Nanocomponent.call(this)
  this.canvas = null
  this.ctx = null
}

CanvasComponent.prototype = Object.create(Nanocomponent.prototype)
CanvasComponent.prototype.constructor = Nanocomponent

CanvasComponent.prototype.createElement = function(renderCb) {
  this.renderCb = renderCb;
  this.canvas = html`<canvas class="fit-image"></canvas>`
  this.ctx = this.canvas.getContext('2d')
  this.renderCb(this.ctx, this.canvas)
  return this.canvas
}

CanvasComponent.prototype.update = function(renderCb) {
  if(this.renderCb !== renderCb) this.renderCb = renderCb
  this.renderCb(this.ctx, this.canvas)
  return false;
}
