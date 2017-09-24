import { CanvasRenderable } from 'renderer/canvas/types'
import Drawable from './index'
import { DrawableProps } from './index'

export interface BitmapProps extends DrawableProps {
  image: CanvasRenderable
}

export default class Bitmap extends Drawable {
  image: CanvasRenderable

  constructor(options: BitmapProps) {
    super(options)

    const { width, height } = options.image

    Object.assign(this, { width, height }, options)
  }

  draw() {
    const { context, width, height } = this
    context.drawImage(this.image, 0, 0, width, height)
  }
}
