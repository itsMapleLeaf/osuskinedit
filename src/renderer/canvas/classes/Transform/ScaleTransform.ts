import Drawable from 'renderer/canvas/classes/Drawable'
import Transform, { TransformProps } from './index'

export interface ScaleTransformProps extends TransformProps {
  scaleX?: number
  scaleY?: number
}

export default class ScaleTransform extends Transform {
  scaleX = 1
  scaleY = 1

  constructor(options: TransformProps = {}) {
    super(options)
  }

  apply(context: CanvasRenderingContext2D, drawable: Drawable) {
    const { width, height } = drawable

    const newWidth = width * this.scaleX
    const newHeight = height * this.scaleY

    drawable.canvas.width = newWidth
    drawable.canvas.height = newHeight

    context.scale(this.scaleX, this.scaleY)
  }
}
