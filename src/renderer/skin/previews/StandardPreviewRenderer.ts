import { bind } from 'decko'

import { Scene } from 'renderer/canvas'
import Ticker from 'renderer/common/classes/Ticker'
import HitCircle from 'renderer/skin/drawables/HitCircle'
import Skin from 'renderer/skin/models/Skin'

export default class StandardPreviewRenderer {
  running = false
  hitCircle: HitCircle
  scene: Scene
  ticker = new Ticker(this.tick)

  constructor(private context: CanvasRenderingContext2D, skin: Skin) {
    const { width, height } = context.canvas

    this.scene = new Scene({
      width,
      height,
    })

    this.hitCircle = new HitCircle({
      skin: skin,
    })

    this.scene.addDrawable(this.hitCircle)
  }

  @bind
  tick(dt: number) {
    this.hitCircle.update(dt)
    this.scene.render(this.context)
  }

  start() {
    this.ticker.start()
  }

  stop() {
    this.ticker.stop()
  }
}
