import { bind } from 'decko'

import { Scene } from 'renderer/canvas'
import { DrawableAnchor } from 'renderer/canvas/drawables'
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

    const hitCircle = new HitCircle({
      skin: skin,
      anchor: DrawableAnchor.center,
    })

    this.scene.addDrawable(hitCircle)
  }

  @bind
  tick() {
    this.scene.render(this.context)
  }

  start() {
    this.ticker.start()
  }

  stop() {
    this.ticker.stop()
  }
}
