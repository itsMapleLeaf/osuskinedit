export interface DrawableProps {
  x?: number
  y?: number

  width?: number
  height?: number
}

export default abstract class Drawable {
  canvas = document.createElement('canvas')
  context = this.canvas.getContext('2d')!

  x = 0
  y = 0

  width = 100
  height = 100

  constructor(options: DrawableProps = {}) {
    Object.assign(this, options)
  }

  render() {
    const { canvas, width, height } = this

    canvas.width = width
    canvas.height = height

    return this.canvas
  }
}
