import Color from 'color'
import { bind } from 'decko'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Scene } from 'renderer/canvas'
import Drawable from 'renderer/canvas/classes/Drawable'
import { Bitmap } from 'renderer/canvas/drawables'
import { ColorizeFilter } from 'renderer/canvas/filters'
import Skin from 'renderer/skin/models/Skin'
import { SkinStore } from 'renderer/skin/stores/SkinStore'
import './index.scss'

interface SkinLiveEditViewProps {
  skinStore?: SkinStore
}

@inject('skinStore')
@observer
export default class SkinLiveEditView extends React.Component<SkinLiveEditViewProps> {
  canvasContext: CanvasRenderingContext2D
  private preview: PreviewRenderer

  componentDidMount() {
    this.startAnimation()
  }

  componentWillUnmount() {
    this.preview.stop()
  }

  render() {
    return (
      <div className="SkinLiveEditView">
        <div className="previewContainer">
          <canvas className="preview" width={1280} height={720} ref={this.getCanvasRef} />
        </div>
        <div className="sidePanel">fsdklfjklsdfjkslfjsd;</div>
      </div>
    )
  }

  @computed
  private get skin() {
    return this.props.skinStore!.skin
  }

  private startAnimation() {
    this.preview = new PreviewRenderer(this.canvasContext, this.skin)
    // this.preview.start()
  }

  @bind
  private getCanvasRef(el: HTMLCanvasElement | null) {
    if (el) this.canvasContext = el.getContext('2d')!
  }
}

class PreviewRenderer {
  running = false
  hitCircle: Drawable
  scene = new Scene()

  constructor(context: CanvasRenderingContext2D, skin: Skin) {
    const colorizer = new ColorizeFilter()
    colorizer.color = Color('hsla(170, 70%, 50%, 0.3)')

    const hitCircle = new Bitmap({ image: skin.getImage('hitcircle').image })
    hitCircle.addFilter(colorizer)

    const hitCircleOverlay = new Bitmap({ image: skin.getImage('hitcircleoverlay').image })
    // hitCircleOverlay.addFilter(colorizer)

    const approachCircle = new Bitmap({ image: skin.getImage('approachcircle').image })
    approachCircle.addFilter(colorizer)

    this.scene.addDrawable(hitCircle)
    this.scene.addDrawable(hitCircleOverlay)
    this.scene.addDrawable(approachCircle)
    this.scene.setContext(context)
    this.scene.render()
  }

  start() {
    this.running = true

    let time: number

    const runFrame = (frameTime: number) => {
      // const elapsed = frameTime - (time || frameTime)
      time = frameTime

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
