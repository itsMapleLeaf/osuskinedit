import { bind } from 'decko'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { CanvasRenderable } from 'renderer/canvas/types'
import { clearContext, drawCentered } from 'renderer/canvas/util/index'
import { randomBetween } from 'renderer/common/util/math'
import Skin from 'renderer/skin/models/Skin'
import { SkinStore } from 'renderer/skin/stores/SkinStore'
import './index.scss'

interface SkinLiveEditViewProps {
  skinStore?: SkinStore
}

@inject('skinStore')
@observer
export default class SkinLiveEditView extends React.Component<SkinLiveEditViewProps> {
  context: CanvasRenderingContext2D
  private preview: PreviewRenderer

  componentDidMount() {
    this.startAnimation()
  }

  render() {
    return (
      <div className="SkinLiveEditView">
        <div className="previewContainer">
          <canvas
            className="preview"
            width={1280}
            height={720}
            style={{ backgroundImage: `url(${this.backgroundImage})` }}
            ref={this.getCanvasRef}
          />
        </div>
        <div className="sidePanel">fsdklfjklsdfjkslfjsd;</div>
      </div>
    )
  }

  @computed
  private get backgroundImage() {
    const { skin } = this.props.skinStore!
    const background = skin.getImage('menu-background')
    if (background) {
      return background.rawImage.src
    }
    return ''
  }

  private startAnimation() {
    const { skin } = this.props.skinStore!
    this.preview = new PreviewRenderer(this.context, skin)
    this.preview.start()
  }

  @bind
  private getCanvasRef(el: HTMLCanvasElement) {
    this.context = el.getContext('2d')!
  }
}

class PreviewRenderer {
  private hitCircle: HitCircleRenderer
  private running = false

  constructor(private context: CanvasRenderingContext2D, skin: Skin) {
    const hitCircleImage = skin.getImage('hitcircle')
    const hitCircleOverlayImage = skin.getImage('hitcircleoverlay')
    const approachCircleImage = skin.getImage('approachcircle')

    this.hitCircle = new HitCircleRenderer(
      hitCircleImage.image,
      hitCircleOverlayImage.image,
      approachCircleImage.image,
    )
  }

  start() {
    this.running = true

    let time: number

    const runFrame = (frameTime: number) => {
      const elapsed = frameTime - (time || frameTime)
      time = frameTime

      clearContext(this.context)

      this.hitCircle.update(elapsed / 1000)
      this.hitCircle.render(this.context)

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

class HitCircleRenderer {
  private hitCircle: Colorizer
  private time = 0
  private approach = 1
  private approachTime = 1.5
  private position = { x: 0, y: 0 }

  constructor(
    hitCircleImage: CanvasRenderable,
    private overlay: CanvasRenderable,
    private approachCircle: CanvasRenderable,
  ) {
    this.hitCircle = new Colorizer(hitCircleImage)
    this.resetPosition()
  }

  update(dt: number) {
    this.time += dt

    if (this.approach <= 0) {
      this.approach = 1
      this.resetPosition()
    }

    this.approach -= dt / this.approachTime
  }

  render(context: CanvasRenderingContext2D) {
    const hue = (this.time * 50) % 360
    const color = `hsla(${hue}, 70%, 50%, 0.3)`
    const approachCircleScale = this.approach * 3 + 1

    context.save()

    context.translate(this.position.x, this.position.y)

    drawCentered(context, this.overlay)
    drawCentered(context, this.hitCircle.render(color))

    context.save()
    context.scale(approachCircleScale, approachCircleScale)
    context.globalAlpha = 1 - this.approach
    drawCentered(context, this.approachCircle)
    context.restore()

    context.restore()
  }

  private resetPosition() {
    this.position = {
      x: randomBetween(100, 1280 - 100),
      y: randomBetween(100, 720 - 100),
    }
  }
}

class Colorizer {
  private canvas = document.createElement('canvas')
  private context = this.canvas.getContext('2d')!

  constructor(private image: CanvasRenderable) {
    this.canvas.width = image.width
    this.canvas.height = image.height
  }

  render(color: string) {
    clearContext(this.context)

    this.context.drawImage(this.image, 0, 0)

    this.context.save()
    this.context.fillStyle = color
    this.context.globalCompositeOperation = 'source-atop'
    this.context.fillRect(0, 0, this.image.width, this.image.height)
    this.context.restore()

    return this.canvas
  }
}
