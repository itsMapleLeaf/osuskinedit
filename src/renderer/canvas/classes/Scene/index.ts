import Drawable from 'renderer/canvas/classes/Drawable'

import { bind } from 'decko'

export interface SceneProps {
  width?: number | null
  height?: number | null
}

export default class Scene {
  drawables = [] as Drawable[]

  width = null
  height = null

  constructor(options: SceneProps = {}) {
    Object.assign(this, options)
  }

  addDrawable(drawable: Drawable) {
    this.drawables.push(drawable)
  }

  @bind
  render(currentContext: CanvasRenderingContext2D) {
    const { width, height } = this
    const { canvas } = currentContext

    const biggestWidth = Math.max(...this.drawables.map(d => d.width))
    const biggestHeight = Math.max(...this.drawables.map(d => d.height))

    const newWidth = width || biggestWidth
    const newHeight = height || biggestHeight

    canvas.width = newWidth
    canvas.height = newHeight

    currentContext.clearRect(0, 0, newWidth, newHeight)

    this.drawables.forEach(drawable => {
      const renderedCanvasLayer = drawable.render()

      const { x, y } = drawable.getPosition(newWidth, newHeight)

      currentContext.drawImage(renderedCanvasLayer, x, y)
    })
  }
}
