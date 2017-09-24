import Filter from 'renderer/canvas/classes/Filter'

export enum DrawableAlignment {
  topLeft,
  topCenter,
  topRight,
  centerLeft,
  center,
  centerRight,
  bottomLeft,
  bottomCenter,
  bottomRight
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

  x = 0
  y = 0

  width = 100
  height = 100

  align = DrawableAlignment.topLeft

  constructor(options: DrawableProps = {}) {
    Object.assign(this, options)
  }

  addFilter(filter: Filter) {
    this.filters.push(filter)
  }

  getPosition(boundingWidth: number, boundingHeight: number) {
    const { align, x, y, width, height } = this

    console.log('alignment', align)
    console.log('size', width, height)

    const centeredX = (
      (boundingWidth / 2 - width / 2) + x
    )

    const rightX = (
      (boundingWidth - width) + x
    )

    const centeredY = (
      (boundingHeight / 2 - height / 2) + y
    )

    const bottomY = (
      (boundingHeight - height) + y
    )

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

  filter() {
    this.filters.forEach(filter => filter.run(this.context))
  }

  draw() {
    const { canvas, width, height } = this

    canvas.width = width
    canvas.height = height
  }

  render() {
    const { width, height } = this.canvas

    this.context.globalCompositeOperation = 'source-over'
    this.context.clearRect(0, 0, width, height)
    //this.context.imageSmoothingEnabled = false

    this.draw()
    this.filter()

    return this.canvas
  }
}
