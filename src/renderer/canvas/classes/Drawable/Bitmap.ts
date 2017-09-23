import { bind } from 'decko'

import Drawable from './index'

export default class Bitmap extends Drawable {
  image = new Image()

  width = 0
  height = 0

  constructor(src: string) {
    super()

    this.image.src = src
    this.image.onload = this.handleLoad
  }

  @bind
  handleLoad() {
    const { width, height } = this.image

    this.canvas.width = width
    this.canvas.height = height

    this.context.drawImage(this.image, 0, 0)

    console.log(this.triggerRender)

    this.triggerRender()
  }
}
