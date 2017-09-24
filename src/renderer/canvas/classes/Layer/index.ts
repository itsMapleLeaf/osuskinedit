import Drawable from 'renderer/canvas/classes/Drawable'
import Filter from 'renderer/canvas/classes/Filter'

export default class Layer extends Drawable {
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
    const canvas = super.render()

    const { width, height } = canvas

    this.context.globalCompositeOperation = 'source-over'
    this.context.clearRect(0, 0, width, height)

    this.renderDrawables()
    this.runFilters()

    return this.canvas
  }
}
