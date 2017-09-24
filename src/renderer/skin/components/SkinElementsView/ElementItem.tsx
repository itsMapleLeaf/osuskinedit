import { bind } from 'decko'
import { observer } from 'mobx-react'
import * as React from 'react'

import SkinElement from 'renderer/skin/models/SkinElement'

import './ElementItem.scss'

interface ElementItemProps {
  element: SkinElement
}

@observer
export default class ElementItem extends React.Component<ElementItemProps> {
  canvasContext: CanvasRenderingContext2D

  @bind
  getCanvasRef(ref: HTMLCanvasElement) {
    if (ref) {
      this.canvasContext = ref.getContext('2d')! // lol
    }
  }

  componentDidMount() {
    logTime(this.props.element.options.id, () => {
      this.props.element.render(this.canvasContext)
    })
  }

  render() {
    const { element } = this.props

    return (
      <div className="ElementItem">
        <div className="thumbnail">
          <div className="background" />
          <div className="image">
            <canvas className="canvas" ref={this.getCanvasRef} />
          </div>
        </div>
        <div className="footer">
          <div className="name">{element.options.name}</div>
        </div>
      </div>
    )
  }
}
