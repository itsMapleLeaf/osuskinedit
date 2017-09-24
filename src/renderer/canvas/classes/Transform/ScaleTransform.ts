import Drawable from 'renderer/canvas/classes/Drawable'
import Transform from './index'

export default class ScaleTransform extends Transform {
  constructor(public scale = 1) {
    super()
  }

  apply(context: CanvasRenderingContext2D, drawable: Drawable) {
    const { width, height } = drawable

    context.translate(width / 2, height / 2)
    context.scale(this.scale, this.scale)
    context.translate(-width / 2, -height / 2)
  }
}
