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

    Object.assign(this, options)
  }

  apply(context: CanvasRenderingContext2D, drawable: Drawable) {
    context.scale(this.scaleX, this.scaleY)
  }
}
