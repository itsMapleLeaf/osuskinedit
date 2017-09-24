import Filter from 'renderer/canvas/classes/Filter'
import Transform from 'renderer/canvas/classes/Transform'

export enum DrawableAlignment {
  topLeft,
  topCenter,
  topRight,
  centerLeft,
  center,
  centerRight,
  bottomLeft,
  bottomCenter,
  bottomRight,
}

export interface DrawableProps {
  x?: number
  y?: number

  width?: number
  height?: number
  align?: DrawableAlignment
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

  align = DrawableAlignment.center

  constructor(options: DrawableProps = {}) {
    Object.assign(this, options)
  }

  addFilter(filter: Filter) {
    this.filters.push(filter)
  }

  addTransform(tf: Transform) {
    this.transforms.push(tf)
  }

  getPosition(boundingWidth: number, boundingHeight: number) {
    const { align, x, y } = this
    const { width, height } = this.canvas

    const centeredX = boundingWidth / 2 - width / 2 + x
    const rightX = boundingWidth - width + x
    const centeredY = boundingHeight / 2 - height / 2 + y
    const bottomY = boundingHeight - height + y

    if (align === DrawableAlignment.topLeft) return { x, y }
    if (align === DrawableAlignment.topCenter) return { x: centeredX, y }
    if (align === DrawableAlignment.topRight) return { x: rightX, y }

    if (align === DrawableAlignment.centerLeft) return { x, y: centeredY }
    if (align === DrawableAlignment.center) return { x: centeredX, y: centeredY }
    if (align === DrawableAlignment.centerRight) return { x: rightX, y: centeredY }

    if (align === DrawableAlignment.bottomLeft) return { x, y: bottomY }
    if (align === DrawableAlignment.bottomCenter) return { x: centeredX, y: bottomY }
    if (align === DrawableAlignment.bottomRight) return { x: rightX, y: bottomY }

    return { x, y }
  }

  abstract draw(): void

  transform() {
    this.transforms.forEach(transform => transform.apply(this.context, this))
  }

  filter() {
    this.filters.forEach(filter => filter.run(this.context))
  }

  render() {
    const { canvas, context, width, height } = this

    context.globalCompositeOperation = 'source-over'
    context.scale(0, 0)

    canvas.width = width
    canvas.height = height

    context.clearRect(0, 0, width, height)

    this.transform()
    this.draw()
    this.filter()

    return this.canvas
  }
}
