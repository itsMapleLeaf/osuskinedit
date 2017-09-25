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
    const { width, height } = currentContext.canvas
    currentContext.clearRect(0, 0, width, height)

    this.drawables.forEach(drawable => {
      const renderedCanvasLayer = drawable.render()

      const { x, y } = drawable.getPosition(width, height)

      currentContext.drawImage(renderedCanvasLayer, x, y)
    })
  }
}
