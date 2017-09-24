import Drawable from 'renderer/canvas/classes/Drawable'
import Filter from 'renderer/canvas/classes/Filter'

export default class Layer {
  canvas = document.createElement('canvas')
  context = this.canvas.getContext('2d')!

  drawables = [] as Drawable[]
  filters = [] as Filter[]

  addDrawable(drawable: Drawable) {
    this.drawables.push(drawable)
  }

  addFilter(filter: Filter) {
    this.filters.push(filter)
  }

  renderDrawables() {
    this.drawables.forEach(drawable => {
      const { x, y } = drawable

      this.context.drawImage(drawable.render(), x, y)
    })
  }

  runFilters() {
    this.filters.forEach(filter => filter.run(this.context))
  }

  render() {
    const { width, height } = this.canvas

    this.context.globalCompositeOperation = 'source-over'
    this.context.clearRect(0, 0, width, height)

    this.renderDrawables()
    this.runFilters()

    return this.canvas
  }
}
