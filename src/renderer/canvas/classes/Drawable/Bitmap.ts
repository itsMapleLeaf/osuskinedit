import Drawable from './index'
import { DrawableProps } from './index'

export interface BitmapProps extends DrawableProps {
  image: HTMLImageElement
}

export default class Bitmap extends Drawable {
  image: HTMLImageElement

  constructor(options: BitmapProps) {
    super(options)

    const image = options.image

    Object.assign(this, {
      width: image.width,
      height: image.height,
    }, options)
  }

  draw() {
    const { context, width, height } = this

    context.drawImage(this.image, 0, 0, width, height)
  }
}
