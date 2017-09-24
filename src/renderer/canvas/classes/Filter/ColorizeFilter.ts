import Filter from './index.js'

import Color from 'color'

interface ColorizeFilterProps {
  color: Color
}

export default class ColorizeFilter extends Filter {
  color: Color

  constructor(options: ColorizeFilterProps) {
    super()

    Object.assign(this, options)
  }

  run(context: CanvasRenderingContext2D) {
    const colorString = this.color.rgb().string()

    const { width, height } = context.canvas

    context.globalCompositeOperation = 'source-atop'
    context.fillStyle = colorString
    context.fillRect(0, 0, width, height)
  }
}
