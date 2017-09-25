import Filter from 'renderer/canvas/classes/Filter'
import Transform from 'renderer/canvas/classes/Transform'

const debugMode = false

export interface DrawableProps {
  x?: number
  y?: number

  width?: number
  height?: number

  anchor?: [number, number]
  align?: [number, number]

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

  anchor: [number, number] = [0.5, 0.5]
  align: [number, number] = [0.5, 0.5]

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

  getAnchorOffset(): [number, number] {
    const [ax, ay] = this.anchor

    const anchoredX = this.width * ax
    const anchoredY = this.height * ay

    return [anchoredX, anchoredY]
  }

  getAlignmentOffset(contextWidth: number, contextHeight: number): [number, number] {
    const [ax, ay] = this.align

    const alignedX = contextWidth * ax
    const alignedY = contextHeight * ay

    return [alignedX, alignedY]
  }

  abstract draw(): void

  applyTransform(context: CanvasRenderingContext2D) {
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
    context.globalAlpha = this.opacity

    this.draw()
    this.filter()

    context.restore()

    return this.canvas
  }

  renderToContext(context: CanvasRenderingContext2D) {
    const { width, height } = context.canvas

    const rendered = this.render()
    const [alignX, alignY] = this.getAlignmentOffset(width, height)
    const [anchorX, anchorY] = this.getAnchorOffset()

    context.save()

    context.translate(alignX, alignY)
    this.applyTransform(context)
    context.translate(-anchorX, -anchorY)

    context.drawImage(rendered, 0, 0)

    if (debugMode) {
      context.strokeStyle = 'white'
      context.lineWidth = 2
      context.strokeRect(0, 0, rendered.width, rendered.height)
    }

    context.restore()
  }
}
