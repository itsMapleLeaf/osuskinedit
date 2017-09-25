import { bind } from 'decko'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import StandardPreviewRenderer from 'renderer/skin/previews/StandardPreviewRenderer'
import { SkinStore } from 'renderer/skin/stores/SkinStore'

import './index.scss'

interface SkinLiveEditViewProps {
  skinStore?: SkinStore
}

@inject('skinStore')
@observer
export default class SkinLiveEditView extends React.Component<SkinLiveEditViewProps> {
  canvasContext: CanvasRenderingContext2D
  private preview: StandardPreviewRenderer

  componentDidMount() {
    this.startAnimation()
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
    this.preview = new StandardPreviewRenderer(this.canvasContext, this.skin)
    this.preview.start()
  }

  @bind
  private getCanvasRef(el: HTMLCanvasElement | null) {
    if (el) this.canvasContext = el.getContext('2d')!
  }
}
