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
    const { x, y } = drawable.getAlignOffset()

    context.translate(x, y)
    context.scale(this.scaleX, this.scaleY)
    context.translate(-x, -y)
  }
}
