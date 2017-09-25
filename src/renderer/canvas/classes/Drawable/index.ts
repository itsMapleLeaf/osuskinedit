import Filter from 'renderer/canvas/classes/Filter'
import Transform from 'renderer/canvas/classes/Transform'

export enum DrawableAnchor {
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

  anchor?: DrawableAnchor

  opacity?: number
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

  anchor = DrawableAnchor.center

  opacity = 1

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
    const { anchor, x, y } = this
    const { width, height } = this.canvas

    const centeredX = boundingWidth / 2 - width / 2 + x
    const rightX = boundingWidth - width + x
    const centeredY = boundingHeight / 2 - height / 2 + y
    const bottomY = boundingHeight - height + y

    if (anchor === DrawableAnchor.topLeft) return { x, y }
    if (anchor === DrawableAnchor.topCenter) return { x: centeredX, y }
    if (anchor === DrawableAnchor.topRight) return { x: rightX, y }

    if (anchor === DrawableAnchor.centerLeft) return { x, y: centeredY }
    if (anchor === DrawableAnchor.center) return { x: centeredX, y: centeredY }
    if (anchor === DrawableAnchor.centerRight) return { x: rightX, y: centeredY }

    if (anchor === DrawableAnchor.bottomLeft) return { x, y: bottomY }
    if (anchor === DrawableAnchor.bottomCenter) return { x: centeredX, y: bottomY }
    if (anchor === DrawableAnchor.bottomRight) return { x: rightX, y: bottomY }

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

    context.globalAlpha = this.opacity

    this.draw()
    this.filter()

    return this.canvas
  }
}
