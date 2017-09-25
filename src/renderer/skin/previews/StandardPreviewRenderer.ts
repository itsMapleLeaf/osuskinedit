import { Scene } from 'renderer/canvas'
import Drawable from 'renderer/canvas/classes/Drawable'
import { DrawableAnchor } from 'renderer/canvas/drawables'
import HitCircle from 'renderer/skin/drawables/HitCircle'
import Skin from 'renderer/skin/models/Skin'

export default class StandardPreviewRenderer {
  running = false
  hitCircle: Drawable
  scene: Scene

  constructor(private context: CanvasRenderingContext2D, skin: Skin) {
    const { width, height } = context.canvas

    this.scene = new Scene({
      width,
      height,
    })

    const hitCircle = new HitCircle({
      skin: skin,
      anchor: DrawableAnchor.center,
    })

    this.scene.addDrawable(hitCircle)
  }

  start() {
    this.running = true

    let time: number

    const runFrame = (frameTime: number) => {
      // const elapsed = frameTime - (time || frameTime)
      time = frameTime

      this.scene.render(this.context)

      if (this.running) {
        requestAnimationFrame(runFrame)
      }
    }

    requestAnimationFrame(runFrame)
  }

  stop() {
    this.running = false
  }
}
