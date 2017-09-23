export default class Drawable {
  canvas = document.createElement('canvas')
  context = this.canvas.getContext('2d')!

  x = 0
  y = 0

  triggerRender = () => {}

  setRenderHook(render: () => any) {
    this.triggerRender = render
  }

  render() {
    return this.canvas
  }
}
