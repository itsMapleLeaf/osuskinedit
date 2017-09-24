import Drawable from 'renderer/canvas/classes/Drawable'

import { bind } from 'decko'

export interface SceneProps {
  width?: number | null
  height?: number | null
}

export default class Scene {
  currentContext: CanvasRenderingContext2D
  drawables = [] as Drawable[]

  width = null
  height = null

  constructor(options: SceneProps = {}) {
    Object.assign(this, options)
  }

  addDrawable(drawable: Drawable) {
    this.drawables.push(drawable)
  }

  setContext(context: CanvasRenderingContext2D) {
    this.currentContext = context
  }

  @bind
  render() {
    if (!this.currentContext) throw new Error('Scene requires a context to render')

    const { width, height, currentContext } = this
    const { canvas } = currentContext

    const biggestWidth = Math.max(...this.drawables.map(d => d.width))
    const biggestHeight = Math.max(...this.drawables.map(d => d.height))

    const newWidth = width || biggestWidth
    const newHeight = height || biggestHeight

    canvas.width = newWidth
    canvas.height = newHeight

    currentContext.clearRect(0, 0, newWidth, newHeight)

    this.drawables.forEach(drawable => {
      const { x, y } = drawable.getPosition(newWidth, newHeight)

      const renderedCanvasLayer = drawable.render()

      currentContext.save()

      currentContext.translate(x, y)
      drawable.applyTransforms(currentContext)

      currentContext.drawImage(renderedCanvasLayer, 0, 0)

      currentContext.restore()
    })
  }
}
