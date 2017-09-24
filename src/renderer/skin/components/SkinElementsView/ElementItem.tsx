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
  canvas: HTMLCanvasElement

  @bind
  getCanvasRef(ref: HTMLCanvasElement) {
    this.canvas = ref
  }

  componentDidMount() {
    const { element } = this.props
    element.resizeCanvasToImages(this.canvas)
    element.render(this.canvas.getContext('2d')!)
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
