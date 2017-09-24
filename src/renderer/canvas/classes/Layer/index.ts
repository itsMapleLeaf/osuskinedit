import Drawable from 'renderer/canvas/classes/Drawable'

export default class Layer extends Drawable {
  drawables = [] as Drawable[]

  addDrawable(drawable: Drawable) {
    this.drawables.push(drawable)
  }

  renderDrawables() {
    this.drawables.forEach(drawable => {
      const { x, y } = drawable.getAlignedPosition()
      this.context.drawImage(drawable.render(), x, y)
    })
  }

  draw() {
    this.renderDrawables()
  }
}
