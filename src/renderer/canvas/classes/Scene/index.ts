import Layer from 'renderer/canvas/classes/Layer'

import { bind } from 'decko'

export default class Scene {
  currentContext: CanvasRenderingContext2D

  layers = [] as Layer[]

  isPrepared = false
  isAnimated = false

  addLayer(layer: Layer) {
    this.layers.push(layer)
  }

  setContext(context: CanvasRenderingContext2D) {
    this.currentContext = context
  }

  @bind
  render() {
    if (!this.currentContext) throw new Error('Scene requires a context to render')

    const { width, height } = this.currentContext.canvas
    this.currentContext.clearRect(0, 0, width, height)

    this.layers.forEach(layer => {
      const renderedCanvasLayer = layer.render()
      this.currentContext.drawImage(renderedCanvasLayer, 0, 0)
    })

    if (this.isAnimated) requestAnimationFrame(this.render)
  }
}
