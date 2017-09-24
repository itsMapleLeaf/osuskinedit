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

    console.log(this)
  }

  render() {
    const canvas = super.render()

    const { context } = this

    context.drawImage(this.image, 0, 0)

    return canvas
  }
}
