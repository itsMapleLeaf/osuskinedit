import Filter from './index.js'

import Color from 'color'

export default class ColorizeFilter extends Filter {
  constructor(public color: Color) {
    super()
  }

  run(context: CanvasRenderingContext2D) {
    const colorString = this.color.rgb().string()

    const { width, height } = context.canvas

    context.globalCompositeOperation = 'source-atop'
    context.fillStyle = colorString
    context.fillRect(0, 0, width, height)
  }
}
