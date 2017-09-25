import Drawable from 'renderer/canvas/classes/Drawable'

export default class Layer extends Drawable {
  drawables = [] as Drawable[]

  addDrawable(drawable: Drawable) {
    this.drawables.push(drawable)
  }

  renderDrawables() {
    this.drawables.forEach(drawable => {
      const { width, height } = this

      const renderedCanvasLayer = drawable.render()

      const { x, y } = drawable.getPosition(width, height)

      this.context.drawImage(renderedCanvasLayer, x, y)
    })
  }

  draw() {
    this.renderDrawables()
  }
}
