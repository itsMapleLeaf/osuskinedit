import { bind } from 'decko'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { CanvasRenderable } from 'renderer/canvas/types'
import { clearContext, sizeToContents } from 'renderer/canvas/util/index'
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
      return background.image.src
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
    const hitCircleImage = skin.getImage('hitcircle')!
    const overlayImage = skin.getImage('hitcircleoverlay')!

    this.hitCircle = new HitCircleRenderer(hitCircleImage.scaledImage, overlayImage.scaledImage)
  }

  start() {
    this.running = true

    const runFrame = (frameTime: number) => {
      clearContext(this.context)

      this.context.drawImage(this.hitCircle.render(frameTime), 0, 0)

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
  private canvas = document.createElement('canvas')
  private context = this.canvas.getContext('2d')!

  private hitCircleColorizer: Colorizer

  constructor(hitCircleImage: CanvasRenderable, private overlayImage: CanvasRenderable) {
    sizeToContents(this.canvas, [hitCircleImage, overlayImage])
    this.hitCircleColorizer = new Colorizer(hitCircleImage)
  }

  render(time: number) {
    clearContext(this.context)

    const hue = (time * 0.05) % 360
    const color = `hsla(${hue}, 70%, 50%, 0.3)`

    this.context.drawImage(this.hitCircleColorizer.render(color), 0, 0)
    this.context.drawImage(this.overlayImage, 0, 0)

    return this.canvas
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
