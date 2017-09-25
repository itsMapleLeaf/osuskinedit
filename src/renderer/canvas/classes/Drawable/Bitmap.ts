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

    this.width = options.width || options.image.width
    this.height = options.height || options.image.height
  }

  draw() {
    this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
  }
}
