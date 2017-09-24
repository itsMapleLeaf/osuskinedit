
import { bind } from 'decko'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Scene } from 'renderer/canvas'
import Drawable from 'renderer/canvas/classes/Drawable'

import { DrawableAlignment } from 'renderer/canvas/drawables'
import HitCircle from 'renderer/skin/drawables/HitCircle'

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
    console.log('hi')
    this.startAnimation()
    console.log('bye')
  }

  componentWillUnmount() {
    if (this.preview) this.preview.stop()
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

  constructor(context: CanvasRenderingContext2D, skin: Skin) {
    const { width, height } = context.canvas

    this.scene = new Scene({
      width,
      height,
    })

    const hitCircle = new HitCircle({
      skin: skin,
      align: DrawableAlignment.center,
    })

    /**const colorizer = new ColorizeFilter()
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

    approachCircle.addTransform(approachScale)**/

    this.scene.addDrawable(hitCircle)
    this.scene.setContext(context)
  }

  start() {
    this.running = true

    let time: number

    const runFrame = (frameTime: number) => {
      // const elapsed = frameTime - (time || frameTime)
      time = frameTime

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
