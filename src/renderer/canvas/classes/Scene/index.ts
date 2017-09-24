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
  render(context: CanvasRenderingContext2D) {
    const { width, height } = context.canvas

    context.clearRect(0, 0, width, height)

    this.drawables.forEach(drawable => {
      const { x, y } = drawable.getAlignedPosition()
      const renderedDrawable = drawable.render()

      context.save()

      context.translate(width / 2, height / 2)

      context.translate(x, y)
      drawable.applyTransforms(context)

      context.drawImage(renderedDrawable, 0, 0)

      context.restore()
    })
  }
}
