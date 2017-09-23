import Layer from 'renderer/canvas/classes/Layer'

export default class Scene {
  currentContext: CanvasRenderingContext2D

  layers = [] as Layer[]

  isPrepared = false

  prepare() {
    if (this.isPrepared) throw new Error('Scene can only be prepared once')

    this.layers.forEach(layer => layer.setRenderHook(this.render))

    this.isPrepared = true
  }

  assignLayers(layers: Layer[]) {
    if (this.isPrepared) throw new Error('Layers cannot be assigned to an already prepared Scene')

    this.layers = layers
  }

  setContext(context: CanvasRenderingContext2D) {
    this.currentContext = context
  }

  render() {
    if (!this.currentContext) throw new Error('Scene requires a context to render')
    if (!this.isPrepared) throw new Error('Scene must be prepared before rendering')

    const { width, height } = this.currentContext.canvas
    this.currentContext.clearRect(0, 0, width, height)

    this.layers.forEach(layer => {
      const renderedCanvasLayer = layer.render()
      this.currentContext.drawImage(renderedCanvasLayer, 0, 0)
    })
  }
}
