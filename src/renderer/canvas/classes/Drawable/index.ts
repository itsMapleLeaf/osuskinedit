import Filter from 'renderer/canvas/classes/Filter'
import Transform from 'renderer/canvas/classes/Transform'

// export enum DrawableAlignment {
//   topLeft,
//   topCenter,
//   topRight,
//   centerLeft,
//   center,
//   centerRight,
//   bottomLeft,
//   bottomCenter,
//   bottomRight,
// }

export interface DrawableProps {
  x?: number
  y?: number

  width?: number
  height?: number
  align?: [number, number]
}

export default abstract class Drawable {
  canvas = document.createElement('canvas')
  context = this.canvas.getContext('2d')!

  filters = [] as Filter[]
  transforms = [] as Transform[]

  x = 0
  y = 0

  width = 100
  height = 100

  align = [0, 0]

  constructor(options: DrawableProps = {}) {
    Object.assign(this, options)
  }

  addFilter(filter: Filter) {
    this.filters.push(filter)
  }

  addTransform(tf: Transform) {
    this.transforms.push(tf)
  }

  getAlignOffset() {
    return {
      x: this.width * this.align[0],
      y: this.height * this.align[1],
    }
  }

  getAlignedPosition() {
    const { x, y } = this.getAlignOffset()
    return { x: this.x - x, y: this.y - y }
  }

  abstract draw(): void

  applyTransforms(context: CanvasRenderingContext2D) {
    this.transforms.forEach(transform => transform.apply(context, this))
  }

  filter() {
    this.filters.forEach(filter => filter.run(this.context))
  }

  render() {
    const { canvas, context, width, height } = this

    canvas.width = width
    canvas.height = height

    context.save()

    context.clearRect(0, 0, width, height)

    this.draw()
    this.filter()

    context.restore()

    return this.canvas
  }
}
