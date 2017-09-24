import Color from 'color'
import { bind } from 'decko'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Scene } from 'renderer/canvas'
import Drawable from 'renderer/canvas/classes/Drawable'
import { Bitmap, DrawableAlignment } from 'renderer/canvas/drawables'
import { ColorizeFilter } from 'renderer/canvas/filters'
import Skin from 'renderer/skin/models/Skin'
import { SkinStore } from 'renderer/skin/stores/SkinStore'
import ScaleTransform from '../../../canvas/classes/Transform/ScaleTransform'
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
    this.preview.start()
  }

  @bind
  private getCanvasRef(el: HTMLCanvasElement | null) {
    if (el) this.canvasContext = el.getContext('2d')!
  }
}

class PreviewRenderer {
  running = false
  hitCircle: Drawable
  scene: Scene
  approachScale: ScaleTransform

  constructor(context: CanvasRenderingContext2D, skin: Skin) {
    const { width, height } = context.canvas

    this.scene = new Scene({
      width,
      height,
    })

    const colorizer = new ColorizeFilter()
    colorizer.color = Color('hsla(170, 70%, 50%, 0.7)')

    const hitCircle = new Bitmap({ image: skin.getImage('hitcircle').image })
    hitCircle.addFilter(colorizer)

    const hitCircleOverlay = new Bitmap({ image: skin.getImage('hitcircleoverlay').image })
    // hitCircleOverlay.addFilter(colorizer)

    const approachCircle = new Bitmap({
      image: skin.getImage('approachcircle').image,
      align: DrawableAlignment.center,
    })
    approachCircle.addFilter(colorizer)

    const approachScale = this.approachScale = new ScaleTransform({
      scaleX: 3,
      scaleY: 3
    })

    approachCircle.addTransform(approachScale)

    this.scene.addDrawable(hitCircle)
    this.scene.addDrawable(hitCircleOverlay)
    this.scene.addDrawable(approachCircle)
    this.scene.setContext(context)
  }

  start() {
    this.running = true

    let time: number

    const runFrame = (frameTime: number) => {
      // const elapsed = frameTime - (time || frameTime)
      time = frameTime

      const { approachScale } = this

      if (this.approachScale.scaleX > 1) {
        const newScale = approachScale.scaleX - 0.03

        this.approachScale.scaleX = newScale
        this.approachScale.scaleY = newScale
      } else {
        this.approachScale.scaleX = 3
        this.approachScale.scaleY = 3
      }

      this.scene.render()

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
